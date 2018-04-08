'use strict'
const ParallelDots = require('@timheckel/parallel-dots')
const Promise = require('bluebird')
const { split } = require('sentence-splitter')
const arrify = require('arrify')

const pd = new ParallelDots({
  key: process.env.PARALLEL_DOTS_KEY
})

const targets = process.env.TARGET_SENTENCES.split('||')

const fromJay = email => 
  arrify(email.headers.from)
    .reduce((b, person) => b || person.includes(process.env.JAY), false)

const callEachSentence = (email, f) => 
  split(email)[0].children
    .filter(x => x.type == 'Str')
    .map(x => x.raw)
    .map(f)

const analyzeSentences = email => 
  Promise.all(callEachSentence(email.text, compareSentence))
    .map(arr => arr.reduce(avg, 0))
    .tap(d => { if (process.env.DEBUG) console.log(d) })
    .reduce((b, v) => b || (v > (+process.env.SIMILARITY_THRESHOLD || 3)), false)

const call = Promise.promisify(pd.call)

const avg = (acc, v, i, arr) => acc + v / arr.length

const similarityCall = (text1, text2) => call({
  path: 'similarity',
  text_1: text1,
  text_2: text2
}).then(res => res.body.normalized_score)
  .tap(score => {
    if (process.env.DEBUG)
      console.log(`Score: ${score}, TEXT1:${text1}, TEXT2:${text2}`)
  }).catch(err => {
  
    console.log(err)
    return 3
  })

const compareSentence = s => Promise.all(targets.map(t => similarityCall(s, t)))

module.exports = {
  fromJay,
  callEachSentence,
  analyzeSentences
}