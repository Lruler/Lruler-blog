import { PrismaClient } from '@prisma/client';
import Controller from '../core/base_controller';

const prisma = new PrismaClient();

export default class TagController extends Controller {
  // 标签表
  async getTags() {
    const tags = await prisma.tags.findMany();
    console.log(tags);
    this.success(tags);
  }

  // 根据文章找标签
  async getBlogTag() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const tags = await prisma.tag.findMany({ where: { articlesId: +id } });
    this.success(tags);
  }

  // 根据标签找文章
  async getBlogByTag() {
    const { ctx } = this;
    const { tag } = ctx.request.query;
    const b = await prisma.tag.findMany({ where: { tag } });
    const blogs = await Promise.all(b.map(async t => await prisma.articles.findUnique({ where: { id: t.articlesId } })));
    this.success(blogs);
  }
}
