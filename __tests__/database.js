const mkdirp = require('mkdirp');
const fs = require('graceful-fs');
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

  afterAll(() => {
    fs.rmdirSync(location);
    fs.rmdirSync('./data-test');
  });
});
