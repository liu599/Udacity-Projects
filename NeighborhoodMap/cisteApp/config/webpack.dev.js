const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

const srcDir = resolve('src');
const distDir = resolve('dist');


const config = {

  context: srcDir,

  devtool: 'source-map',

  entry: ['./App.js'],

  output: {
    filename: 'cisteApp.bundle.js',
    path: distDir,
    publicPath: '/',
    sourceMapFilename: 'main.map'
  },

  devServer: {
    contentBase: srcDir,
    publicPath: '/',
    historyApiFallback: true,
    port: 3000,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          //'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 10000, // use data url for assets <= 10KB
          name: 'common/image/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'common/font/[name].[hash:7].[ext]'
        }
      }

    ]

  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      // where to find template file
      template: path.join(srcDir, 'index.html'),

      path: distDir,

      filename: 'index.html'

    }),


  ]

};




module.exports = config;

