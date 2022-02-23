const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const path = require('path')
// const session = require('koa-generic-session')
// const redisStore = require('koa-redis ')
const users = require('./routes/users')
const blogs = require('./routes/blog')


// error handler
onerror(app)
// middlewares
app.use(koaBody({
  enableTypes: ["json", "form", "text"],
  multipart: true,
  strict: false,
  formidable: {
    maxFileSize: 5 * 1024 * 1024,
    uploadDir: path.join(__dirname, 'public/images'),
    // 保留文件扩展名
    keepExtensions: true,
  }
}))
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname, 'public')))


app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(blogs.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app