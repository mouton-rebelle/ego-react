var path = require('path');
var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval!source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new WebpackErrorNotificationPlugin('darwin'),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css")
    // new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    },
    {
        test: /\.scss$/,
        loader: 'style-loader!css?sourceMap!sass?sourceMap'
    },
    // {
    //   test: /\.css?$/,
    //   loaders: ['style', 'raw']
    // }
    ]
  }
};
