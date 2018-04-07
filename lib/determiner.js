'use strict'
const ParallelDots = require('@timheckel/parallel-dots')

const pd = new ParallelDots({
  key: process.env.PARALLEL_DOTS_API
})

console.log(pd.call({
  path: 'similarity',
  text_1: 'jschulz needs 1 peep from each to return papers.',
  text_2: 'If you wish to return papers, then respond to this email.'
}, (err, res) => {
  if (err) return console.log(err)
  console.log('result:', res.body.normalized_score)
}))