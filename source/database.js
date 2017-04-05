const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const yaml = require('js-yaml');

const Load = (database, location, fileType) => {
  const db = database;
  const dbLocation = `${location}/${db.name}`;
  const collections = fs.readdirSync(dbLocation);

  for (let i = 0; i < collections.length; i += 1) {
    db.collections[collections[i]] = {};
    const collection = db.collections[collections[i]];
    const documents = fs.readdirSync(`${dbLocation}/${collections[i]}`);

    for (let k = 0; k < documents.length; k += 1) {
      const fileData = fs.readFileSync(`${dbLocation}/${collections[i]}/${documents[k]}`);

      let doc = {};
      switch (fileType) {
        case 'yaml':
          doc = yaml.safeLoad(fileData);
          break;
        default:
          doc = JSON.parse(fileData);
          break;
      }

      collection[doc.id] = doc;
    }
  }
};

const Create = (name, location) => {
  mkdirp.sync(`${location}/${name}`);
};

module.exports = {
  create: Create,
  load: Load,
};
