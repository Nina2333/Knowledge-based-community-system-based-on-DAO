var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();
var userDao = require('../models/userDao');
var contract = require('../models/contractABI');
var score = require('../models/scoreDao');

var jwt = require('./jwt');
const cookie = require('cookie');
const fs = require('fs');
const create = require('ipfs-http-client');
const ipfs = create({host: 'localhost', port: 5001});

const multer = require('multer');
const path = require('path');

// 解析application/x-www-form-urlencoded格式的请求体
app.use(bodyParser.urlencoded({extended: false}));

router.get('/', function (req, res, next) {
    res.render('login')
});

router.get('/login', function (req, res, next) {
    res.render('login')
});

router.get('/index', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        res.render('index', {address: "欢迎：" + address});
    }
});

router.get('/register', function (req, res, next) {
    res.render('register', {address: "基于 DAO 的知识型社区"});
});


router.get('/UC', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        score.queryScoreByAddress(req, res, next);
    }
});



router.get('/ipfs', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        res.render('addCommunity',{address: "欢迎：" + address});
    }
});


router.get('/userOut', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    req.session.destroy();
    res.render('login', {address: "基于 DAO 的知识型社区"});
});

router.post('/login', function (req, res, next) {
    const {address, password} = req.body;  // 获取用户名和密码
    let whetherValid =  contract.isAddress(address);
    console.log({whetherValid});
    if (whetherValid == true){
        console.log("index.js login 1: ", address, " + ", password);

        // 创建 token
        var userInfo = {
            address: address,
            password: password
        };
        userDao.queryByAddress(req, res, next);
        let token = jwt.createToken(userInfo);    //生成 token 并返回给客户端 res.json({ token });
        const cookieOptions = {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 设置cookie过期时间为一天
            path: '/', // 设置cookie的路径
        };
        res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));
    } else {
        res.render('login',{address: "基于 DAO 的知识型社区",error:"请输入正确的地址"});
    }

});

router.post('/sign', function (req, res, next) {
    const {name, birthdy, address, password} = req.body;  // 获取用户名和密码
    console.log("index.js sign 2: ", name, " + ", birthdy, " + ", address, " + ", password);
    let whetherValid =  contract.isAddress(address);
    console.log({whetherValid});
    if (whetherValid == true){
        userDao.add(req, res, next);
    }else{
        res.render('register', {address: "基于 DAO 的知识型社区",error:"请输入正确的地址"});
    }
});


module.exports = router;
