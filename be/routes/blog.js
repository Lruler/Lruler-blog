const {
    getBlogList,
    addBlog,
    deleteBlog,
    editBlog,
    lookBlog
} = require('../controller/blog')
const router = require('koa-router')()

router.prefix('/blog')

// 获得所有文章
router.get('/list', getBlogList)
// 新增文章
router.post('/add', addBlog)
// 删除文章
router.delete('/delete', deleteBlog)
// 查看文章
router.get('/get', lookBlog)
// 修改文章
router.post('/edit', editBlog)

module.exports = router