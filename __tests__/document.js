const mkdirp = require('mkdirp');
const fs = require('graceful-fs');
const Document = require('../source/document');

const location = './data-test/document';
const data = { id: 'foo', foo: 'bar' };

describe('::Document', () => {
  beforeAll(() => {
    mkdirp.sync(location);
  });

  describe('#save()', () => {
    it('should save a file', (done) => {
      Document.save(data, location).then(() => {
        const doc = JSON.parse(fs.readFileSync(`${location}/foo.json`));
        expect(doc).toEqual(data);
        done();
      });
    });
  });

  describe('#delete()', () => {
    it('should delete a file', (done) => {
      Document.delete(data.id, location).then(() => {
        expect(fs.readdirSync(location).length).toEqual(0);
        done();
      });
    });
  });

  afterAll(() => {
    fs.rmdirSync(location);
    fs.rmdirSync('./data-test');
  });
});
