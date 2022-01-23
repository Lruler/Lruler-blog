const { login } = require('../controller/user')
const router = require('koa-router')()

router.prefix('/login')


router.post('/', login)

module.exports = router