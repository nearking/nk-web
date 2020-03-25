const fs = require('fs');
const path = require('path');

// 缓存已经读取页面
let GHtmlCacheMap = {};

module.exports = {
  /**
   * - 返回JSON字符串
   * 
   * @param {Object} ctx koa上下文
   * @param {Object} data JSON数据
   */
  renderJSON(ctx, data) {
    ctx.response.type = 'json';
    ctx.response.body = data;
  },
  /**
    * # code2doc
    * ### renderHtml
    * 
    * - 不通过模版引擎，直接渲染html页面
    * 
    * @param {Object} ctx koa上下文
    * @param {Object} param 配置项
    * @param {String} param.pagePath 页面路径，以根目录为起点，路径计算方法为path.resolve(pagePath)，请不要以斜杠开头
    * @param {Boolen} param.isRealPath  非必须，pagePath是否为真实路径，如果设置该参数，那么不会默认调用path.resolve进行路径格式化
    * @param {Boolen} param.cache 启用缓存，默认下，会对读取的文件进行数据缓存
    */
  renderHTML(ctx, param) {
    var html = '';
    param = param || {};
    param.cache === null ? true : false; // 默认启用
    let pagePath = param.pagePath;
    
    if (param.cache && GHtmlCacheMap[pagePath]) {
      html = GHtmlCacheMap[pagePath];
    } else {
      html = fs.readFileSync(param.isRealPath ? pagePath : path.resolve(pagePath));
      GHtmlCacheMap[pagePath] = html;
    }

    ctx.response.type = 'html';
    ctx.response.body = html;
  },
  /**
    * - 渲染纯文本
    * 
    * @param {Object} ctx koa上下文
    * @param {String} text 文本
    */
  renderText(ctx, text) {
    ctx.response.type = "text/plain";
    ctx.response.body = text;
  }
}