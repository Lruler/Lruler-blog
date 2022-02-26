import { PrismaClient } from '@prisma/client';
import Controller from '../core/base_controller';


const prisma = new PrismaClient();

export default class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await prisma.user.findFirst({ where: { username } });
    if (user && password === user?.password) this.success({}, '登录成功');
    else if (user && password !== user?.password) this.error('密码错误！');
    else this.error('用户不存在！');
  }
}


/* // app/controller/post.js
exports.create = async (ctx) => {
  const createRule = {
    title: { type: 'string' },
    content: { type: 'string' },
  };
  // 校验参数
  ctx.validate(createRule);
  // 组装参数
  const author = ctx.session.userId;
  const req = Object.assign(ctx.request.body, { author });
  // 调用 service 进行业务处理
  const res = await ctx.service.post.create(req);
  // 设置响应内容和响应状态码
  ctx.body = { id: res.id };
  ctx.status = 201;
}; */
