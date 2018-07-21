'use strict';

// const { app, assert } = require('egg-mock/bootstrap');
//
// describe('test/app/controller/home.test.js', () => {
//
//   it('should assert', async()=> {
//     const ctx = app.mockContext({
//       user: {
//         name: 'fengmk2',
//       },
//     });
//     assert(ctx.user);
//     assert(ctx.user.name === 'fengmk2');
//   });
//
//   it('should GET /', () => {
//     app.httpRequest()
//       .get('/')
//       .expect('hi, egg')
//       .expect(200);
//   });
//
//   it('should status 200 and get the request body', async () => {
//     // 模拟 CSRF token，下文会详细说明
//     app.mockCsrf();
//     await app.httpRequest()
//       .post('/post')
//       .type('form')
//       .send({
//         foo: 'bar',
//       })
//       .expect(200)
//       .expect({
//         foo: 'bar',
//       });
//   });
// });
