'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {

  it('should status 200 and get the request body', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/user/register')
      .type('form')
      .send({
        userName: 'minyangcheng',
        pwd: '123456',
        rePwd: '123456',
      })
      .expect(200)
      .expect({
        userName: 'minyangcheng',
        userId: '1003',
      });
  });
});
