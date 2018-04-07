'use strict'
const ParallelDots = require('@timheckel/parallel-dots')
const Promise = require('bluebird')

const pd = new ParallelDots({
  key: process.env.PARALLEL_DOTS_API
})

const targets = process.env.TARGET_SENTENCES.split('||')

const fromJay = email => 
  email.from.reduce((b, person) => b || person.includes(process.env.JAY), false)

const callEachSentence = (email, f) => 
  email.split(/\r|\n|\.|\?|!/)
    .filter(sentence => sentence.length > (+process.env.MIN_SENTENCE_LENGTH || 10))
    .map(f)

const analyzeSentences = email => 
  Promise.all(callEachSentence(email.text, compareSentence))
    .map(arr => arr.reduce(avg, 0))
    .tap(console.log)
    .reduce((b, v) => b || (v > (+process.env.SIMILARITY_THRESHOLD || 3)), false)

const call = Promise.promisify(pd.call)

const avg = (acc, v, i, arr) => acc + v / arr.length

const similarityCall = (text1, text2) => call({
  path: 'similarity',
  text_1: text1,
  text_2: text2
}).then(res => res.body.normalized_score)
  .catch(err => {
  
    console.log(err)
    return 3
  })

const compareSentence = s => Promise.all(targets.map(t => similarityCall(s, t)))

module.exports = {
  fromJay,
  callEachSentence,
  analyzeSentences
}