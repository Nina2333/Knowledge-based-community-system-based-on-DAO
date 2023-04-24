const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
//撒盐，加密时候混淆
const secret = '113Bmongojsdalkfnxcvmas';
// const user = {
//     id: 10,
//     name: "Bmongo",
//     age: 16,
// };


module.exports = {
    //生成token
    //info也就是payload是需要存入token的信息
    createToken: function createToken(info) {
        let token = jwt.sign(info, secret, {
            //Token有效时间 单位s
            expiresIn: 60 * 60 * 10
        });
        return token
    },

    //验证Token
    verifyToken: function verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
};


// app.get("/api/info", (req, res) => {
//     res.send({
//         result: 1,
//         data: {
//             "name": "Bmongo",
//             "id": 1
//         }
//     })
// });