# 项目思路

1. 定义路由，CRUD
2. mongoDB
3. mongoose

## mongoDB

1. 创建数据库
   - 创建或切换数据库: `use dbName`
   - 列出所有 db: `show dbs`
   - 列出所有 collection: `show collections`
2. 创建数据
   - 插入一条: `db.collectionName.insertOne({name: "mongo test", number: 100})`
   - 插入多条: `db.collectionName.insertMany([{},{}])`
3. 查找数据
   - `db.collectionName.find({key: value}, {key:1})`
   - 运算符: `$lt` `$lte` `$gt` `$gte`
   - or: `{ $or: [ { id: {$lt: 100}}, {number: {$gte: 10} } ] }`
4. 更新数据
   - `db.collectionName.updateOne(filterObject,{$set:updateObject})`
   - `updateMany` `replaceOne` `replaceMany`
5. 删除数据
   - `db.collectionName.deleteMany(filterObject)`
   - 删除全部 documents: `deleteMany({})`

## HTTP STATUS CODE

- 200 : OK
- 201 : CREATED
- 400 ：BAD REQUEST
- 404 : NOT FOUND
- 204 : NO CONTENT
- 500 : INTERNAL ERROR
