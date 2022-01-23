const model = require('../db/models')

const { Blog } = model


const getBlogList = async (ctx) => {
    const {
        page
    } = ctx.request.query
    // 设置分页
    let limit = 2
    let offset = (page - 1) * 2

    const blogs = await Blog.findAndCountAll({
        limit,
        offset
    })

    ctx.body = blogs
}

const addBlog = async (ctx) => {
    const blog = await Blog.create(ctx.request.body)
    ctx.body = blog
}

const deleteBlog = async (ctx) => {
    const {
        id
    } = ctx.request.query

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

}

const editBlog = async (ctx) => {
    const {
        content,
        id
    } = ctx.request.body
    const blog = await Blog.findOne({
        where: id
    })

    if (blog) {
        blog.update({
            content
        })
        ctx.body = {
            content: blog.content,
            msg: '更新成功'
        }
    } else {
        ctx.body = {
            msg: '更新失败'
        }
    }
}

const lookBlog = async (ctx) => {
    const {
        id
    } = ctx.request.query
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
}

module.exports = {
    getBlogList,
    addBlog,
    deleteBlog,
    editBlog,
    lookBlog
}