var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();
var userDao = require('../models/userDao');

// 解析application/x-www-form-urlencoded格式的请求体
app.use(bodyParser.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource hhhhh');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login1', function(req, res, next) {
  const { email, password } = req.body;  // 获取用户名和密码
  // console.log(email,password);
  userDao.hello(req,res,next);

});


router.post('/deleteUser', function (req, res, next) {
  userDao.delete(req, res, next);
});
router.post('/updateUser', function (req, res, next) {
  userDao.update(req, res, next);
});

router.get('/queryAll', function (req, res, next) {
  userDao.queryAll(req, res, next);
});
router.get('/query', function (req, res, next) {
  userDao.queryById(req, res, next);
});
router.get('/deleteUser', function (req, res, next) {
  userDao.delete(req, res, next);
});



module.exports = router;
