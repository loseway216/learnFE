// https://262.ecma-international.org/9.0/#sec-strict-equality-comparison
// 如果双等号的Type一样，会执行三等号进行判断

//////////////////////////////////
// double equal logic
// same types: ===
// null or undefined: equal
// non-primitive: ToPrimitive
// Prefer: ToNumer
42 == [42]; // true [42] toPrimitive ->  "42" toNumber ->  42 -> 42===42 -> true

/////////////////////////////////////
// Avoid:
// 1. == with 0 "" "    "
// 2. == with non-primitives
// 3. == with true false

////////////////////////////
// corner case
[] == []; // false
[] == ![]; // true

var arr1 = [];
var arr2 = [];

arr1 == !arr2; // true
// [] == false
// "" == false
// 0 == false
// 0 === 0
// true

arr1 != arr2; // true
// !(arr1 == arr2)
// !(false)
// true

// Boolean corner case
var arr = [];

// if(Boolean(arr))
if (arr) {
}

arr == true; // false
// "" == true
// 0 == true
// 0 === 1

arr == false; // true
// "" == false
// 0 === 0

///////////////////////////////////////////////
// better practice
// 判断是否为空，一个是null，一个是undefined
var workshop1 = { topic: null };
var workshop2 = {};

if (
  (workshop1.topic === null || workshop1.topic === undefined) &&
  (workshop2.topic === null || workshop2.topic === undefined)
) {
}
// better practice，双等号下，null和undefined会互相强转，用null来表达空值的含义
if (workshop1.topic == null && workshop2.topic == null) {
}

// 前提：一个是数字，一个是字符串，双等号倾向于进行数字比较，所以不需要使用三等号
var v1 = 16;
var v2 = obj.value; // "16"

if (Number(v1) === Number(v2)) {
}
// better practice
if (v1 == v2) {
}
