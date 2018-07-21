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
    },
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

  return config;
};
