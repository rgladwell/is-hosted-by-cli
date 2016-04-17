'use strict'

class Cli {

  constructor(endpoint, resourceLoader) {
    this.endpoint = endpoint
    this.resourceFor = resourceLoader
  }

  run(args) {
    return this.resourceFor(this.endpoint).next(args).promise.then((resource) =>
      resource.action.result.description
    )
  }
}

module.exports = Cli
