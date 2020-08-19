/*
 * @Author: niumengfei
 * @Date: 2020-08-17 16:07:29
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-08-19 11:18:33
 */
// console.log('webpack-common...')
const path = require('path');

module.exports = {
    entry:{
        //app: './src/app.js'
        index: './src/index.js',
        framework: ['react','react-dom'],
    },
    output:{
        filename: 'js/bundle.js',
        path: path.resolve(__dirname,'../dist')
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(jpg|png|gif)$/,
            use: {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/',
                limit: 8192,
              },
            },
          },
          {
            test: /\.(eot|ttf|svg|woff|woff2)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name]_[hash].[ext]',
                outputPath: 'font/'
              }
            }
          }
        ]
    }
}