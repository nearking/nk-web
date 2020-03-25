const Router = require('koa-router');


/**
 * 路由构建
 * 
 * @param {Object} router 路由对象
 * @param {String} type 路由类型
 * @param {String} path 路由路径
 * @param {Function} controller 处理逻辑，方法格式为 (ctx. next) => {}。自带koa的两个对象，ctx、next。
 */
var _router = (router, type, path, controller) => {
  // 转小写
  type = type ? type.toLowerCase() : '';
  switch (type) {
    // 普通页面方法使用的模式
    case 'get':
      router.get(
        path,
        controller
      );
      break;
    // 普通接口模式 - BPM的仅能使用post
    case 'post':
      router.post(
        path,
        controller
      );
      break;
    case 'pust':
      router.pust(
        path,
        controller
      );
      break;
    case 'patch':
      router.patch(
        path,
        controller
      );
      break;
    case 'del':
      router.del(
        path,
        controller
      );
      break;
    case 'all':
      router.all(
        path,
        controller
      );
      break;
    default: // 默认为页面的路由
      router.get(
        path,
        controller
      );
  }
}

/**
 * 构建路由
 * 
 * ### Controller 的写法
 * 
 * ```
 * let controllers = [{
 *  path: '/page/index', // 路由地址
 *  type: 'get', // 请求类型，例如：post || get || put || delect || all
 *  controller: async (ctx, next) => { // 如果不需要同步读取数据，可以不使用 async
 *      let param = webUtil.getUrlParam(ctx); // 获取请求参数
 * 
 *      let pagePath = '/page/index.html';
 *      webUtil.renderHtml(ctx, pagePath); // 渲染页面
 *  }
 * }]
 * ```
 * 
 * @param {*} app 
 * @param {*} controllers 
 */
const route = (app, controllers) => {
  let router = new Router();

  // 初始化路由
  (controllers || []).forEach(item => {
    _router(router, item.type, item.path, item.controller);
  });

  app.use(router.routes()).use(router.allowedMethods());
};

module.exports = {
  route
}