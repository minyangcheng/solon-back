'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.post('/user/getUserInfo', controller.user.getUserInfo);

  router.post('/update/uploadApp', controller.update.uploadApp);
  router.post('/update/applyVersion', controller.update.applyVersion);
  router.post('/update/getUpdateAppList', controller.update.getUpdateAppList);
  router.post('/update/checkAppUpdate', controller.update.checkAppUpdate);

  router.post('/image/addImage', controller.image.addImage);
  router.post('/image/deleteImage', controller.image.deleteImage);
  router.post('/image/getImageList', controller.image.getImageList);

};
