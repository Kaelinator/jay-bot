
const nodemailer = require('nodemailer')
const response = require('./response')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

module.exports = () => transporter.sendMail({
  from: `"${process.env.NAME}" <${process.env.GMAIL_USER}>`,
  to: `${process.env.RECIPIENT}`,
  subject: response.subject(),
  text: response.response()
}, (error, info) => {
  if (error) {
    console.log(error)
    return 
  }
  console.log('Sent', info.messageId)
})
