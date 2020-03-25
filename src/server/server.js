const Koa = require('koa');
const koaBody = require('koa-body');
const koaHelmet = require('koa-helmet');
const koaCors = require('@koa/cors');

/**
 * 启动 web 服务并且返回 koa2 对象
 * 
 * @param {Object} cfg 
 * @param {Object | Boolean} cfg.helmet 默认启动 helmet，如果不启用可以设置为 false，如果要设置指定配置，可以设置一个对象
 * @param {String | Array} cfg.static 设置静态资源文件，支持字符串或者数组
 * @param {Object} cfg.cors 跨域设置，非必须，默认不允许跨域请求。<br>如果需要设置所有请求都可以跨域，请设置为"\*"。<br>如果设置指定域名，请输入指定域名，多个域名时，可以输入数组。 
 * @param {Number} cfg.port 服务端口，非必须。如果没有设置，那么可以通过**app.listen()**主动监听
 */
const serve = (cfg) => {
  let app = new Koa();
  cfg = cfg || {};

  // 对post的参数进行处理
  app.use(koaBody());
  // 启动安全策略
  if (cfg.helmet !== false) {
    app.use(koaHelmet(cfg.helmet));
  }
  // 设置资源目录
  if (cfg.static) {
    let res = typeof cfg.static == 'string' ? [cfg.static] : cfg.static;
    if (res && res.length > 0) {
        res.forEach(item => {
            app.use(koaStatic(item));
        })
    }
  }
  // 设置跨域
  if (cfg.cors) {
    let cors = cfg.cors;
    if (typeof cors === 'string') {
        app.use(koaCors({
            origin: cors
        }))
    } else if (Object.prototype.toString.call(cors) == "[object Array]") {
        let corsMap = {};
        cors.forEach(item => {
            corsMap[item] = true;
        })

        app.use(koaCors({
            origin: (ctx) => {
                if (corsMap[ctx.request.headers.origin]) { // 判断当前请求的域名，是否允许跨域请求
                    return ctx.request.headers.origin;
                } else {
                    return '';
                }
            }
        }))
    }
  }
  // 启动监听
  if (cfg.port) {
      app.listen(cfg.port);
  }
  return app;
}

module.exports = {
  serve
}