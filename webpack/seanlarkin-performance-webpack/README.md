# Web performance with Webpack

## Top Performance Issues

1. 初始化加载的 JavaScript 数量
2. 初始化加载的 CSS 数量
3. 初始化加载的网络请求数量

## Goals

1. <=200KB(uncompressed) initial javascript
2. <=100KB(uncompressed) initial CSS
3. HTTP: <=6 initial network calls
4. HTTP2: <=20 initial network calls
5. 90% code coverage (only 10% code unused)
   - 案例分析：https://www.mutualofomaha.com/

## [Code Splitting](https://webpack.js.org/guides/code-splitting/)

1. 概念：Progess of splitting pieces of your code into async chunks at build time.
2. 分类：static、dynamic
3. 不支持 named exports
4. 利用缓存去重，从 [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) 到 [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

### static

1. 不需要在首屏使用的重型第三方库
2. 临时的，例如 modal、tooltip、dialog
3. routes

### dynamic
