const webpackDateFnsExternals = require('webpack-date-fns-externals');
module.exports = {
  target:    'node',
  externals: [ 
    webpackDateFnsExternals(), {
    mongoose:     'mongoose',
    bcryptjs:       'bcryptjs',
    parser:     'ua-parser-js',
    jsonwebtoken: 'jsonwebtoken',
    dotenv:       'dotenv',
    moment: 'moment-timezone',
  }],
};