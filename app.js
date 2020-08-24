const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const nodemailer = require('nodemailer')
const path = require('path')
const app = express()

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})