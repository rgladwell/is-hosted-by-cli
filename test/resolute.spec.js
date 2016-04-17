'use strict'

const assert = require('chai').assert
const resolute = require('../lib/resolute')
const nock = require('nock')

describe('resolute', () => {
  beforeEach(function() {
    nock.disableNetConnect()
  })

  afterEach(function() {
    nock.enableNetConnect()
    nock.cleanAll()
  })

  const form =
    `<html>
       <body>
         <form data-rel="next">
           <input name="q" value="blah" type="text">
         </form>
       </body>
     </html>`

  it('should execute submit HTML form with default data-rel=next', (done) => {

    const result =
      `<html>
        <body>
          <div itemscope itemtype="http://schema.org/SearchAction">
            <div itemprop="result" itemscope itemtype="http://schema.org/Thing">
              <p itemprop="description">Is in network</p>
            </div>
          </div>
        </body>
       </html>`

    const scope = nock('http://example.org')
      .get('/resource')
      .reply(200, form)
      .get('/resource')
      .query({q: 'search'})
      .reply(200, result)

    resolute.resourceFor('http://example.org/resource').next('search').promise
      .then((resource) => {
        assert.equal(resource.action.result.description, 'Is in network')
        scope.isDone()
        done()
      })
      .catch((reason) => {
        scope.isDone()
        done(reason)
      })

  })

  it('should execute submit HTML form with default data-rel=next', (done) => {
    const result =
      `<html>
        <body>
          <div itemscope itemtype="http://schema.org/SearchAction">
            <div itemprop="error" itemscope itemtype="http://schema.org/Thing">
              <p itemprop="description">Something went wrong</p>
            </div>
          </div>
        </body>
       </html>`

    const scope = nock('http://example.org')
      .get('/resource')
      .reply(200, form)
      .get('/resource')
      .query({q: 'search'})
      .reply(200, result)

    resolute.resourceFor('http://example.org/resource').next('search').promise
      .then((resource) => {
        assert.equal(resource.action.error.description, 'Something went wrong')
        scope.isDone()
        done()
      })
      .catch((reason) => {
        scope.isDone()
        done(reason)
      })

  })

  it('throw error on call to next on form without data-rel=next', (done) => {

    const form =
      `<html>
         <body>
           <form>
             <input name="q" value="blah" type="text">
           </form>
         </body>
       </html>`

    const scope = nock('http://example.org')
      .get('/resource')
      .reply(200, form)

    resolute.resourceFor('http://example.org/resource').next('search').promise
      .then(() => {
        assert.fail('no error thrown')
        scope.isDone()
        done()
      })
      .catch(() => {
        scope.isDone()
        done()
      })

  })

  it('should normalise description whitespace', (done) => {
    const result =
      `<html>
        <body>
          <div itemscope itemtype="http://schema.org/SearchAction">
            <div itemprop="error" itemscope itemtype="http://schema.org/Thing">
              <p itemprop="description"> Something went
              wrong</p>
            </div>
          </div>
        </body>
       </html>`

    const scope = nock('http://example.org')
      .get('/resource')
      .reply(200, form)
      .get('/resource')
      .query({q: 'search'})
      .reply(200, result)

    resolute.resourceFor('http://example.org/resource').next('search').promise
      .then((resource) => {
        assert.equal(resource.action.error.description, 'Something went wrong')
        scope.isDone()
        done()
      })
      .catch((reason) => {
        scope.isDone()
        done(reason)
      })

  })


})
