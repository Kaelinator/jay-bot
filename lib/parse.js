'use strict'

const condense = (obj, e) => Object.assign(obj, { [e.which]: e.body })

module.exports = responses => responses[0].reduce(condense, {})
