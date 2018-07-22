'use strict';

const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {

  async addImage() {
    const ctx = this.ctx;
    let stream;
    try {
      stream = await ctx.getFileStream();
      const name = path.basename(stream.filename);
      let filePath = path.resolve(__dirname, '../public', name);
      await this.writeFile(stream, filePath);
      this.ctx.body = ctx.helper.restSucc({data:ctx.request.host+'/public/'+name, message: '添加图片成功'})
    } catch (err) {
      this.logger.error(err);
      if (stream) {
        await sendToWormhole(stream);
      }
      this.ctx.body = this.ctx.helper.restFail({message: '添加图片失败'});
    }
  }

  async deleteImage(){
    const reqData = this.ctx.request.body;
    const helper = this.ctx.helper;
    try {
      reqData.id = Number(reqData.pageSize);
      this.ctx.validate({
        id: {type: 'int'},
      }, reqData);
      this.ctx.body = await this.service.image.deleteImage(reqData);
    } catch (error) {
      this.logger.error(error);
      this.ctx.body = helper.restFail({message: 'deleteImage接口调用失败'});
    }
  }

  async getImageList(){
      const reqData = this.ctx.request.body;
      const helper = this.ctx.helper;
      try {
        reqData.pageSize = Number(reqData.pageSize);
        reqData.currentPage = Number(reqData.currentPage);
        this.ctx.validate({
          pageSize: {type: 'int'},
          currentPage: {type: 'int'}
        }, reqData);
        this.ctx.body = await this.service.image.getImageList(reqData);
      } catch (error) {
        this.logger.error(error);
        this.ctx.body = helper.restFail({message: 'getImageList接口调用失败'});
      }
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

module.exports = HomeController;
