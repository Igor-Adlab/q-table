const webpack = require('webpack');

const config = {
  entry: {
    bundle: ['./example/src/index.js'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: 'example/js',
  },
  externals: {
    quill: 'Quill',
  },
};

config.devtool = '#inline-source-map';
module.exports = config;
