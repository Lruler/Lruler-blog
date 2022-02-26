import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/login', controller.login.login);

  router.get('/blog/list', controller.blog.getList);
  router.post('/blog/add', controller.blog.addBlog);
  router.post('/blog/upload', controller.blog.uploadImg);
  router.get('/blog/tags', controller.tag.getBlogTag);
  router.get('/blog/search', controller.blog.searchBlog);

  router.get('/tags', controller.tag.getTags);
  router.get('/tags/getblog', controller.tag.getBlogByTag);
};
