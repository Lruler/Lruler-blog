import { PrismaClient } from '@prisma/client';
import Controller from '../core/base_controller';
import path from 'path';
import fs from 'fs';
import sendToWormhole from 'stream-wormhole';
import awaitWriteStream from 'await-stream-ready';

const prisma = new PrismaClient();

export default class BlogController extends Controller {
  async getList() {
    const { ctx } = this;
    const { page } = ctx.request.query;
    const take = 10;
    const skip = +page * 10;
    const list = await prisma.articles.findMany({
      take,
      skip,
      select: {
        title: true,
        intro: true,
        id: true,
        createdAt: true,
        tags: true,
      },
    });
    this.success({ rows: list });
  }

  async addBlog() {
    const { ctx } = this;
    const blog = ctx.request.body;
    const blogTags = (blog.tags as string)
      .split(',')
      .map(tag => ({ tag: tag.trim() }));
    await Promise.all(
      blogTags.map(async t => {
        const o = await prisma.tags.findFirst({ where: { tag: t.tag } });
        if (o) {
          await prisma.tags.update({
            where: { tag: o.tag },
            data: { count: ++o.count },
          });
        } else await prisma.tags.create({ data: { tag: t.tag, count: 1 } });
      }),
    );
    await prisma.articles.create({
      data: {
        content: blog.content,
        title: blog.title,
        intro: blog.intro,
        tags: {
          create: blogTags,
        },
      },
    });
    this.success();
  }

  async deleteBlog() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    await prisma.articles.delete({ where: { id: +id } });
    this.success();
  }

  async lookBlog() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const blog = await prisma.articles.findFirst({ where: { id: +id }, include: { tags: true } });
    if (blog?.content && blog.intro) {
      this.success({ ...blog, content: `${blog.intro}\n***\n${blog.content}` });
    } else this.success({ ...blog });
  }

  async updateBlog() {
    const { ctx } = this;
    const { id, content } = ctx.request.body;
    await prisma.articles.update({ where: { id }, data: { content } });
    this.success();
  }

  async uploadImg() {
    const { ctx } = this;
    const stream = await ctx.getFileStream(); // 获取文件流
    const filename =
      Math.random().toString(36).slice(2) +
      new Date().getTime() +
      path.extname(stream.filename).toLocaleLowerCase();
    const target = path.join(
      this.config.baseDir,
      this.config.uploadDir,
      filename,
    );
    ctx.body = { target };
    const writeStream = fs.createWriteStream(target);
    let url = '';
    try {
      // 异步把文件流 写入
      await awaitWriteStream.write(stream.pipe(writeStream));
      url = `${ctx.origin}/public/upload/${filename}`;
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      ctx.status = 500;
      ctx.body = {
        msg: '未知错误!',
      };
      throw err;
    }
    this.success({ url }, '上传成功');
  }

  async searchBlog() {
    const { ctx } = this;
    const { key, page } = ctx.request.query;
    const take = 10;
    let blogs = await prisma.articles.findMany({
      where: {
        OR: [
          { title: { contains: key } },
          { content: { contains: key } },
          { intro: { contains: key } },
        ],
      },
      include: { tags: true },
    });
    const blogIds = blogs.map(b => b.id);
    const tags = await prisma.tag.findMany({
      where: { tag: { contains: key } },
      select: { articlesId: true },
    });
    for (const v in tags) {
      if (blogIds.includes(tags[v].articlesId)) continue;
      else {
        const blog = await prisma.articles.findFirst({
          where: { id: tags[v].articlesId },
          include: {
            tags: true,
          },
        });
        blogs = blog ? [ ...blogs, blog ] : blogs;
      }
    }
    blogs = blogs.filter((_, i) => (+page * take) <= i && i < (+page + 1) * take);
    this.success({ rows: blogs });
  }
}
