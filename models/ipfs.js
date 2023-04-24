// 上传文件模块
const multiparty = require('multiparty');

// 文件操作模块
const fs = require('fs');


const create = require('ipfs-http-client');
const ipfs = create({host: 'localhost', port: 5001});

// const buffer = Buffer.from('this is a demo');
// const ipfsFile = ipfs.add(buffer).then( rsp => console.log(rsp[0].hash)).catch(err => console.error(err));

module.exports = {

    addFileToIPFS: function (req,hash,res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
                return;
            }
            var param = req.body;
            // 建立连接，向表中插入值
            connection.query(sql.insert, [param.c_name,param.topic, hash, param.time,param.account,param.detail], function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    result = {
                        code: 0,
                        msg: '增加成功'
                    };
                }

                //释放连接
                // showError(msg);
                res.render('login', {error: msg});
            });

            connection.release();
            console.log("msg3: " + msg);
            // res.render('index',{ title: 'Express ejs',people: 'people',msg: msg});

        });

    },
};


