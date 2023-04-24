var mysql = require('mysql');
var express = require('express');
var conf = require('../conf/db');
var sql = require('./communitySqlMapping');
var scorSql = require('./scoreSqlMapping');
var logger = require('../public/javascripts/logger');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('../public/javascripts/common');
var contract = require('../models/contractABI');

var session = require('express-session');
var app = express();
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

let communityId = 0;

module.exports = {
    //创建论坛
    add: async function (req, hash, metadataCID ,res, next) {
        let msg;
        let userResult;
        let communityResult;
        var param = req.body;
        const {address} = req.session;
        // web3 合约交互
        contract.createCommunities(param.c_name,address,metadataCID);
        contract.getCommunityToken();

        // 连接数据库
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }

            let i;
            const timestamp = getNowFormatDate();
            //获取当前日期函数

            // 建立连接，向community表中插入值
            connection.query(sql.insert, [param.topic, param.c_name, hash, 1, timestamp, address, param.detail,metadataCID], function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log({insertId:result.insertId});
                contract.getCommunityToken(result.insertId);
                connection.query(sql.queryAllCommunity, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result[0] == null) {
                        msg = "没有查询到社区";
                        communityResult = msg;
                        console.log(communityResult);
                    } else {
                        i = result.length;
                        communityResult = result;
                        // 插入 userCommunity
                        connection.query(sql.userInsert, [address, i, param.c_name, param.topic], async function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("添加 user community Successfully");
                            }
                            // ERC721 1,ERC20 2
                            await connection.query(scorSql.scoreInsert,[address,i,1,1,"ERC721",param.c_name],function(err,result){
                                if (err){
                                    console.log(err);
                                }
                            });
                            await connection.query(scoreSql.scoreInsert,[address,i,10,2,"ERC20",param.c_name], function(err, result) {
                                if(err){
                                    console.log(err);
                                }
                            });
                            await connection.query(sql.queryUserCommunityByAddress, address, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                if (result[0] == null) {
                                    msg = "还没有加入社区";
                                    userResult = msg;
                                    console.log("queryUserCommunityByAddress userResult：" + userResult);
                                } else {
                                    i = result.length;
                                    console.log("queryUserCommunityByAddress i 2：" + i);
                                    userResult = result;
                                    console.log("queryUserCommunityByAddress：查找 user community Successfully");
                                    res.render('community', {address: "欢迎：" + address, community: communityResult, userCommunity: userResult});
                                }
                                connection.release();
                            });
                        });
                    }
                });
            });
        });
    },

    //用户加入论坛
    userInsert: async function (req, res, next) {
        let msg;
        let communityResult;

        const {address} = req.session;
        const {cid} = req.query;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            // 获取论坛信息
            connection.query(sql.queryCommunityById,cid, async function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result[0] == null) {
                    msg = "根据用户提供的论坛id，未找到论坛";
                    console.log(msg);
                } else {
                    communityResult = result;
                    // 调用合约
                    console.log({tokenURI:result[0].tokenURI});
                    console.log({result});

                    contract.joinCommunity(cid,address,result.tokenURI);

                    // 插入 userCommunity 数据
                    await connection.query(sql.userInsert, [address, cid, communityResult[0].c_name, communityResult[0].topic], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("加入论坛成功");
                        }
                    });

                    let membership = communityResult[0].membership++;
                    // ERC721 1,ERC20 2
                    await connection.query(scorSql.scoreInsert,[address,cid,1,1,"ERC721",communityResult[0].c_name],function(err,result){
                        if (err){
                            console.log(err);
                        }
                        console.log({"user insert score 2":result});
                    });

                    await connection.query(sql.update, [communityResult[0].topic, communityResult[0].icon, membership, cid], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("加入论坛成功");
                        }
                    });
                }
                connection.release();
            });

        });
    },

    //跳转到论坛详情页
    queryById: function (req, res, next) {
        const {address} = req.session;
        var {cid} = req.query;  // 获取用户名和密码
        let communityResult;
        let invalid = true;
        var msg;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }
            //查找id对应的论坛
            connection.query(sql.queryCommunityById,cid, function (err, result) {
                var ret;
                if (err) {
                    console.log(err);
                }
                if (result.length == 0) {
                    msg = "没有该论坛";
                    res.render('community', {address: "欢迎：" + address, error: msg});
                } else {
                    msg = "已查询到论坛消息";
                    console.log(msg);
                    communityResult = result;
                    connection.query(sql.queryUserCommunityByAddress, address, async function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].communityID == cid) {
                                invalid = false;
                            }
                        }
                        //查找论坛的文章
                        await connection.query(sql.queryArticleByCId,cid, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            //判断这个论坛用户是否已加入
                            if (result[0] == null) {
                                msg = "该论坛没有文章";
                                res.render('community-detail', {address: "欢迎：" + address, invalid: invalid, communityByID: communityResult, articleByCId: result, error: msg});
                            } else {
                                for (let i = 0; i < result.length; i++) {
                                    if (result[i].userAddress == address) {
                                        res.render('community-detail', {address: "欢迎：" + address, invalid: invalid, communityByID: communityResult, articleByCId: result});
                                    }
                                    res.render('community-detail', {address: "欢迎：" + address, invalid: invalid, communityByID: communityResult, articleByCId: result});
                                }
                            }
                            connection.release();
                        });
                    });
                }
            });
        });
    },

    //community页面展示全部的内容
    queryAll: function (req, res, next) {
        let userResult;
        const {address} = req.session;
        console.log("communityDao Test queryAllCommunity: " + address);
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }
            connection.query(sql.queryUserCommunityByAddress, address, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result[0] == null) {
                    msg = "还没有加入的社区";
                    userResult = result;
                    console.log(msg);
                } else {
                    // 登录成功
                    console.log("query by address successfully");
                    userResult = result;
                    connection.query(sql.queryAllCommunity, function (err, result) {

                        if (err) {
                            logger.error(err);
                        }
                        if (result[0] == null) {
                            msg = "没有找到论坛列表";
                            res.render('community', {address: "欢迎：" + address, community: result, userCommunity: userResult});
                            console.log(msg);
                        } else {
                            msg = "欢迎来到论坛列表";
                            console.log(msg);
                            res.render('community', {address: "欢迎：" + address, community: result, userCommunity: userResult});
                        }
                    });
                }
            });
            connection.release();
        });
    },

    //将数据展示到论坛detail页面
    queryByCid: function (req, res, next) {
        const {address} = req.session;
        const {cid} = req.query;
        communityId = cid;
        let invalid = true;
        let communityResult;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }
            //拿到论坛信息
            connection.query(sql.queryCommunityById, cid, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result[0] == null) {
                    msg = "根据用户提供的论坛id，数据出错请重试";

                } else {
                    communityResult = result;
                    console.log("原值测试：" + invalid);
                    //拿到用户加入的论坛信息
                    connection.query(sql.queryUserCommunityByAddress, address, async function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].communityID == cid) {
                                invalid = false;
                            }
                        }
                        console.log("for 循环测试：" + invalid);

                        //拿到论坛所属文章的信息
                        await connection.query(sql.queryAllByCId, cid, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            if (result[0] == null) {
                                msg = "该论坛没有文章";
                                console.log("文章测试：" + invalid);
                                res.render('community-detail', {
                                    address: "欢迎：" + address,
                                    invalid: invalid,
                                    communityByID: communityResult,
                                    articleByCId: result
                                });
                            } else {
                                res.render('community-detail', {
                                    address: "欢迎：" + address,
                                    invalid: invalid,
                                    communityByID: communityResult,
                                    articleByCId: result
                                });
                            }
                        })
                    })
                }
            });
            connection.release();
        });
    },

    queryByAid: function (req, res, next) {
        const {address} = req.session;
        const {aid} = req.query;
        let invalid = true;
        let communityResult;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }
            //拿到文章信息
            connection.query(sql.queryArticleByAId, aid, async function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log("result[0].communityId：" + result[0].communityId);
                communityId = result[0].communityId;

                //拿到论坛信息
                await connection.query(sql.queryCommunityById, communityId, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    communityResult = result;
                    //拿到用户加入的论坛信息
                    connection.query(sql.queryUserCommunityByAddress, address, async function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].communityID == cid) {
                                invalid = false;
                            }
                        }
                        console.log("for 循环测试：" + invalid);

                        //拿到论坛所属文章的信息
                        await connection.query(sql.queryArticleByCId, communityId, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            res.render('community-detail', {
                                address: "欢迎：" + address,
                                invalid: invalid,
                                communityByID: communityResult,
                                articleByCId: result
                            });
                        })
                    })
                });
            });
            connection.release();
        });
    }
};
