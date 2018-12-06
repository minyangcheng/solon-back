'use strict';

module.exports = appInfo => {

  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531905338632_5597';

  // add your config here
  config.middleware = [];

  //设置请求体转化
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  config.security = {
    csrf: {
      enable: false,
    }
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123',
      database: 'cg',
    },
    app: true,
    agent: true,
  };

  config.multipart = {
    fileExtensions: ['.apk', '.ipa'], // 增加对 .apk 扩展名的支持
    fileSize: '80mb',
  };

  return config;
};
