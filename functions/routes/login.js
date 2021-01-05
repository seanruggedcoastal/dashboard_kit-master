// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

require('dotenv').config();

const User = require('../models/User');

const validateHttpMethod = require('../utils/validateHttpMethod');

// ─────────────────────────────────────────────────────────────────────────────
// handler
// ─────────────────────────────────────────────────────────────────────────────

exports.handler = async (event, context) => {
  try {
    // check http method

    await validateHttpMethod(event, ['POST']);

    // parse request payload
    const { username, email, password } = JSON.parse(event.body);

    // check user credentials
    const token = await User.login(username, email, password);



    if(token.title && token.title === 'Error') {

        return {
          statusCode: 200,
          headers:    {
            'Cache-Control': 'no-store', // prevent caching of response
            Pragma:          'no-cache', // prevent caching of response
          },
          body: JSON.stringify(token), // empty body, token send in headers
        };

    } else {

        return {
          statusCode: 200,
          headers:    {
            'Cache-Control': 'no-store', // prevent caching of response
            Pragma:          'no-cache', // prevent caching of response
            Authorization:   `Bearer: ${token}`,
          },
          body: JSON.stringify({token: token}), // empty body, token send in headers
        };

    }



  } catch (error) {
    // something went wrong, respond with error
    return {
      statusCode: error.statusCode || 500,
      headers:    error.headers || {},
      body:       JSON.stringify(error.message),
    };
  }
};
