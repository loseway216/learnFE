# Organizing javascript functionality

## TASK

1. index.html 引用了 header、details、carousel 三个 js 文件，面条代码
2. 用 IFFE 包裹，module pattern 暴露 publicAPI
3. 重构 carousel 和 details，将 details 中操作了 carousel 子元素的 dom 操作移到 carousel
4. 新建 app.js，做初始化工作
5. 解决 carousel 和 details 中 function 互相引用的问题，创建一个中间层，分发-订阅，更灵活、容易测试

## 一个简单的服务端应用，基于 node，不依赖任何框架

1. 服务端渲染，模板引擎
2. routes 的实现模拟了 express 或 koa（generator）
3. 前后端代码共享，module
4. UMD module
