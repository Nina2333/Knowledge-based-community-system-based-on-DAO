const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();
var userDao = require('../models/userDao');
var communityDao = require('../models/communityDao');
var articleDao = require('../models/articleDao');


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
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        communityDao.queryAll(req, res, next);
    }
});

router.get('/communityDetail', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    const {cid} = req.query;
    console.log(cid);
    if (address == null) {
        res.render('login')
    } else {
        // res.render('community-detail', {address: "欢迎：" + address})
        communityDao.queryById(req,res,next);
    }
});

router.get('/returnCommunity', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    const aid = req.query.aid;
    console.log("returnCommunity aid："+aid);
    if (address == null) {
        res.render('login')
    } else {
        communityDao.queryByAid(res,req,next);
    }
});

//用户加入论坛
router.get('/article', async function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        // res.render('article', {address: "欢迎：" + address})
        await communityDao.userInsert(req, res, next);
        communityDao.queryById(req,res,next);
    }
});

router.get('/userArticle', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        // res.render('article', {address: "欢迎：" + address})
        communityDao.queryByCid(req,res,next);
    }
});

router.get('/article-detail', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    const {aid} = req.query;
    console.log(aid);
    if (address == null) {
        res.render('login')
    } else {
        articleDao.queryById(req,res,next);
    }
});


router.get('/addArticle', function (req, res, next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        res.render('addArticle', {address: "欢迎：" + address, account:address});

    }
});

const upload = multer({ dest: 'uploads/' });
// 添加论坛
router.post('/postFile', upload.single('logo'), (req, res,next) => {

    var param = req.params;

    let fileData = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(req.file.originalname);
    console.log("fileData: %s",fileData);
    let olderFile = req.file.path;
    console.log("olderFile: %s",olderFile);
    let newFile = path.join(__dirname, '../uploads/' + fileData);
    fs.rename(olderFile,newFile,function(err){
        if(err){
            res.send("重命名错误");
        }else{
            console.log("file rename: "+req.file.destination+fileData);
            console.log("addPath: "+newFile);
            // var addPath = "./file/add/test3.mp4";
            var fileString = fs.readFileSync(newFile);
            // let a = Buffer.from(fileString);
            // console.log("buff: "+a);
            ipfs.add(fileString,async (err,result)=>{
                if(err) throw err;

                // console.log("ipfs add: "+result);
                var hash = result[0].hash;
                console.log("ipfs add file hash: "+hash);


                const tokenMetadata = {
                    "name": param.c_name,
                    "description": param.c_name,
                    "image": `ipfs://${hash}`,
                };

                const metadataBuffer = Buffer.from(JSON.stringify(tokenMetadata));
                // const metadataResult = ipfs.add(metadataBuffer);
                var metadataCID;
                ipfs.add(metadataBuffer,async (err,result)=>{
                    if(err) throw err;
                    metadataCID = result[0].hash;
                    console.log({metadataCID});
                    communityDao.add(req,hash,metadataCID,res, next);
                });

            });
            // res.send("文件上传成功");
        }

        // let tokenHash = contract.createTokenMetadata(param.c_name, param.c_name, hash);
        // console.log({tokenHash});
        // contract.createCommunities(param.c_name,address,tokenHash);


    });
});
// 添加文章
router.post('/postArticle', (req, res,next) => {
    const {address} = req.session;  // 获取用户名和密码
    const {cid} = req.session;
    console.log(cid);
    console.log(req.body);
    if (address == null) {
        res.render('login')
    } else {
        articleDao.add(req, res, next);
    }
});
// 添加评论
router.post('/articleComment', async function (req,res,next) {
    const {address} = req.session;  // 获取用户名和密码
    if (address == null) {
        res.render('login')
    } else {
        console.log("-------------------- comment");
        await articleDao.commentInsert(req,res,next);
        console.log("-------------------- comment inserted");
        await articleDao.queryById(req,res,next);
    }
});


module.exports = router;