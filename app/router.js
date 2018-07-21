'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);

  router.post('/update/uploadApp', controller.update.uploadApp);
  router.post('/update/getUpdateAppList', controller.update.getUpdateAppList);
  router.post('/update/checkAppUpdate', controller.update.getUpdateAppList);

};
