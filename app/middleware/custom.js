module.exports = options => {
  return async (ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');
    ctx.response.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH');
    await next();
    console.log('-----------------')

  };
};
