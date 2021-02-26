# Webpack Fundamentals

## github

https://github.com/thelarkinn/webpack-workshop-2018

## slides

https://docs.google.com/presentation/d/1hFtMCMo62DgOIc-9OwgaVwPZHwv1cgMELArHcMbXlSI/edit#slide=id.g15e96ef847_0_0

## web 开发的问题

1. html 中引用多个 srcipt：加载慢
2. 一个 script 中写上一万行代码：作用域问题
3. 用 IFFE，多个文件，然后 concatenate，无法按需加载
4. CommonJS、AMD，浏览器用不了
5. ESM，在浏览器中 slow

## tasks

1. 编写 package.json 里面的 scripts，熟悉 node 的 debug 方法
2. ESM 、commonJS 测试，观察 webpack 输出的 dependency graph，tree shaking
3. mode 设为 none 输出的 main.js 是没有优化过的，大致梳理里面的逻辑：IFEE 结构，0、1、2、3 标记的模块文件，webpackrequire 方法
4. webpack.config.js 是 webpack 内部 require 的文件，四大概念：

   - entry，入口文件，形成 dependency graph
   - output
   - loaders & rules，链式调用，从右到左生效
   - plugins

5. webpackMerge：区分通用配置、开发环境、生产环境，
6. --hot 命令，hot module replacement，：不需要 reload 浏览器，热更新 css 等资源，但是 js 会让浏览器 reload
7. css 的加载，开发环境用 style-loader，生产环境用 MiniCssExtractPlugin
8. url-loader：加载图片
9. file-loader：

## 拓展

1. 多页应用，index.html 和 js 引用的问题，https://github.com/zorigitano/multipage-webpack-plugin
