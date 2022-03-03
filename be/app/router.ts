import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  console.log(middleware);
  const jwt = middleware.jwtV(app.config.jwt);

  // 登陆
  router.post('/login', controller.login.login);

  // 游客权限 博客列表 单篇博客 根据Tag查询 搜索
  router.get('/blog/list', controller.blog.getList);
  router.get('/blog/get', controller.blog.lookBlog);
  router.get('/blog/tags', controller.tag.getBlogTag);
  router.get('/blog/search', controller.blog.searchBlog);
  router.get('/tags', controller.tag.getTags);
  router.get('/tags/getblog', controller.tag.getBlogByTag);

  // 主人权限 CRUD
  router.post('/blog/add', jwt, controller.blog.addBlog);
  router.post('/blog/upload', controller.blog.uploadImg);
  router.delete('/blog/delete', controller.blog.deleteBlog);
  router.post('/blog/update', controller.blog.updateBlog);
};
