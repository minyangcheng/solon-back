module.exports = {

  restSucc({data = {}, code = 10000, message = '接口请求成功'} = {}) {
    return {data, code, message}
  },

  restFail({message = '接口请求失败', code = 10001}) {
    return {code, message}
  }

};
