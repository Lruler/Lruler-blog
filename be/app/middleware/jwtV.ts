export default options => {
  return async function jwtV(ctx, next) {
    const token = ctx.request.header.token;
    if (token) {
      try {
        console.log(token);
        ctx.app.jwt.verify(token, options.secret); // 验证token
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          massage: 'token已过期，请重新登录',
          code: -1,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'token不存在',
      };
      return;
    }
  };
};
