const jwt = require('jsonwebtoken');
const { uuid } = require('../config/config.default')
const { promisify } = require('util');
const toJwt = promisify(jwt.sign)
const toVerify = promisify(jwt.verify)

//验证token
module.exports.verifyToken = async (req,res,next) => {
    //获取token编码
    var token = req.headers.authorization;
    //如果token存在去除需要验证的token
    token = token ? token.split("Bearer ")[1] : null
    //验证token是否存在
    if(!token) { 
        res.status(402).json({error:"请传入token"})
    }
    //成功
    try {
       let userinfo = await toVerify(token,uuid)
       req.user = userinfo
       next()
       //失败
    } catch (error) {
        await res.status(402).json({error:"无效的token"})
    }
    
}

//生成token
module.exports.createToken = async userinfo => {
    return await toJwt(
        { userinfo },
        uuid,//唯一编码 uuid生成
        {
            expiresIn: 60 * 60 //设置token时间
        }
    )
}