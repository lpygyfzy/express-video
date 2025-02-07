//中间件库，它能帮助开发者轻松地对传入的请求数据进行验证和清理，确保数据的有效性和安全性 安装方式 npm install express-validator
const { body, validationResult } = require('express-validator');
const validate = require('./errorBack');
const { User } = require('../../model');

//用户注册
module.exports.register = validate([ 
    body('username').notEmpty().withMessage('用户名不能为空').bail()
    .isLength({ min: 3 }).withMessage('用户名不能小于3').bail(),
    body('email').notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async val => {
        const emailValidate = await User.findOne({email: val})
        if(emailValidate) { 
            return Promise.reject('邮箱已经被注册')
        }
    }).bail(),
    body('phone').notEmpty().withMessage('手机号不能为空').bail()
    .isLength({ min: 11 }).withMessage('手机号不能小于11位').bail(),
    body('password').notEmpty().withMessage('密码不能为空').bail()
    .isLength({ min: 6 }).withMessage('密码不能小于6').bail(),
])
//用户登录
module.exports.login = validate([ 
    // body('username').notEmpty().withMessage('用户名不能为空').bail()
    // .isLength({ min: 3 }).withMessage('用户名不能小于3').bail(),
    body('email').notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async val => {
        const emailValidate = await User.findOne({email: val})
        if(!emailValidate) { 
            return Promise.reject('邮箱未注册')
        }
    }).bail(),,
    // body('phone').notEmpty().withMessage('手机号不能为空').bail()
    // .isLength({ min: 11 }).withMessage('手机号不能小于11位').bail(),
    body('password').notEmpty().withMessage('密码不能为空').bail()
    .isLength({ min: 6 }).withMessage('密码不能小于6'),
])

//用户修改
module.exports.updata = validate([ 
    body('username')
    .if((value, { req }) => req.body.username !== undefined) // 检查 username 是否存在于请求体中
    .isLength({ min: 3 }).withMessage('用户名不能小于3').bail()
    .custom(async val => {
        if(val) { 
            const userValidate = await User.findOne({username: val})
            if(userValidate) { 
                return Promise.reject('用户名已存在')
            }
        }
        
    }).bail(),
    body('email')
    .custom(async val => {
        const emailValidate = await User.findOne({email: val})
        if(emailValidate) { 
            return Promise.reject('邮箱已经注册')
        }
    }).bail(),
    body('phone')
    .if((value, { req }) => req.body.phone !== undefined) // 检查 phone 是否存在于请求体中
    .isLength({ min: 11 }).withMessage('手机号不能小于11位').bail()
    .custom(async val => {
        // console.log('phone:',val);
        if(val) { 
            const phoneValidate = await User.findOne({phone: val})
            //console.log('phone:',phoneValidate);
            if(phoneValidate) { 
                return Promise.reject('手机号已存在')
            }
        }
        
    }).bail(),
    // body('password').notEmpty().withMessage('密码不能为空').bail()
    // .isLength({ min: 6 }).withMessage('密码不能小于6'),
])