const { User } = require('../model/index')

//const jwt = require('jsonwebtoken');
const { createToken } = require('../util/jwt')
//用户注册
exports.register = async (req, res) => {
    console.log(req.body);
    const userModel = new User(req.body)
    let dbBack = await userModel.save()
    console.log('register', dbBack);
    user = dbBack.toJSON()
    delete user.password
    res.status(201).json(dbBack)
}
//用户登录
exports.login = async (req, res) => {
    //客户端数据验证
    //连接数据库查询
    var dbBack = await User.findOne(req.body)
    console.log('login', dbBack);
    if (!dbBack) {
        res.status(402).json({ error: "邮箱或密码不正确" })
        return
    }

    //转json
    dbBack = dbBack.toJSON()
    // //添加token
    dbBack.token = await createToken(dbBack);
    res.status(200).json(dbBack)
}

//修改用户信息
exports.updata = async (req, res) => {

    var dbBack = await User.findByIdAndUpdate(req.user.userinfo._id, req.body, { new: true });
    console.log('updata', dbBack);
    res.status(202).json({user:dbBack})
}

exports.list = async (req, res) => {
    console.log('userlist', req.method);
    res.send('/user-list');
}

exports.delete = async (req, res) => {
    console.log('userDelete', req.method);
}