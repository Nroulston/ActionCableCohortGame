const path = require('path');

module.exports = {
  entry: {
    '/main.js': './src/index.js',
  },
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        
      },
    ],
  },
  optimization: {
    minimize: false
},

};