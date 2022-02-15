const path = require('path')
const model = require('../db/models')
const {
    SuccessModel,
    ErrorModel
} = require('../middleware/model')

const {
    Blog
} = model

const getBlogList = async (ctx) => {

    try {
        const {
            page
        } = ctx.request.query
        console.log(page)
        // 设置分页
        let limit = 10
        let offset = (page - 1) * 10

        const blogs = await Blog.findAndCountAll({
            limit,
            offset
        })

        ctx.body = new SuccessModel(blogs)

    } catch (error) {
        ctx.body = new ErrorModel(error)
        throw error
    }
}

const addBlog = async (ctx) => {

    try {
        const blog = await Blog.create(ctx.request.body)
        ctx.body = new SuccessModel(blog, '发布成功')
    } catch (error) {
        ctx.body = new ErrorModel(error)
        throw error
    }
}

const deleteBlog = async (ctx) => {

    try {
        const {
            id
        } = ctx.request.query
        console.log(id);
        const blog = await Blog.findOne({
            where: +id
        })

        if (blog) {
            blog.destroy()
            ctx.body = new SuccessModel(blog, '删除成功')
        } else {
            ctx.body = new ErrorModel('删除失败')
        }

    } catch (error) {
        ctx.body = new ErrorModel(error)
        throw error
    }

}

const editBlog = async (ctx) => {

    try {
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
            ctx.body = new SuccessModel(blog, '更新成功')
        } else {
            ctx.body = new ErrorModel('更新失败')
        }

    } catch (error) {
        ctx.body = new ErrorModel(error)
        throw error
    }

}

const lookBlog = async (ctx) => {

    try {
        const {
            id
        } = ctx.request.query
        const blog = await Blog.findOne({
            where: +id
        })

        if (blog) {
            ctx.body = new SuccessModel(blog, '查找成功')
        } else {
            ctx.body = new ErrorModel('查找失败')
        }

    } catch (error) {
        ctx.body = new ErrorModel(error)
        throw error
    }
}

const uploadImg = async (ctx) => {
    try {

        const file = ctx.request.files.file
        const basename = path.basename(file.path)
        ctx.body = new SuccessModel({
            "url": `${ctx.origin}/images/${basename}`
        }, '上传成功')

    } catch (error) {
        ctx.body = new ErrorModel(error)
        throw error
    }

}
module.exports = {
    getBlogList,
    addBlog,
    deleteBlog,
    editBlog,
    lookBlog,
    uploadImg
}