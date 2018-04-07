'use strict'

const condense = (obj, part) => Object.assign(obj, flatten(part))

const flatten = part => part.which === 'TEXT'
  ? { body: extract(part.body) }
  : part.which === 'HEADER.FIELDS (FROM)'
    ? part.body
    : part

const extract = html => html
  // .split('\r\n')


module.exports = {
  first: responses => responses[0].reduce(condense, {}),
  all: responses => responses.map(r => r.reduce(condense, {})),
  extract
}
