const Service = require('egg').Service;

class UserService extends Service {

  constructor(ctx) {
    super(ctx);
  }

  async register(userName, pwd) {
    const mysql = this.app.mysql;
    const user = await mysql.query('select * from user where userName=?', userName);
    if (user.length > 0) {
      return this.ctx.helper.restFail({message: '该用户名已被注册'});
    } else {
      let result = await mysql.query('insert into user (userName,pwd) values (?,?)', [userName, pwd]);
      return this.ctx.helper.restSucc({data: result.insertId, message: '注册成功'});
    }
  }

  async login(userName, pwd){
    const mysql = this.app.mysql;
    const user = await mysql.query('select * from user where userName=? and pwd=?', [userName,pwd]);
    if (user.length > 0) {
      return this.ctx.helper.restSucc({data: user[0].id,message:'登录成功'});
    } else {
      return this.ctx.helper.restFail({message: '用户名或密码错误'});
    }
  }

}

module.exports = UserService;
