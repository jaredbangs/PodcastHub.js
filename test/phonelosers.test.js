var assert = require('assert')
var fs = require('fs')
var path = require('path')

var parse = require('../parse')

describe('Parse file', function () {
  var parsedFile

  before(function (done) {
    fs.readFile(path.resolve(__dirname, './phonelosers.org.xml'), 'utf8', function (err, data) {
      if (err) throw err
      parse(data, function (err, parsedData) {
        if (err) throw err
        parsedFile = parsedData
        done()
      })
    })
  })

  it('description long', function () {
    assert.strictEqual(parsedFile.description.long, 'home of The Snow Plow Show wacky morning podcast')
  })

  it('description short', function () {
    assert.strictEqual(parsedFile.description.short, 'Prank phone calls and other wacky morning humor by the people at Phone Losers of America')
  })

  it('episode count', function () {
    assert.strictEqual(parsedFile.episodes.length, 100)
  })

  it('title', function () {
    assert.strictEqual(parsedFile.title, 'Phone Losers of America')
  })
})
