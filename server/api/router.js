const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const token = require('./token.js');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
})
connection.connect();

// 登录模块
router.post('/login', (req, res) => {
    const user_login = req.body;
    // console.log(req.body);
    // 定义查询 sql
    const sel_uname_sql =  `select * from user_login where uname = '${user_login.uname}'`;
    connection.query(sel_uname_sql, (err, results) => {
        if (err) throw err;
         console.log(results);
        if (results[0] === undefined) {
            res.json({
                status: '-1',
                message: '用户名填写错误，用户不存在！'
            })
        } else {
            if (results[0].uname === user_login.uname && results[0].upwd === user_login.upwd) {
                const userToken = token.createToken(user_login);
                res.json({
                    status: '0',
                    message: '登陆成功！',
                    token: userToken
                })
            } else {
                res.json({
                    status: '1',
                    message: '密码错误！'
                })
            }
        }
    })
})
module.exports = router;