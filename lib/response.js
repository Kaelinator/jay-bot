'use strict'
const braces = require('braces')

const random = arr => arr[Math.floor(Math.random() * arr.length)]

const prepare = str => str
  .split(',')
  .join('\\,')
  .split('|')
  .join(',')

const responseTemplate = prepare(process.env.RESPONSE_TEMPLATE)
const subjectTemplate = prepare(process.env.SUBJECT_TEMPLATE)

module.exports = {
  response: () => random(braces.expand(responseTemplate)),
  subject: () => random(braces.expand(subjectTemplate))
}