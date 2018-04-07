'use strict'
require('dotenv').config()
const MailListener = require('mail-listener2')
const determine = require('./lib/determine')
const Promise = require('bluebird')

const listener = new MailListener({
  
  username: process.env.GMAIL_USER,
  password: process.env.GMAIL_PASS,
  host: 'imap.gmail.com',
  port: 993,
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
      ? 'reply should be sent for ' + seqno
      : 'no reply for ' + seqno)
    .then(console.log)
    .catch(err => console.log(err))
})

listener.start()