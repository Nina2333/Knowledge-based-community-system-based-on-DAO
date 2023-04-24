var mysql = require('mysql');
var express = require('express');
var conf = require('../conf/db');
var sql = require('./communitySqlMapping');
var scoreSql = require('./scoreSqlMapping');
var logger = require('../public/javascripts/logger');
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

function getNowFormatDate() {
    let date = new Date(),
        year = date.getFullYear(), //获取完整的年份(4位)
        month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate = date.getDate(); // 获取当前日(1-31)
    if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
    if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

    return `${year}-${month}-${strDate}`
}


module.exports = {
    add: async function (req, res, next) {
        let msg;
        const {address} = req.session;
        const {cid} = req.session;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                return;
            }
            var param = req.body;
            let i;
            const timestamp = getNowFormatDate();

            //获取当前日期函数
            console.log("获取当前日期函数：" + timestamp);
            // 建立连接，向article表中插入值
            connection.query(sql.articleInsert, [cid, param.aName, address, timestamp, param.topic, param.detail],async function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    console.log(result);
                    msg = "添加成功";
                    console.log(msg);
                    let aid = result.insertId;
                    await connection.query(sql.queryCommunityById,cid,function(err,result){
                        if(err){
                            console.log(err);
                        }
                        // 创建文章获得10个代币奖励
                        connection.query(scoreSql.scoreInsert,[address,cid,10,2,"ERC20",result[0].c_name], function(err, result) {
                            if(err){
                                console.log(err);
                            }
                        })
                    });

                   await connection.query(sql.queryArticleByAId, aid, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        let articleResult = result;
                        connection.query(sql.queryComments, aid, function (err, result) {
                            res.render('article-detail', {address: "欢迎：" + address, article: articleResult,comments: result});
                        })
                    });
                }
            });
            connection.release();
        });
    },

    commentInsert: function (req, res, next) {
        const {address} = req.session;
        let {aid} = req.query;
        var param = req.body;
        console.log({param});
        let cid;
        var timestamp = Date.now();
        let community;
        pool.getConnection(async function (err, connection) {
            if (err) {
                logger.log(err);
            }
            console.log("-------------------------------- mysql connection");
            // 评论添加
            await connection.query(sql.commentInsert, [aid, address, param.comment, timestamp], function (err, result) {
                if (err) {
                    console.log(err);
                }
            });
            // 拿到论坛id
            await connection.query(sql.queryArticleByAId,aid,function (err,result) {
                if (err) {
                    console.log(err);
                }
                cid = result[0].communityId;
                // 拿到论坛信息
                 connection.query(sql.queryCommunityById,cid,function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    community = result[0].c_name;
                    console.log({"queryCommunityById":community});
                     // 判断是否有这个社区的erc20
                     connection.query(scoreSql.queryScoreByUid,[address,cid], function(err,result){
                         // 没有就insert，有就update
                         let tokenName = community;
                         if (result.length == 0) {
                             connection.query(scoreSql.scoreInsert,[address,cid,5,2,"ERC20",tokenName],function(err,result){
                                 if (err) {
                                     console.log(err);
                                 }
                                 console.log({"积分添加成功":result});
                             })
                         } else {
                             let newScore = result[0].score + 5;
                             connection.query(scoreSql.scoreUpdate,[newScore,address,cid],function(err,result){
                                 if (err) {
                                     console.log(err);
                                 }
                                 console.log({"积分更新成功":result});
                             })
                         }
                     });
                });
            });
            connection.release();
        })
    },

    queryById: function (req, res, next) {
        const {address} = req.session;
        let {aid} = req.query;  // 获取用户名和密码
        let articleResult;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
            }
            connection.query(sql.queryArticleByAId, aid, function (err, result) {
                if (err) {
                    console.error(err);
                } else {
                    articleResult = result;
                    connection.query(sql.queryComments, aid, function (err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            res.render('article-detail', {
                                address: "欢迎：" + address,
                                article: articleResult,
                                comments: result
                            });
                        }
                        connection.release();
                    });
                }
            });

        });
    },
};