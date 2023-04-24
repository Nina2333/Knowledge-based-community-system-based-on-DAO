var mysql = require('mysql');
var express = require('express');
var conf = require('../conf/db');
var sql = require('./voteSqlMapping');
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

// 北京时间：2021-11-18 22:14:24
/* 时间yyyy-MM-dd HH:mm:ss转为时间戳 */
function timeToTimestamp(time) {
    let timestamp = Date.parse(new Date(time).toString());
    //timestamp = timestamp / 1000; //时间戳为13位需除1000，时间戳为13位的话不需除1000
    console.log(time + "的时间戳为：" + timestamp);
    return timestamp;
    //2021-11-18 22:14:24的时间戳为：1637244864707
}

function judgeIsExist(req,res, next) {
    const {address} = req.session;
    const {vid} = req.query;
    pool.getConnection(function(err, connection) {
        connection.query(sql.queryByDId, vid, function (err, result) {
            if (err){
                console.log(err);
            }
            if (result.length != 0){
                return false;
            } else {
                return true;
            }
        })
    })
}


module.exports = {
    // 添加决议
    add: async function (req, res, next) {
        let msg;
        const {address} = req.session;
        console.log("vote add address：" + address);
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                return;
            }
            let param = req.body;
            console.log({param});
            let startTime = timeToTimestamp(param.startTime);
            let endTime = timeToTimestamp(param.endTime);
            console.log({startTime, endTime});
            // 建立连接，向draft表中插入值
            connection.query(sql.insert, [param.communityId, startTime, endTime, address, param.draftName, param.topic, param.draftDetail, param.number], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    msg = "添加成功";
                    console.log(msg);
                    connection.query(sql.queryAll, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        if (result == null) {
                            let msg = "暂无决议需要参与";
                            res.render('vote', {address: "欢迎：" + address, drafts: result, error: msg});
                        } else {
                            res.render('vote', {address: "欢迎：" + address, drafts: result});
                        }
                    });
                }
            });
            connection.release();
        });
    },
    // 更新投票
    update: function(req,select,res, next) {
        const {address} = req.session;
        let option;
        let draftResult;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
                return;
            }
            let {vid} = req.query;
            console.log({vid});
            if (select == 1) {
                option = "disagree";
            } else if (select == 0) {
                option = "agree";
            }
            console.log({option});
            connection.query(sql.queryByDId, [vid], function (err, result) {
                // 建立连接，向draft表中插入值
                let num = result.length;
                connection.query(sql.accountInsert, [vid, address, option], function (err, result) {
                    if (err) {
                        logger.error(err);
                    } else {
                        console.log({result});
                        connection.query(sql.queryByVId, vid, function (err, result) {
                            if (err) {
                                logger.error(err);
                            }
                            draftResult = result;
                            let vnum = result[0].number;
                            let a = Number(num/vnum);
                            let percentage = parseFloat(a).toFixed(1);
                            console.log({percentage :percentage*100});
                            connection.query(sql.queryByDId, vid, function (err, result) {
                                if (err) {
                                    logger.error(err);
                                }
                                if (result == null) {
                                    let msg = "暂无决议需要参与";
                                    res.render('vote-detail', {address: "欢迎：" + address, vote: draftResult, accounts: result, error: msg, percentage: percentage*100});
                                } else {
                                    res.render('vote-detail', {address: "欢迎：" + address, vote: draftResult, accounts: result, percentage: percentage*100});
                                }
                            });
                        });
                    }
                    return result;
                });
                connection.release();
            });
        });
    },
    queryByAddress: function(req, res, next) {
        const {address} = req.session;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryByAddress, address, function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    console.log(result);
                    res.render('addVote', {address: "欢迎：" + address, article: result});
                }
            });
            connection.release();
        })
    },
    isFinish:function(req, res,next) {
        const {address} = req.session;
        let {vid} = req.query;  // 获取决议id
        console.log({vid});
        let draftResult;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryByVId, vid, function (err, result) {
                if (err) {
                    logger.error(err);
                }
                let number = result[0].number;
                connection.query(sql.queryByDId,vid, function (err, result) {
                    if (err) {
                        logger.error(err);
                    }
                    if (number < result.length ){
                        return true;
                    }else {
                        return false;
                    }
                })
            });
            connection.release();
        });
    },
    queryById: function (req, res, next) {
        const {address} = req.session;
        let {vid} = req.query;  // 获取决议id
        console.log({vid});
        let draftResult;
        pool.getConnection(async function (err, connection) {
            if (err) {
                logger.error(err);
            }
            await connection.query(sql.queryByVId, vid,  function (err, result) {
                if (err) {
                    logger.error(err);
                }
                draftResult = result;
                 connection.query(sql.queryByDId, vid, function (err, result) {
                    if (err) {
                        logger.error(err);
                    }
                    if (result == null) {
                        let msg = "暂无决议需要参与";
                        // res.render('vote-detail', {address: "欢迎：" + address, vote: draftResult, accounts: result, error: msg});
                    } else {
                        let voteAccountsResult = result;
                        let num = result.length;
                        connection.query(sql.queryByVId,vid,function(err,result){
                            let vnum = result[0].number;
                            let a = Number(num/vnum);
                            let percentage = parseFloat(a).toFixed(1);
                            console.log({percentage: percentage*100});
                            res.render('vote-detail', {address: "欢迎：" + address, vote: draftResult, accounts: voteAccountsResult,percentage: percentage*100});
                        });
                    }
                });

            });
            connection.release();
        });
    },
    queryAll: function (req, res, next) {
        const {address} = req.session;
        let draftResult;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryAll, function (err, result) {
                if (err) {
                    logger.error(err);
                }
                if (result == null) {
                    let msg = "暂无决议需要参与";
                    res.render('vote', {address: "欢迎：" + address, drafts: result, error: msg});
                } else {

                    res.render('vote', {address: "欢迎：" + address, drafts: result});
                }
            });
            connection.release();
        });
    },
    judgeIsExist:judgeIsExist
};