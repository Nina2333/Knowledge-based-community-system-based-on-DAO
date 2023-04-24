var mysql = require('mysql');
var express = require('express');
var conf = require('../conf/db');
var sql = require('./scoreSqlMapping');
var userSql = require('./userSqlMapping');
var communitySql = require('./communitySqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);

const session = require('express-session');
const app = express();
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

module.exports = {

    queryScoreByAddress: function (req, res, next) {
        const {address} = req.session;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
            }
            // 获取用户加入的论坛积分
            connection.query(sql.queryScoreByToken, address, function (err, result) {
                if (err) {
                    console.error(err);
                }
                let scoreResult = result;
                // 获取用户信息
                connection.query(userSql.queryByAddress,address,function (err, result){
                    if (err) {
                        console.error(err);
                    }
                    let userResult = result;
                    let role = result[0].role;
                    // 获取创建的社区信息
                    connection.query(communitySql.queryUserCommunityByAddress,address,function(err,result){
                       if(err) {
                           console.log(err);
                       }
                       let userCommunity = result;
                        // 获取文章信息
                       connection.query(sql.queryArticleByAddree,address,function(err,result){
                           if (err) {
                                console.log(err);
                           }
                           let articleResult = result;
                           connection.query(userSql.queryRoleAddress,address,function(err,result){
                               if (err) {
                                   console.log(err);
                               }
                               res.render('UC', {address: "欢迎：" + address,admin:result ,role:role,scores: scoreResult, user: userResult,community: userCommunity,article: articleResult});
                           });
                       })
                    });
                });
                connection.release();
            });
        })
    }
};