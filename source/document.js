const fs = require('graceful-fs')
const yaml = require('js-yaml')

const Save = (data, location, fileType = 'json') => new Promise((pass) => {
  let parsed = JSON.stringify(data)
  if (fileType === 'yaml') parsed = yaml.safeDump(data)
  fs.writeFile(`${location}/${data.id}.${fileType}`, parsed, () => pass())
})

const Delete = (id, location, fileType = 'json') => new Promise((pass) => {
  fs.unlink(`${location}/${id}.${fileType}`, () => pass())
})

module.exports = {
  save: Save,
  delete: Delete
}
