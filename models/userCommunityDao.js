const mysql = require('mysql');
const express = require('express');
const conf = require('../conf/db');
const sql = require('./userCommunitySqlMapping');
const logger = require('../public/javascripts/logger');
// 使用连接池，提升性能
const pool = mysql.createPool(conf.mysql);
const common = require('../public/javascripts/common');

const session = require('express-session');
const app = express();
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

module.exports = {
    add: function (req, hash, res, next) {
        let msg;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
                return;
            }
            const param = req.body;

            const {address} = req.session;
            console.log(address);

            // 建立连接，向表中插入值
            connection.query(sql.insert, [address, param.communityID], function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    msg = "insert succeeded";
                    res.render('community', {address: "欢迎：" + address, community: result});
                }
            });
            connection.release();
        });
        console.log("user community msg3: " + msg);
    },

    queryByAddress: function (req, res, next) {
        const {address} = req.session;
        console.log("user community Test queryByAddress: " + address);
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            // console.log(req.user.uid);
            connection.query(sql.queryByAddress,address, function (err, result) {
                var ret;
                if (err) {
                    logger.error(err);
                }
                if (result[0] == null) {
                    msg = "没有加入论坛";
                    console.log(msg);
                    console.log(result);
                    res.render('userCommunity', {address: "欢迎：" + address, userCommunity: result}); //address: "欢迎：" + address,
                } else {
                    // 登录成功
                    msg = "欢迎来到论坛列表！";
                    console.log(msg);
                    console.log(result);
                    res.render('userCommunity', {address: "欢迎：" + address, userCommunity: result});
                }

                connection.release();
            });
        });
    },

};
