const mkdirp = require('mkdirp');
const fs = require('graceful-fs');
const yaml = require('js-yaml');
const Database = require('../source/database');

const location = './data-test/database';
const name = 'foo';

describe('::Database', () => {
  beforeAll(() => {
    mkdirp.sync(location);
  });

  describe('#create()', () => {
    it('should create a directory', () => {
      Database.create(name, location);
      expect(fs.readdirSync(location)[0]).toEqual(name);
    });
  });

  describe('#load()', () => {
    beforeAll(() => {
      // Make databases and collections.
      mkdirp.sync(`${location}/load-json/foo`);
      mkdirp.sync(`${location}/load-json/bar`);
      mkdirp.sync(`${location}/load-yaml/foo`);

      // Write some example files.
      fs.writeFileSync(`${location}/load-json/foo/json1.json`, JSON.stringify({ id: 'json1', foo: 1 }));
      fs.writeFileSync(`${location}/load-json/foo/json2.json`, JSON.stringify({ id: 'json2', foo: 2 }));
      fs.writeFileSync(`${location}/load-json/bar/json1.json`, JSON.stringify({ id: 'json1', foo: 3 }));
      fs.writeFileSync(`${location}/load-yaml/foo/yaml1.yaml`, yaml.safeDump({ id: 'yaml1', foo: 4 }));
    });

    it('should recursively load data from collections', () => {
      const db = { name: 'load-json', collections: {} };
      Database.load(db, location, 'json');
      expect(db.collections.foo.json1.foo).toBe(1);
      expect(db.collections.foo.json2.foo).toBe(2);
      expect(db.collections.bar.json1.foo).toBe(3);
    });

    it('should load yaml when specified', () => {
      const db = { name: 'load-yaml', collections: {} };
      Database.load(db, location, 'yaml');
      expect(db.collections.foo.yaml1.foo).toBe(4);
    });
  });

  afterAll(() => {
    fs.unlinkSync(location);
    fs.unlinkSync('./data-test');
  });
});
