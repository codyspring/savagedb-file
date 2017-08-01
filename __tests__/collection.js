const mkdirp = require('mkdirp')
const fs = require('graceful-fs')
const Collection = require('../source/collection')

const location = './data-test/collection'
const name = 'bar'

describe('::Collection', () => {
  beforeAll(() => {
    mkdirp.sync(location)
  })

  describe('#create()', () => {
    it('should create a directory', () => {
      Collection.create(name, location)
      expect(fs.readdirSync(location)[0]).toEqual(name)
    })
  })

  afterAll(() => {
    fs.rmdirSync(location)
    fs.rmdirSync('./data-test')
  })
})
