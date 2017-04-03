const mkdirp = require('mkdirp');

const Create = (name, location) => {
  mkdirp.sync(`${location}/${name}`);
};

module.exports = {
  create: Create
};
