'use strict'
const braces = require('braces')

const random = arr => arr[Math.floor(Math.random() * arr.length)]

const template = process.env.RESPONSE_TEMPLATE
  .split(',')
  .join('\\,')
  .split('|')
  .join(',')

module.exports = () => random(braces.expand(template))