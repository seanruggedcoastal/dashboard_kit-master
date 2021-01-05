require('dotenv').config();
const validateHttpMethod = require('../utils/validateHttpMethod');
const isProd = process.env.NODE_ENV === 'production';

const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const crypto = require('crypto')
const {format, addDays} = require('date-fns')


exports.handler = async(event, context) => {
  try {
    await validateHttpMethod(event, ['POST', 'OPTIONS']);

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })


    if(event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers:    {
          'Cache-Control': 'no-store', // prevent caching of response
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: '', // empty body, token send in headers
      };
    }
    
    let data = JSON.parse(event.body)

    const user = await User.findOne({email: data.email})
    let randomToken = await crypto.randomBytes(20)
    let expireDate = await format(addDays(new Date(), 1), "yyyy-MM-dd")

    user.forgotPasswordToken = randomToken.toString('hex')
    user.forgotPasswordDate = expireDate

    await user.save()
   

    await transporter.sendMail({
      from: '"React Dashboard" <info@reactdashboard.com>',
      to: user.email,
      subject: "Instructions to reset your password for React Dashboard",
      html: `Follow this <a href="${process.env.DOMAIN}/resetpassword?token=${randomToken.toString('hex')}" target="_blank">link</a> to reset your password`,
    });
  

 
 
    return {
      statusCode: 200,
      headers:    {
        'Cache-Control': 'no-store', // prevent caching of response
        Pragma:          'no-cache', // prevent caching of response
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': '2592000',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: 'charge created', // empty body, token send in headers
    };
    
  } catch(error) {
    return {
      statusCode: error.statusCode || 500,
      headers:    error.headers || {},
      body:       JSON.stringify(error.message),
    };
  }
}