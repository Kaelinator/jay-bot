'use strict'
require('dotenv').config()
const imaps = require('imap-simple')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

const mailOptions = {
  from: `"Kaelinator" <${process.env.GMAIL_USER}>`,
  to: `${process.env.RECIPIENT}`,
  subject: 'Test email',
  text: 'Hi there',
  html: '<b>Woah!</b>'
}

const imap = {
  user: process.env.GMAIL_USER,
  password: process.env.GMAIL_PASS,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  authTimeout: 3000
}

const config = {
  imap,
  onmail: n => {
    console.log('You have mail!', n)
    // if (n > 1) return
    imaps.connect({ imap })
      .then(conn => {
        return conn.openBox('INBOX')
          .then(() => conn.search(['ALL']))
      })
      .then(console.log)
      .catch(err => console.log('onmail callback', err))
  }
}

imaps.connect(config)
  .then(conn => {
    conn.openBox('INBOX')
  })
  .catch(err => console.log(err))

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error)
//     return 
//   }
//   console.log('Sent', info.messageId)
// })