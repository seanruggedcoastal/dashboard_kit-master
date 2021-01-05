const path = require('path')

module.exports = {
  experimental: {
    exportTrailingSlash: false
  },
  webpack (config, options) {
    config.resolve.alias['~'] = path.join(__dirname, 'components')
    return config
  }
}