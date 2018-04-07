
const parse = require('../lib/parse')

describe('parse', () => {

  it('converts to a friendlier format', () => {

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

    expect(
      parse.first(data)
    ).toEqual(
      {'from': ['Me <kaelinator@me.com>'], 'body': 'CONTENT'}
    )

    expect(
      parse.all(data)
    ).toEqual(
      [
        {'from': ['Me <kaelinator@me.com>'], 'body': 'CONTENT'},
        {'from': ['Me <kaelinator@me.com>'], 'body': 'MORE CONTENT'},
      ]
    )
  })
})