// const path = require('path')
// const {
//   CleanWebpackPlugin
// } = require('clean-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//
// module.exports = {
//   mode: 'development',
//   entry: './src/main.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'gobang.min.js'
//     // libraryTarget: 'umd',
//     // library: 'gobang'
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       // chunks: ['gobang.min.js'],
//       filename: 'index.html',
//       template: 'index.html'
//     }),
//     new UglifyJsPlugin()
//   ],
//   devtool: 'inline-source-map',
//   devServer: {
//     // 每次构建时候自动打开浏览器并访问网址
//     // open: true,
//     // 开启热更新
//     // hot: true,
//     contentBase: './dist'
//     // port: "8080",
//     // host: "localhost",
//     // inline: true,
//   },
//   module: {
//     rules: [{
//         test: /\.js$/,
//         // include: path.resolve(__dirname , 'src'),
//         exclude: /node_modules/,
//         use: ['babel-loader']
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   }
// }
