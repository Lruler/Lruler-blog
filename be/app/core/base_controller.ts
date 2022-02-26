import { Controller } from 'egg';

export default class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data = {}, msg = 'success') {
    this.ctx.body = {
      code: 0,
      msg,
      data,
    };
  }

  error(msg = 'error') {
    this.ctx.body = {
      code: -1,
      msg,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

