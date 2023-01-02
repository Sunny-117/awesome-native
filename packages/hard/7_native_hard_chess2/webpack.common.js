const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'), // dist
    filename: 'gobang.min.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: path.resolve(__dirname , 'src'),
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          // 'file-loader'
          {
            loader: 'file-loader',
            options: {
              // name: '[name].[ext]', // [path] 上下文环境路径
              publicPath: 'asset/iconfont', // 目标路径
              outputPath: 'assets/icon' // 输出路径
              // outputPath: 'dist'
            }
          }
        ]
      }
    ]
  }
}
