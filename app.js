
// 引入HTTP错误处理程序
var createError = require('http-errors');
// 引入Express框架
var express = require('express');
// 引入处理文件路径的Node.js内置模块
var path = require('path');
// 引入解析cookie的中间件
var cookieParser = require('cookie-parser');
// 引入HTTP请求日志中间件
var logger = require('morgan');
var jwt = require('./routes/jwt');
const session = require('express-session');

// 引入路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var communityRouter = require('./routes/community');
var voteRouter = require('./routes/vote');

// 创建Express实例
var app = express();

// view engine setup
// 视图引擎设定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/community', communityRouter);
app.use('/vote', voteRouter);

//设置允许跨域
app.use(function(req, res, next) {
  //指定允许其他域名访问 *所有
  res.setHeader("Access-Control-Allow-Origin", "*");
  //允许客户端请求头中带有的
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  //允许请求的类型
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  //让options请求快速返回
  if(req.method=="OPTIONS") res.send(200);
  else  next();
});

//白名单
const whiteList = ['/login'];

app.use((req,res,next) => {
  if(!whiteList.includes(req.url)) {
    jwt.verifyToken(req.headers.authorization).then(res => {
      next()
    }).catch(e => {
      res.status(401).send('invalid token')
    })
  } else {
    next()
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(res);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.timestampToTime = function(timestamp) {
  timestamp = timestamp ? timestamp : null;
  console.log({timestamp: timestamp});
  let date = new Date(Number(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  console.log({date});
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};

app.locals.timestampToDate = function(timestamp) {
  timestamp = timestamp ? timestamp : null;
  console.log({timestamp: timestamp});
  let date = new Date(Number(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  console.log({date});
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  return Y + M + D ;
};

module.exports = app;
