const { text } = require('express')
const nm  = require('nodemailer')
require('dotenv').config()

const transporter = nm.createTransport({
    service : "gmail",
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

// const mailOptions = {
//     from : process.env.GMAIL_USER,
//     to : process.env.SEND_USER ,
//     subject : "test nodejs email",
//     text : "this is to test where it inputs",
//     html : "<h2>where are u goving</h2><img src= 'https://www.w3schools.com/w3images/lights.jpg'/> ",
// }

 

module.exports = transporter