const router = require('koa-router')()
const model = require('../db/models')

router.prefix('/blog')

const { Blog } = model

// 获得所有文章
router.get('/list', async (ctx) => {
    const { page } = ctx.request.query
    // 设置分页
    let limit = 2
    let offset = (page - 1) * 2

    const blogs = await Blog.findAndCountAll({
        limit,
        offset
    })

    ctx.body = blogs
})

// 新增文章
router.post('/add', async (ctx) => {
    const blog = await Blog.create(ctx.request.body)
    ctx.body = blog
})

// 删除文章
router.delete('/delete', async (ctx) => {
    const { id } = ctx.request.query

    console.log(Blog.findOne, Blog.findById);
    const blog = await Blog.findOne({
        where: +id
    })
    
    if (blog) {
        blog.destroy()
        ctx.body = {
            msg: '删除成功'
        }
    } else {
        ctx.body = {
            msg: '删除失败'
        }
    }

})

// 查看文章
router.get('/get', async (ctx) => {
    const { id } = ctx.request.query
    const blog = await Blog.findOne({
        where: +id
    })

    if (blog) {
        ctx.body = {
            blog,
            msg: '查找成功'
        }
    } else {
        ctx.body = {
            msg: '查找失败'
        }
    }
})

// 修改文章
router.post('/edit', async (ctx) => {
    const { content, id } = ctx.request.body
    const blog = await Blog.findOne({
        where: id
    })
    
    if (blog) {
        blog.update({ content })
        ctx.body = {
            content: blog.content,
            msg: '更新成功'
        }
    } else {
        ctx.body = {
            msg: '更新失败'
        }
    }

})

module.exports = router