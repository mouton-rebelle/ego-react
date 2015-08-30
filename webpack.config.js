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
    alias: {
      'redux-devtools/lib': path.join(__dirname, '..', '..', 'src'),
      'redux-devtools': path.join(__dirname, '..', '..', 'src'),
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'],
      exclude: /node_modules/,
      include: __dirname
    },
    {
        test: /\.scss$/,
        loader: 'style-loader!css?sourceMap!autoprefixer?browsers=last 2 version!sass?sourceMap',
        include: __dirname
    },
    // {
    //   test: /\.css?$/,
    //   loaders: ['style', 'raw']
    // }
    ]
  }
};
