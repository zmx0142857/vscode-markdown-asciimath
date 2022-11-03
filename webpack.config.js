const path = require('path');

const config = {
  target: 'web',
  entry: {
    'page': './page.js'
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
};

module.exports = [config];
