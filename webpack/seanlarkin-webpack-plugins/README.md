# Webpack Plugins

## slides

https://docs.google.com/presentation/d/1P5f-cK4jlhGQIfPQ_vaYFRWV464kBb5UaUBkfRjBp4Y/edit#slide=id.g376e8d6b61_0_4

## Tapable

~200 line plugin library

## 7-ish Tapable Instances

1. Compiler：webpack 最上层的 hook，类似生命周期
2. Compilation：生成 dependency graph，webpack 最核心最复杂的部分
3. Resolver：查找 module 路径信息，webpack 内置的 enhanced-resolver 比 node 内置的更好用
4. Module Factories：接收 resolver 的信息，处理源码生成 module instance，NormalModuleInstance、ContextModuleInstance（路径带参数的）
5. Parser：将源码从 string 解析成 AST
6. Template：数据绑定，生成 bundle 中的代码
   - (IFEE:Main Template )(Chunk Template:[Module Template(Dep Template)])
   - (IFEE)(chunks:[module(dep,dep...),module...])

## webpack 工作原理总结

1. build the dependency graph：接收 config，从 entry 开始进行上面的步骤，根据 entry 的依赖，进行 breath-first search graph traversal
2. optimize the graph by plugins
3. render the graph by templates
