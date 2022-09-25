var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: 'eval-source-map',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'out'),
        publicPath: './out/',
        // publicPath: 'https://github.com/paysonTsung/Fighter/out',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    // publicPath: './out',
                })
            },
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                    ]
                }
            },
            { test: /\.(jpg|png)$/, use: ["url-loader"] }
        ]
    },
    // devServer: {
    //     port: 8080,
    //     historyApiFallback: true,
    //     inline: true,
    // },
    plugins: [
        // new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: './style.css'
        })
    ]
}