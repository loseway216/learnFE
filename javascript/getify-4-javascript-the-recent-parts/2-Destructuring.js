// ************************************
// Array
var [first, second, third] = [1, 2, 3] || []

// null !== undefined
var [first, second, third] = [1, null, 3]

// spread operator
var [first, second, third, ...others] = [1, 2, 3, 4, 5]

// tmp仍然遵循赋值的规则
var tmp, first
tmp = [first] = [1, 2, 3]
console.log(tmp)

// comma separation
var [first, , third] = [1, 2, 3]
var [first, second, third, , , ...others] = [1, 2, 3, 4, 5]

// 代替tmp交换值的操作
var x = 10,
  y = 20
;[y, x] = [x, y]

// parameter arrays
function getData([first, second, third] = []) {}

// nested
var [first, [second, third] = [], fourth] = [1, [2, 3], 4]

// *************************************
// Object Destructuring
var { a: first, b: second, c: third = 100 } = { a: 1, b: 2, c: 3 }

var { a: first, b: second, ...others } = { a: 1, b: 2, c: 3 }

// {}被重载为block，要改成下面两种写法
var tmp
var first, second
;({ b: second, a: first } = { a: 1, b: 2, c: 3 })

tmp = { b: second, a: first } = { a: 1, b: 2, c: 3 }

// nested
var { a, b: { c, d } = {} } = { a: 1, b: { c: 3, d: 4 } }

// parameter objects
function getData({ a, b } = {}) {}

// nested object and array
// b属性可以使用多次
var { a, b, b: [W, Y] = [], c } = { a: 1, b: [10, 100], c: 3 }

// **********************************
// named arguments，超过3个参数的时候可以考虑使用
function lookupRecord(store = 'person-records', id = -1) {}

// 将参数从多个改成object，利用destructuring
function lookupRecord({ store = 'person-records', id = -1 }) {}

// 无需记住参数的个数和顺序
lookupRecord({ id: 42 })

// 设置默认参数，替代写法
// _.extends({}, defaultSettings, settings)
// Object.assign({}, defaultSettings, settings)
function ajaxOptions({
  url = 'url',
  method = 'post',
  data,
  callback,
  headers: [headers0 = 'Content-Type: text/plain', ...otherHeaders] = []
} = {}) {
  return { url, method, data, callback, headers: [headers0, ...otherHeaders] }
}

var defaults = ajaxOptions()

var settings = { url: '', callback }

ajax(ajaxOptions(settings))


// **************************************
// default value
var o1 = { a: { c: 3 } };
var o2 = { a: {} };
var o3 = {};

// 除非a是undefined，否则这样默认值不会触发
// 对象和数组的默认值，永远只需要是空的，以防type errors
var {a:{b,c}={b=10,c=20}} = o1// o2 o3