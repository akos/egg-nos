'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.nos.uploadFile(__dirname + '/home.js');
    console.log(result);
    this.ctx.body = '上传成功';
  }
}

module.exports = HomeController;
