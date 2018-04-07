
const nodemailer = require('nodemailer')

const mailOptions = {
  from: `"Kaelinator" <${process.env.GMAIL_USER}>`,
  to: `${process.env.RECIPIENT}`,
  subject: 'Test email',
  text: 'Hi there',
  html: '<b>Woah!</b>'
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error)
    return 
  }
  console.log('Sent', info.messageId)
})
