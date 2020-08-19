/*
 * @Author: niumengfei
 * @Date: 2020-08-17 16:13:31
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-08-19 10:40:14
 */
// var root = document.getElementById('root');
// root.innerHTML = '我是夜语清梦'

//重写APP.js
import React from 'react';
// import './App.css';
import './App.less';
import bg from './images/bg1.jpg'
function APP(){
    return(
        <div className='APP'>
            <p>夜语清梦哈哈12<i className='iconfont'>&#xe622;</i></p>
            <img className="background" src={bg} alt=""/>
        </div>
    )
}

export default APP;