'use strict'

const cheerio = require('cheerio')
const rest = require('restler')
const microdata = require('microdata-node')

function get(url) {
  return new Promise((resolve, reject) => {
    rest.get(url).on('complete', function(result) {
      if (result instanceof Error) {
        reject(result.message)
      } else {
        resolve(new Resource(url, result))
      }
    })
  })
}

class HypermediaRequest {

  constructor(promise) {
    this.promise = promise
  }

  next(arg) {
    const nextPromise = this.promise.then((resource) => {
      var $ = cheerio.load(resource.html)
      const form = $('form[data-rel=next]')
      const parameter = form.serializeArray()[0].name
      const query = resource.url + '?' + parameter + '=' + arg
      return get(query)
    })
    return new HypermediaRequest(nextPromise)
  }

}

class Resource {

  constructor(url, html) {
    this.url = url
    this.html = html
  }

  get action() {
    const data = microdata.toJson(this.html, { base: this.url })
    const actionsOnly = (item) => item.type.indexOf('http://schema.org/SearchAction') > -1
    return new Action(data.items.filter(actionsOnly)[0])
  }

}

class Action {

  constructor(data) {
    this.data = data
  }

  get result() {
    return this.data.properties.result.map((result) => new Thing(result))[0]
  }

  get error() {
    return this.data.properties.error.map((error) => new Thing(error))[0]
  }

}

class Thing {

  constructor(data) {
    this.data = data
  }

  get description() {
    return this.data.properties.description[0].replace(/\s+/g, ' ').trim()
  }

}

function resourceFor(endpoint) {
  return new HypermediaRequest(get(endpoint))
}

module.exports.resourceFor = resourceFor
