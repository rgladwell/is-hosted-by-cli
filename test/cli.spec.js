'use strict'

const Cli = require('../lib/cli')
const assert = require('assert')

const resourceFor = (url) => {
  return new MockRequest(new Promise((resolve, reject) => {
    if(url === 'http://example.org/resource') return resolve(new MockResource())
    else return reject(undefined)
  }))
}

class MockRequest  {

  constructor(promise) {
    this.promise = promise
  }

  next(args) {
    return new MockRequest(this.promise.then( () => {
      if(args != undefined) {
        const argument = Object.keys(args)[0]
        return new MockResource('command-result-with-argument ' + argument + '=' + args[argument])
      }
      else return new MockResource('command-result')
    }))
  }

}

class MockResource {

  constructor(html) {
    this.html = html
  }

  get action() {
    const action = {}
    action.result = {}
    action.result.description = 'result -> ' + this.html
    return action
  }
}

describe('cli', () => {

  const cli = new Cli('http://example.org/resource', resourceFor)

  it('should submit form control identified by command argument', (done) => {
    cli.run().then( (result) => {
      assert.equal(result, 'result -> command-result')
      done()
    })
  })

  it('should pass arguments to form control', (done) => {
    cli.run({'arg1' : 'val1'}).then( (result) => {
      assert.equal(result, 'result -> command-result-with-argument arg1=val1')
      done()
    })
  })

})
