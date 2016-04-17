const main = require('../lib/main')
const assert = require('assert')

describe('is-hosted-by-cli', () => {
  it('should discover hosting provider for heroku.com', (done) => {
    main('https://heroku.com')
      .then((output) => {
        assert.equal(output, 'heroku.com is hosted by Amazon')
        done()
      })
      .catch((reason) => done(reason))
  })

  it('should not discover hosting provider for slashdot.org', (done) => {
    main('http://slashdot.org')
      .then((output) => {
        assert.equal(output, 'slashdot.org is not hosted by any known provider')
        done()
      })
      .catch((reason) => done(reason))
  })

})
