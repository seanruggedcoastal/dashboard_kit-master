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
    await validateHttpMethod(event, ['GET']);

    const user = await User.findByToken(event.headers.authorization)

    // all went well, respond with JWT token
    return {
      statusCode: 200,
      headers:    {
        'Cache-Control': 'no-store', // prevent caching of response
        Pragma:          'no-cache', // prevent caching of response
      },
      body: JSON.stringify(user), // empty body, token send in headers
    };
  } catch (error) {
    // something went wrong, respond with error
    return {
      statusCode: error.statusCode || 500,
      headers:    error.headers || {},
      body:       JSON.stringify(error.message),
    };
  }
};
