const mysql = require('mysql');
const express = require('express');
const conf = require('../conf/db');
const sql = require('./userSqlMapping');
const logger = require('../public/javascripts/logger');
// 使用连接池，提升性能
const pool = mysql.createPool(conf.mysql);
const common = require('../public/javascripts/common');
const  contract = require('./contractABI');



const session = require('express-session');
const app = express();
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

module.exports = {
    add: function (req, res, next) {
        const {address} = req.body;  // 获取用户名和密码
        let msg;
        contract.signUser(address);

        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
                return;
            }
            const param = req.body;
            // 建立连接，向表中插入值
            connection.query(sql.queryByAddress, address, function (err, result) {
                let ret;
                if (err) {
                    logger.error(err);
                } else {
                    ret = {
                        code: 0,
                        data: result
                    };
                }
                if (result[0] != null) {
                    msg = "已注册";
                    res.render('register', {error: msg});
                } else {
                    connection.query(sql.insert, [param.name, param.password, param.gender, address, param.birthday, param.phone,param.email], function (err, result) {
                        if (err) {
                            logger.error(err);
                        } else {
                            res.render('login',{address: "基于 DAO 的知识型社区"});
                        }

                    });
                }
                connection.release();
            });

        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            const uid = req.query.uid.toString();

            connection.query(sql.delete, uid, function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    result = {
                        code: 0,
                        msg: '删除成功'
                    };
                }
                common.jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        const param = req.body;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.update, [param.name, param.sex, param.password, param.uid], function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    result = {
                        code: 0,
                        msg: '增加成功'
                    };
                }
                connection.release();
            });
        });
    },
    queryById: function (req, res, next) {
        const uid = req.query.uid; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryById, uid, function (err, result) {
                let ret;
                if (err) {
                    logger.error(err);
                } else {
                    ret = {
                        code: 0,
                        data: result
                    };
                }
                // common.jsonWrite(res, ret);
                connection.release();
            });
        });
    },
    queryByAddress: function (req, res, next) {
        // var address = req.query.address; // 为了拼凑正确的sql语句，这里要转下整数
        // var password = req.query.password;

        const {address, password} = req.body;  // 获取用户名和密码
        console.log("userDao Test 1: ", address, " + ", password);

        let msg;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryByAddress, address, function (err, result) {
                let ret;
                if (err) {
                    logger.error(err);
                } else {
                    ret = {
                        code: 0,
                        data: result
                    };
                }
                // common.jsonWrite(res, ret);
                if (result[0] == null) {
                    msg = "未注册";
                    res.render('register', {error: msg, address: "基于 DAO 的知识型社区"});
                } else {
                    if (result.length && result[0].password === password) {
                        // 登录成功
                        msg = "欢迎来到论坛！";
                        console.log(msg);
                        req.session.address = address;
                        res.render('index', {address: "欢迎：" + address});
                    } else {
                        // 登录失败
                        res.render('login');
                    }
                }
                connection.release();
                console.log("msg3: " + msg);
                // res.render('index',{ title: 'Express ejs',people: 'people',msg: msg});
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            // console.log(req.user.uid);
            connection.query(sql.queryAll, function (err, result) {
                var ret;
                if (err) {
                    logger.error(err);
                } else {
                    ret = {
                        code: 0,
                        data: result
                    };
                }
                common.jsonWrite(res, ret);
                connection.release();
            });
        });
    },
};
