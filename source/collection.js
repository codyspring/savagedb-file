const mkdirp = require('mkdirp');

const Create = (name, location) => {
  mkdirp(`${location}/${name}`);
};

module.exports = {
  create: Create
};
