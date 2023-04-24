var express = require('express');
var router = express.Router();

var tokenDao = require('../models/tokenDao');

router.use('/userLogin', function (req, res, next) {
  if (req.method === 'OPTIONS') {
    res.send('GET,HEAD');
  } else {
    tokenDao.getToken('admin', req, res, next);
  }
});

router.use('/', function (req, res, next) {
  if (req.method === 'OPTIONS') {
    res.send('GET,HEAD');
  } else {
    tokenDao.getToken('teacher', req, res, next);
  }
});
module.exports = router;
