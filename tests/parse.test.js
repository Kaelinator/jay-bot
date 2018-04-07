
const parse = require('../lib/parse')

describe('parse', () => {

  it('gets the first element and converts it to a friendlier format', () => {

    const data = [ 
      [ 
        { 
          which: 'TEXT',
          size: 216,
          body: 'CONTENT'
        },
        {
          which: 'HEADER.FIELDS (FROM)',
          size: 52,
          body: { from: [ 'Me <kaelinator@me.com>' ] } 
        } 
      ],
      [
        {
          which: 'TEXT',
          size: 216,
          body: 'MORE CONTENT'
        },
        {
          which: 'HEADER.FIELDS (FROM)',
          size: 52,
          body: { from: [ 'Me <kaelinator@me.com>' ] } 
        } 
      ]
    ]

    expect(parse(data)).toEqual({'HEADER.FIELDS (FROM)': {'from': ['Me <kaelinator@me.com>']}, 'TEXT': 'CONTENT'})
  })
})