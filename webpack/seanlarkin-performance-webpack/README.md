# Web performance with Webpack

## slides

https://docs.google.com/presentation/d/1FW3GT9Ww1S6SEGu8HAO5eRZUFggfVuFE2ievNCDWVDo/edit#slide=id.g376e8d6b61_0_4

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

### Static Code Splitting 场景

1. 不需要在首屏使用的重型第三方库
2. 临时的，例如 modal、tooltip、dialog
3. routes

### Dynamic Code Splitting（module 路径有变量、ContextModule）场景：

1. A/B testing
2. theme
3. locale

## Magic Comments

1. webpackModes
2. Prefetch、Preload

## Tips

1. 保持 webpack.config.js 在根目录
2. 如果编写 library 不要使用 webpack，甚至不需要使用 babel，保持 ESM
