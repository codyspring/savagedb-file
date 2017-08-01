const fs = require('graceful-fs')
const yaml = require('js-yaml')

const Save = (data, location, fileType = 'json') => new Promise((resolve, reject) => {
  let parsed = JSON.stringify(data)
  if (fileType === 'yaml') parsed = yaml.safeDump(data)
  fs.writeFile(`${location}/${data.id}.${fileType}`, parsed, () => resolve())
})

const Delete = (id, location, fileType = 'json') => new Promise((resolve, reject) => {
  fs.unlink(`${location}/${id}.${fileType}`, () => resolve())
})

module.exports = {
  save: Save,
  delete: Delete
}
