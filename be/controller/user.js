const models = require('../db/models')
const { SuccessModel, ErrorModel } = require('../middleware/model')

const { User } = models

const login = async (ctx) => {
    try {
        const {
            userName,
            password
        } = ctx.request.body

        let user = await User.findOne({
            where: {
                userName,
            }
        })

        if (user) {
            ctx.body = user.password === password ? new SuccessModel('登陆成功') : new ErrorModel('密码错误')
        } else {
            ctx.body = new ErrorModel('用户不存在')
        }

    } catch (error) {
        throw error
    }
}


module.exports = {
    login
}