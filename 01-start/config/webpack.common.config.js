/*
 * @Author: niumengfei
 * @Date: 2020-08-17 16:07:29
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-08-18 14:42:34
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
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
          }
        ]
    }
}