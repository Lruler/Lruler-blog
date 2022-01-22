const models = require('../db/models')
const router = require('koa-router')()

router.prefix('/login')

const { User } = models

router.post('/', async (ctx) => {
  try {
    const { userName, password } = ctx.request.body

    let user = await User.findOne({
      where: {
        userName,
      }
    })

    if (user) {
      ctx.body = user.password === password ? {
        code: 0,
        msg: '登陆成功'
      } : {
        code: -1,
        msg: '密码错误'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '该用户不存在'
      }
    }

  } catch (error) {
    throw error
  }
})

/*
router.get('/look', async () => {
  const { page } = ctx.request.body
  let limit = 10
  let offect = (page - 1) * limit
  models.User.findAndCountAll({
    where: {
      page
    },
    offect,
    limit
  })
})
pm2 

*/

module.exports = router