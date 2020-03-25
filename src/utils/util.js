const qs = require('querystring');

module.exports = {
  /**
   * - 获取请求的参数（get | post）
   * - 如果没有参数 则返回null
   * 
   * @param {Object} ctx koa请求上下文
   * @returns {Object} param 请求参数
   */
  getUrlParam(ctx) {
    let result = null;;
    let type = ctx.method.toUpperCase();
    if (type == "GET") {
      result = ctx.request.querystring;
      result = qs.parse(result);
    } else if (type == "POST") {
      result = ctx.request.body;
    }
    return result;
  },
  /**
   * - 获取请求的Cookie值
   * - 以数组的方式返回值
   * 
   * @param {Object} ctx koa请求上下文
   * @returns {Array} Cookie数组，如果无Cookie，那么会返回空数组
   */
  getRequestCookies(ctx) {
    let reqCookies = ctx.cookies.request.headers.cookie ? ctx.cookies.request.headers.cookie.split('; ') : [];
    return reqCookies;
  },
  /**
   * - 把cookie字符串 分解成 {name: '', key: '' }
   * 
   * @param {String} str cookie数组中的cookie对象
   * @returns {Object} cookie格式化后的对象
   */
  decodeCookieData(str) {
    let index = str.indexOf('=');
    let name = index > 0 ? str.substring(0, index) : 'null';
    let value = index > 0 && str.length > index + 1 ? str.substring(index + 1) : '';

    return {
      name: name,
      value: value,
      cookie: str
    };
  },
  /**
   * - 获取终端的ip地址
   * 
   * @param {Object} ctx koa上下文
   * @returns {String} text 文本
   */
  getRemoteIp(ctx) {
    let result = '';
    if (ctx) {
      if (ctx.headers && ctx.headers.remoteip) { // 通过Nginx路由后的地址
        result = ctx.headers.remoteip;
      } else if (ctx.ip) {
        result.ip.replace("::ffff:", ""); // 注意node.js获取的ip是ipV4转ipV6的，需要特殊处理
      }
    }
    return result;
  }
}