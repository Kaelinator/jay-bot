'use strict'
const validators = require('./validators')

module.exports = email => validators.fromJay(email)
  ? validators.analyzeSentences(email)
  : false