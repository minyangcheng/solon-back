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
      orders: [['modifyTime', 'desc'], ['id', 'desc']],
      limit: data.pageSize,
      offset: data.pageSize * data.currentPage,
    });
    return this.ctx.helper.restSucc({data: result, message: '获取更新app列表成功'});
  }

  async checkAppUpdate(data) {
    const {mysql} = this.app;
    const {helper} = this.ctx;
    let result = await mysql.select('app_update', {
      where: {appKey: data.appKey},
    });
    if (result.length > 0) {
      result = result.filter(item => item.updateType != 0)
        .sort((v1, v2) => this.compareVersion(v2.version, v1.version));
      let maxResult = result[0];
      if (this.compareVersion(maxResult.version, data.version) > 0) {
        maxResult.id = undefined;
        return helper.restSucc({
          data: maxResult,
          message: '获取版本信息成功'
        });
      } else {
        return helper.restFail({message: '当前版本是最新的版本'});
      }
    } else {
      return helper.restFail({message: '没有该应用版本的信息'});
    }
  }

  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  }

}

module.exports = UpdateService;
