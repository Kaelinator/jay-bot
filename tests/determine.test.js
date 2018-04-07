'use strict'
/* global it, describe, expect */
require('dotenv').config()

const validators = require('../lib/validators')

describe('fromJay', () => {

  it('returns whether or not the email is from Jay', () => {

    const from = ['"Kaelinator" <kael@me.com>', '"Judy Hopps" <judy@hopps.com>']

    expect(validators.fromJay({headers:{from}})).toBe(false)

    from.push(process.env.JAY)

    expect(validators.fromJay({headers:{from}})).toBe(true)
  })
})

describe('callEachSentence', () => {

  it('calls a given function on every sentence within the given text', () => {
    
    expect(
      validators.callEachSentence('AP1\r\n'
      + 'Monday, February 26, 2018\r\n'
      + 'If you missed any RED-light items last week, that\'s okay.\r\n'
      + 'Can we say "Comprehension"? It\'s been 11 minutes.\r\n', s => s.length)
    ).toEqual([ 3, 25, 57, 49 ])
  })
})