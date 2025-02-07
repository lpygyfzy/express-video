//mongoose 第三方库，用来简化mongodb代码，使用简单 下载方式 npm install mongoose
const mongoose = require('mongoose')
const { mongodbpath } = require('../config/config.default')
//连接数据库
async function main() {
    await mongoose.connect(mongodbpath)
}

main().then(res => {
    console.log("mongodb连接成功");
}).catch(err => {
    console.log(err);
    console.log("mongodb连接失败");
})

module.exports = { 
    User: mongoose.model('User',require('./userModel'))
}

// //创建数据类型
// const user = new mongoose.Schema({
//     username: {
//         type: String,
//         require: true
//     },
//     age: {
//         type: Number,
//         require: true
//     }
// })

// const usreModel = mongoose.model('User',user)
// const u = new usreModel({username:'lisi',age:15})
// u.save()