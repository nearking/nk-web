const NKWeb = require('../index');

let port = 23390;
let app = NKWeb.serve();

NKWeb.route(app, [{
  path: '/', // 路由地址
  type: 'get', // 请求类型，例如：post || get || put || delect || all
  controller: async (ctx, next) => { // 如果不需要同步读取数据，可以不使用 async
      NKWeb.renderText(ctx, '/// 首页 ///');
  }
}]);

app.listen(port);
console.log(`启动服务: http://loaclhost:${port}`);