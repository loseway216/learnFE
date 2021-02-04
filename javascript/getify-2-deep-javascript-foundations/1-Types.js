// ***********************************
// 原始类型
var v = undefined;
typeof v; // 'undefined'

v = "1";
typeof v; // 'string'

v = 2;
typeof v; // 'number'

v = false;
typeof v; // 'boolean'

v = {};
typeof v; // 'object'

v = Symbol();
typeof v; // 'symbol'

v = null;
typeof v; // 'object' null是原始类型，但是typeof null却是object

// ***********************************
// 非原始类型
v = function () {};
typeof v; // 'function'

v = [1, 2, 3];
typeof v; // 'object'

// coming soon
v = 42n; // or BigInt(42)
typeof v; // 'bigint'

// ***********************************
// NaN
var myAge = Number("0o34"); // 28
var myNextAge = Number("29"); // 29
var myDogsAge = Number(n / a); //NaN

myDogsAge === myDogsAge; // false NaN是js中唯一不等于自己的值

// 所以js创造了isNaN这个方法
isNaN(myAge); // false
isNaN(myDogsAge); //true
isNaN("my son's age"); // true 字符串其实并不是NaN，isNaN先把字符串转成了数字，然后进行判断

// ES6添加的方法，不再进行类型强转
Number.isNaN(myDogsAge); // true
Number.isNaN("my son's age"); // false 字符串不是数字

// ***********************************
// negative zero
var trendRate = -0;
trendRate === -0; // true

trendRate.toString(); // "0"  而不是"-0"
trendRate === 0; // true
trendRate < 0; // false
trendRate > 0; // false

// ES6添加的方法，含以上相当于四个等号， ====
Object.is(trendRate, -0); // true
Object.is(trendRate, 0); // false

// 判断数字的正负，0、1、-1
Math.sign(-2); // -1
Math.sign(2); // 1
Math.sign(0); // 0
Math.sign(-0); // -0  很奇怪，并不是1或者-1

// "fix" Math.sign()
function sign(v) {
  // v等于0意味着v是0或者-0
  return v !== 0 ? Math.sign(v) : Object.is(v, -0) ? -1 : 1;
}

sign(-2); // -1
sign(2); // 1
sign(0); // 1
sign(-0); // -1

// ***********************************
// fundamental objects：类似基本类型，使用new关键词构造的对象
// use new: Object()、Array()、Function()、Date()、RegExp()、Error()
// dont use new: String()、Number()、Boolean()
