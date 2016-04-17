'use strict'

var assert = require('assert')

describe('config', function() {

  it('should return is-hosted-by.com as endpoint', function () {
    const config = require('../lib/config')({})
    assert.equal(config.endpoint, 'https://is-hosted-by.com')
  })

  it('if IS_HOSTED_BY_ENDPOINT set should return as endpoint', function () {
    const env = {}
    env.IS_HOSTED_BY_ENDPOINT = 'http://example.org/endpoint'
    const config = require('../lib/config')(env)
    assert.equal(config.endpoint, 'http://example.org/endpoint')
  })
  
})
