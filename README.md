# nk-web
normal web kit | 简易构建网页服务工具

封装了 koa 的部分插件，简化了路由的配置逻辑，从而可以快速的启动一个 web 服务。

### 启动一个 web 服务

```javascript
const NKWeb = require('nk-web');

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
```
