const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    // 处理Blog
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
    // 处理User
    const userData = handleUserRouter(req, res)
    if (userData) {
        res.end(
            JSON.stringify(userData)
        )
    }
}


module.exports = serverHandle