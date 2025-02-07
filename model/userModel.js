const mongoose = require('mongoose')
const md5 = require('../util/md5');
//创建数据类型
const userSchema = new mongoose.Schema({
    username: { //用户名称
        type: String,
        require: true
    },
    email: { //邮箱
        type: String,
        require: true
    },
    phone: { //手机号
        type: String,
        require: true
    },
    password: { //密码
        type: String,
        require: true,
        set: value => md5(value),
        select: false
    },
   
    image: { //图片
        type: String,
        default: null
    },
    createAt: { //创建时间
        type: Date,
        default: Date.now()
    },
    updateAt: { //更新时间
        type: Date,
        default: Date.now()
    },
    cover: { //频道封面
        type: String,
        default: null
    },
    channeldes: { //频道描述
        type: String,
        default: null
    },
})

module.exports = userSchema