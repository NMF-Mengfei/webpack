/*
 * @Author: niumengfei
 * @Date: 2020-08-17 16:18:15
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-08-18 16:43:44
 */
// console.log('webpack-prod...')
// const webpackMerge = require('webpack-merge');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动编译html并引入js
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //打包前删除dist目录
// const CleanPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //打包出css独立文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩打包后的css文件

module.exports = merge(common,{
    mode: 'production',
    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [ 
            //   'style-loader', 
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader'
            ]
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'less-loader',
            ]
          },
          {
            test: /\.(sass|scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          // 这里有小伙伴可能会疑惑为什么不是 '../public/index.html'
          // 我的理解是无论与要用的template是不是在一个目录，都是从根路径开始查找
          template: 'public/index.html',
          inject: 'body',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
          },
        }),
        new CleanWebpackPlugin(),
        // new CleanWebpackPlugin({
        //     root: process.cwd(), // 根目录
        //     verbose: true, // 开启在控制台输出信息
        //     dry: false
        // })
        new MiniCssExtractPlugin({ //生产环境中抽离出css文件
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        }),
      ],
      optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            //...
            new OptimizeCssAssetsPlugin({
                assetNameRegExp:/\.css$/g,
                cssProcessor:require("cssnano"),
                cssProcessorPluginOptions:{
                    preset:['default', { discardComments: { removeAll:true } }]
                },
                canPrint:true
            })
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          cacheGroups: {
            framework: {
              test: "framework",
              name: "framework",
              enforce: true
            },
            vendors: {
              priority: -10,
              test: /node_modules/,
              name: "vendor",
              enforce: true,
            },
          }
        }
      },
});
// filename：打包之后的html文件名字
// template：以我们自己定义的html为模板生成，不然我们还要到打包之后的html文件中写
// inject：在body最底部引入js文件，如果是head，就是在head中引入js
// minify：压缩html文件，更多配置点我
//  removeComments：去除注释
// collapseWhitespace：去除空格