'use strict'
require('dotenv').config()
const MailListener = require('mail-listener2')
const determine = require('./lib/determine')
const Promise = require('bluebird')
const transporter = require('./lib/transporter')

const listener = new MailListener({
  
  username: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: 'INBOX',
  searchFilter: ['UNSEEN'],
  markSeen: true,
  mailParserOptions: {streamAttachments: false},
  attatchments: false
})

listener.on('server:connected', () => console.log('connected'))
listener.on('server:disconnected', () => console.log('disconnected'))

listener.on('error', err => {
  console.log('error', err)
  listener.stop()
})

listener.on('mail', (mail, seqno) => {

  Promise.resolve(determine(mail))
    .then(replyJustified => replyJustified 
      ? transporter()
      : console.log('no reply for', seqno))
    .catch(err => console.log(err))
})

listener.start()