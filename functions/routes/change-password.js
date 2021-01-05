require('dotenv').config();
const validateHttpMethod = require('../utils/validateHttpMethod');
const isProd = process.env.NODE_ENV === 'production';
const User = require('../models/User');
const bcrypt = require('bcryptjs')




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


    
    if ((await bcrypt.compare(data.oldPassword, data.user.password))) {
      console.log('password match')
      const user = await User.findByToken(event.headers.authorization)
      const hashedPassword = await bcrypt.hash(data.password, 10) 
      user.password = hashedPassword
      await user.save()
    }

 
 
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