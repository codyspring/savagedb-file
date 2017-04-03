const fs = require('graceful-fs');
const yaml = require('js-yaml');

const Save = (data, location) => new Promise((pass) => {
  fs.writeFile(`${location}/${data.id}.json`, JSON.stringify(data), () => pass());
});

const Delete = (id, location) => new Promise((pass) => {
  fs.unlink(`${location}/${id}.json`, () => pass());
});

module.exports = {
  save: Save,
  delete: Delete
};
