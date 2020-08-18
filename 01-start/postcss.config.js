/*
 * @Author: niumengfei
 * @Date: 2020-08-18 16:42:49
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-08-18 16:58:57
 */
const autopreFixer = require('autoprefixer')

module.exports = {
    plugins: [
        autopreFixer({ browsers: ['last 5 version', '>1%', 'ie >=8'] })
    ]
};