require('dotenv').config();
const validateHttpMethod = require('../utils/validateHttpMethod');
const isProd = process.env.NODE_ENV === 'production';
const User = require('../models/User')

const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const {isAfter, format} = require('date-fns')


exports.handler = async(event, context) => {
  try {
    await validateHttpMethod(event, ['POST', 'OPTIONS']);

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

    const data = await JSON.parse(event.body)
    const user = await User.findOne({forgotPasswordToken: data.token})


    const today = format(new Date(), "yyyy-MM-dd")
    const expiry = user.forgotPasswordExpiry


    if(data.token === user.forgotPasswordToken && !isAfter(expiry, today))  {
      console.log("we good to reset password")

        const hashedPassword = await bcrypt.hash(data.password, 10) 

        user.password = hashedPassword
        user.save()


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
          body: JSON.stringify({
            title: 'Success',
            message: `Password reset succesful`
          }), // empty body, token send in headers
        };
        
    } else {

      console.log('cant reset password')
      
      return {
        statusCode: 500,
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
        body: JSON.stringify({
          title: 'Error',
          message: `Can't reset password`
        }), // empty body, token send in headers
      };

    }

 
 

    
  } catch(error) {
    return {
      statusCode: error.statusCode || 500,
      headers:    error.headers || {},
      body:       JSON.stringify(error.message),
    };
  }
}