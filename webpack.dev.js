const path = require('path');
const config = require('./webpack.base');

module.exports = Object.assign({}, config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3030,
  },
})
