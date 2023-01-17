const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: {
      root: 'TinyWheels',
      amd: 'tiny-wheels',
      commonjs: 'tiny-wheels'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'tiny-wheels.min.css'
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
