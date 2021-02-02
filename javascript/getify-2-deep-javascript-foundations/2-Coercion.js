// Abstract Operations，抽象操作，可以总结为：toPrimitive（toString、toNumber、toBoolean）
// 暗示一些场景将对象、方法、数组转成原始类型，底层逻辑：
// hint为number时递归调用 valueOf()、toString()
// hint为string时递归调用 toString()、valueOf()
// toString 不是指具体的toString()方法，而是暗示在进行字符串操作
// toNumber 不是指具体的toNumber()方法，而是暗示在进行数字操作
// toBoolean 不是指具体的toBoolean()方法，而是暗示在进行true、false判断
// falsy:""、0、-0、0n、NaN、null、undefined、false
// trulsy:剩下的所有的

// 举例
function addOne(num) {
  return num + 1;
}
addOne("16"); // 161
addOne(+"16"); // 17
// 推荐使用
addOne(Number("16"));

////////////////////////////
// 判断true false

// 空字符串
if (str) {
}
// better, more semantic
if (!!str) {
}
if (Bealoon(str)) {
}

// 数组是否为空
if (arr.length) {
}
// better, more semantic
if (arr.length > 0) {
}

/////////////////////////
// Boxing，原始类型是没有.length这些属性和方法的，js会进行boxing强转成object
"12345".length;

// corner case
String(-0); // "0"
String(null); // "null"
String(undefined); // "undefined"
String([null]); // ""
String([undefined]); // ""

Number(""); // 0
Number("   \t\n"); // 0 会先移除所有的空格再进行强转
Number(null); // 0
Number(undefined); // NaN
Number([]); // 0
Number([1, 2, 3]); // NaN
Number([null]); // 0
Number([undefined]); // 0
Number({}); // NaN

Boolean(new Boolean(false)); // true 因为new构造的是对象，对象是trulsy，所以，不要用new String Number Boolean

// 符合直觉，但会造成bug
Number(true); // 1
Number(false); // 0

1 < 2 < 3; // true 但是个意外 true<3 -> 1<3
3 > 2 > 1; //false true>1 -> 1>1

// 比较数字和字符串
var v1 = 16;
var v2 = "17";

if (Number(v1) < Number(v2)) {
}
// 如果v1确定是数字，可以不需要Number()
if (v1 < v2) {
}
