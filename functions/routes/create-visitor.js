require('dotenv').config();
const parser = require('ua-parser-js');
const Visitor = require('../models/Visitor');
const validateHttpMethod = require('../utils/validateHttpMethod');
const axios = require('axios')

exports.handler = async (event, context) => {
  try {
    // check http method
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


    const ua = await parser(event.headers['user-agent']);
    const body = await JSON.parse(event.body)
    const ip = event.headers['x-forwarded-for']
    const country = await axios.get(`https://get.geojs.io/v1/ip/country/${ip}.json`)


    try {
      await Visitor.create({
        referrer: body.referrer,
        path: body.path,
        device: ua.os.name,
        country: country.data.name,
        browser: ua.browser.name
      })
    } catch (error) {
      console.log(error)
    }



    // all went well
    return {
      statusCode: 200,
      headers:    {
        'Cache-Control': 'no-store', // prevent caching of response
        Pragma:          'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': '2592000',
        'Access-Control-Allow-Credentials': 'true' // prevent caching of response
      },
      body: 'success', // empty body, token send in headers
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