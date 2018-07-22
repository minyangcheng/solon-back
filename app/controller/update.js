'use strict';

const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
var PkgReader = require('isomorphic-apk-reader');
const fs = require('fs');
const path = require('path');

class UpdateController extends Controller {

  async uploadApp() {
    const ctx = this.ctx;
    let stream;
    try {
      stream = await ctx.getFileStream();
      const name = path.basename(stream.filename);
      if (!name.endsWith('.apk') && !name.endsWith('.ipa')) {
        await sendToWormhole(stream);
        this.ctx.body = this.ctx.helper.restFail({message: '请选择apk或ipa包'});
        return;
      }

      let filePath = path.resolve(__dirname, '../public', name);
      await this.writeFile(stream, filePath);
      let data = await this.parseAppFileInfo(filePath);
      this.ctx.body = this.ctx.helper.restSucc({data, message: '解析包成功'})
    } catch (err) {
      this.logger.error(err);
      if (stream) {
        await sendToWormhole(stream);
      }
      this.ctx.body = this.ctx.helper.restFail({message: '解析包失败'});
    }
  }

  async applyVersion() {
    const reqData = this.ctx.request.body;
    const helper = this.ctx.helper;
    try {
      this.ctx.validate({
        appKey: {type: 'string'},
        appType: {type: 'string'},
        updateType: {type: 'string'},
        packageUrl: {type: 'string'},
        version: {type: 'string'},
      }, this.ctx.request.body);

      this.ctx.body = await this.service.update.applyVersion(reqData);
    } catch (error) {
      this.logger.error(error);
      this.ctx.body = helper.restFail({message: 'applyVersion接口调用失败'});
    }
  }

  async getUpdateAppList() {
    const reqData = this.ctx.request.body;
    const helper = this.ctx.helper;
    try {
      reqData.pageSize = Number(reqData.pageSize);
      reqData.currentPage = Number(reqData.currentPage);
      this.ctx.validate({
        pageSize: {type: 'int'},
        currentPage: {type: 'int'}
      }, reqData);
      this.ctx.body = await this.service.update.getUpdateAppList(reqData);
    } catch (error) {
      this.logger.error(error);
      this.ctx.body = helper.restFail({message: 'getUpdateAppList接口调用失败'});
    }
  }

  async checkAppUpdate() {
    let reqData = this.ctx.request.body;
    let helper = this.ctx.helper;
    try{
      this.ctx.validate({
        appKey: {type: 'string'},
        version: {type: 'string'},
      }, reqData);
      this.ctx.body = await this.service.update.checkAppUpdate(reqData);
    }catch (error){
      this.logger.error(error);
      this.ctx.body = helper.restFail({message:'checkAppUpdate请求出错'})
    }
  }

  async parseAppFileInfo(filePath) {
    var extension = filePath.substring(filePath.lastIndexOf('.'));
    var appType = filePath.endsWith('.apk') ? 'android' : 'ios';
    return new Promise(((resolve, reject) => {
      var reader = new PkgReader(filePath, extension, {searchResource: true});
      reader.parse((err, pkgInfo) => {
        if (err) {
          reject(err);
        } else {
          this.logger.debug(pkgInfo);
          resolve({
            name: (pkgInfo.application.label && (pkgInfo.application.label)[0]) || '未知应用名称',
            appType: appType,
            version: pkgInfo.versionName,
            appKey: pkgInfo.package,
          })
        }
      });
    }));
  }

  async writeFile(readStream, filePath) {
    return new Promise(((resolve, reject) => {
      let writerStream = fs.createWriteStream(filePath);
      readStream.pipe(writerStream);
      writerStream.on('error', (error) => {
        reject(error)
      });
      writerStream.on('finish', () => {
        resolve();
      });
    }));
  }

}

module.exports = UpdateController;
