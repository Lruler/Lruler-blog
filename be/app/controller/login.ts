import { PrismaClient } from '@prisma/client';
import Controller from '../core/base_controller';


const prisma = new PrismaClient();

export default class LoginController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { password } = ctx.request.body;
    const user = await prisma.user.findFirst({ where: { password } });
    if (user) {
      // 通过jwt生产token
      const token = app.jwt.sign({
        userName: password, // 需要存储的Token数据
      },
      app.config.jwt.secret, { // app.config.jwt.secret是在配置里配置的密钥'123456'
        expiresIn: 60 * 60 * 24, // expiresIn是token过期时间
      });
      // 返回token
      this.success({ token }, '登录成功');
    } else this.error('密码错误');
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
