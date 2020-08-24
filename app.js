const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const nodemailer = require('nodemailer')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home', {
        msg: ''
    })
})

app.post('/send', async (req, res) => {
    const { name, company, email, phone, message } = req.body
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${name}</li>
            <li>Company: ${company}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `
    
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    name: process.env.SERVER_NAME_NODEMAILER,
    host: process.env.SERVER_HOST_NODEMAILER,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'test@test.com', // generated ethereal user
      pass: 'genpassword', // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });
  const mailOptions = {
    from: '"Kishore Newton" <test@test.com>', // sender address
    to: "sample@smaple.com", // list of receivers
    subject: "Hello from the web", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if(error) return console.log(error)
    console.log("Message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    res.render('home', { msg: 'Email has been send' })
  })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})