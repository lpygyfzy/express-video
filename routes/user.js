const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
//中间件库，它能帮助开发者轻松地对传入的请求数据进行验证和清理，确保数据的有效性和安全性 安装方式 npm install express-validator
const validator = require('../middleware/validator/userValidator')
//引入验证token的中间件
const { verifyToken } = require("../util/jwt")
router
    //注册
    .post('/registers',
        validator.register,
        userController.register)
    //登录
    .post('/logins',
        validator.login,
        userController.login)
    //修改
    .put('/',
        verifyToken,
        validator.updata,
        userController.updata)    
    .get('/lists', verifyToken,userController.list)
    .delete('/', userController.delete)

module.exports = router;