'use strict'

function config(env) {
  const conf = {}
  conf.endpoint = env.IS_HOSTED_BY_ENDPOINT || 'https://is-hosted-by.com'
  return conf
}

module.exports = config
