const mkdirp = require('mkdirp');

const Create = (name, location) => new Promise((pass) => {
  mkdirp(`${location}/${name}`, () => pass());
});

module.exports = {
  create: Create
};
