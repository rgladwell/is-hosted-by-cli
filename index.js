#!/usr/bin/env node

'use strict'

var main = require('./lib/main')

const userArgs = process.argv.slice(2)

main(userArgs)
  .then((output)  => console.log(output))
  .catch((reason) => console.error(reason))
