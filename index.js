const server = require('./src/server/server');
const router = require('./src/router/router');
const renderUtil = require('./src/utils/render-util');
const util = require('./src/utils/util');

module.exports = {
  // 服务相关
  ...server,
  // 路由相关
  ...router,
  // 工具方法相关
  ...renderUtil,
  ...util
}