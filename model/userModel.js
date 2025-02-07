const mongoose = require('mongoose')
const md5 = require('../util/md5');
//创建数据类型
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        set: value => md5(value),
        select: false
    },
   
    image: {
        type: String,
        default: null
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = userSchema