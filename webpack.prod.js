const config = require('./webpack.base');

module.exports = Object.assign({}, config, {
  mode: "production"
})
