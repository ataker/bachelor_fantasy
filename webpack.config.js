var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    })
  ],
  resolve: {
    alias: {
      'redux-devtools/lib': path.join(__dirname, 'node_modules', 'redux-devtools', 'lib'),
      'redux-devtools': path.join(__dirname, 'node_modules', 'redux-devtools'),
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '..', '..', 'src')
    }, 
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    },
    {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
    },
    {
        test: /\.gif$/,
        loader: "url-loader",
        query: { mimetype: "image/gif" }
    }

    ]  
  }
};
