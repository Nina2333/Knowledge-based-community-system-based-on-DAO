const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const communityDao = require('../models/communityDao');
const voteDao = require('../models/voteDao');
const jwt = require('./jwt');
const cookie = require('cookie');


// 解析application/x-www-form-urlencoded格式的请求体
app.use(bodyParser.urlencoded({extended: false}));


router.get('/', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        voteDao.queryAll(req, res, next);
    }
});

router.get('/create', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        voteDao.queryByAddress(req, res, next);
    }
});

router.get('/vote-detail',function(req, res,next){
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        voteDao.queryById(req, res, next);
    }
});

router.get('/updateUser/0',function(req, res, next){
    const {address} = req.session;
    const select = 0;
    console.log({select});
    if (address == null) {
        res.render('login')
    }else{
         voteDao.update(req, select,res, next);
    }
});

router.get('/updateUser/1',function(req, res, next){
    const {address} = req.session;
    const select = 1;
    console.log({select});
    if (address == null) {
        res.render('login')
    }else{
     voteDao.update(req, select,res, next);
    }
});

router.post('/addDraft', (req, res,next) => {
    const {address} = req.session;  // 获取用户名和密码

    if (address == null) {
        res.render('login')
    } else {
        voteDao.add(req, res, next);
    }
});


module.exports = router;