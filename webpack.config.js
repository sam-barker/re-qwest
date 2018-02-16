const path = require('path')
const webpack = require('webpack')

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src')
}

module.exports = {
  entry: path.join(paths.SRC, 'index.js'),

  output: {
    path: paths.DIST,
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      }
    ]
  }
}
