//中间件库，它能帮助开发者轻松地对传入的请求数据进行验证和清理，确保数据的有效性和安全性 安装方式 npm install express-validator 
//validationResult 用来处理错误
const { validationResult } = require('express-validator');

module.exports = validator => { 
    return async (req,res,next) => { 
        await Promise.all(validator.map(validate => validate.run(req)))
        const errors = validationResult(req)
        if(!errors.isEmpty()) { 
            return res.status(401).json({error: errors.array()})
        }
        next()
    }
}