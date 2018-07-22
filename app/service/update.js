const Service = require('egg').Service;

class UpdateService extends Service {

  constructor(ctx) {
    super(ctx);
  }

  async applyVersion(data) {
    const mysql = this.app.mysql;
    const versionList = await mysql.select('app_update', {
      where: {
        appKey: data.appKey,
        version: data.version
      }
    });
    if (versionList.length > 0) {
      return this.ctx.helper.restFail({message: '该app版本号已存在，请勿重复添加'});
      return;
    }
    let result;
    let message;
    if (data.id > 0) {
      result = await mysql.update('app_update', data, {
        where: {id: data.id}
      });
      message = '修改成功';
    } else {
      result = await mysql.insert('app_update', data);
      message = '提交成功';
    }
    if (result.affectedRows == 1) {
      return this.ctx.helper.restSucc({data: result.insertId, message});
    } else {
      return this.ctx.helper.restFail({message: '提交失敗'});
    }
  }

  async getUpdateAppList(data) {
    const mysql = this.app.mysql;
    let where = {};
    if (data.appKey) {
      where.appKey = data.appKey;
    }
    const result = await mysql.select('app_update', {
      where,
      orders: [['modifyTime', 'desc'],['id','desc']],
      limit: data.pageSize * 1,
      offset: data.pageSize * data.currentPage,
    });
    return this.ctx.helper.restSucc({data: result, message: '获取更新app列表成功'});
  }

}

module.exports = UpdateService;
