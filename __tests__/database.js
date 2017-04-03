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
    it('should create a directory', (done) => {
      Database.create(name, location).then(() => {
        expect(fs.readdirSync(location)[0]).toEqual(name);
        done();
      });
    });
  });

  afterAll(() => {
    fs.rmdirSync(location);
    fs.rmdirSync('./data-test');
  });
});
