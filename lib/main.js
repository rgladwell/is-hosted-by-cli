'use strict'

const Cli = require('./cli')
const config = require('./config')(process.env)
const resolute = require('./resolute')

function main(args) {
  var cli = new Cli(config.endpoint, resolute.resourceFor)
  return cli.run(args)
}

module.exports = main
