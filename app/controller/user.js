'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async register() {
    let reqData = this.ctx.request.body;
    if (!reqData.userName) {
      this.ctx.body = this.ctx.helper.restFail({message: '用户名不能为空'});
      return;
    }
    if (!reqData.pwd) {
      this.ctx.body = this.ctx.helper.restFail({message: '密码不能为空'});
      return;
    }
    if (!reqData.rePwd) {
      this.ctx.body = this.ctx.helper.restFail({message: '确认密码不能为空'});
      return;
    }
    if (reqData.rePwd != reqData.pwd) {
      this.ctx.body = this.ctx.helper.restFail({message: '密码确认和密码不相等'});
      return;
    }
    try {
      let result = await this.service.user.register(reqData.userName, reqData.pwd);
      this.ctx.body = result;
    } catch (error) {
      this.logger.error(error);
      this.ctx.body = this.ctx.helper.restFail({message: '注册失败'});
    }
  }

  async login() {
    let reqData = this.ctx.request.body;
    if (!reqData.userName) {
      this.ctx.body = this.ctx.helper.restFail({message: '用户名不能为空'});
      return;
    }
    if (!reqData.pwd) {
      this.ctx.body = this.ctx.helper.restFail({message: '密码不能为空'});
      return;
    }
    try {
      let result = await this.service.user.login(reqData.userName, reqData.pwd);
      this.ctx.body = result;
    } catch (error) {
      this.logger.error(error);
      this.ctx.body = this.ctx.helper.restFail({message: '登录失败'});
    }
  }

}

module.exports = UserController;
