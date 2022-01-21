const models = require('../db/models')
const router = require('koa-router')()

router.prefix('/login')

const { User } = models

router.post('/', async (ctx) => {
  try {
    const {
      userName,
      password
    } = ctx.request.body

    console.log(userName, password);

    let users = await User.findOne({
      where: {
        userName,
        password
      }
    })

    if (users) {
      ctx.body = {
        users,
        msg: '登陆成功'
      }
    } else {
      ctx.body = {
        msg: '该用户不存在'
      }
    }

  } catch (error) {
    throw error
  }
})

/*
 router.post('/add', async (ctx) => {
  try {
    const { Username, password} = ctx.request.body

    // create 增加
    let user = await models.User.create({
      userName,
      password
    })

    ctx.body = {
      user,
      msg: '创建成功！'
    }

  } catch (error) {
    throw error
  }

})

router.post('/update', async (ctx) => { 
  try {
    const {userName, password, id } = ctx.request.body
    // findOne 查找 只写where就是查全部
    let user = await models.User.findOne({
      where: {
        id
      }
    })
    if (user) {
      user = await user.update({
        userName,
        password,
      })
    }
    ctx.body = {
      user
    }
  } catch (error) {
    throw error
  }
})

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