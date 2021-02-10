// ****************************
// Template Strings

// 可以对模板字符串进行处理，tagged template 用途：格式化、国际化，有很多第三方库
function upper(strings, ...values) {
  let strs = "";
  for (let i = 0; i < strings.length; i++) {
    strs += strings[i];
    if (i > 0) {
      strs += String(values[i - 1]).toUpperCase();
    }
  }
  return strs;
}

var teacher = "Kyle",
  twitter = "getify",
  topic = "JS Recent Parts";

console.log(upper`Hello ${teacher} (@${twitter}), welcome to ${topic}!`);

// ********************************
// String padding ES2017
var str = "Hello";

console.log(str.padStart(5));
console.log(str.padStart(8));
console.log(str.padStart(8, "*"));
console.log(str.padStart(8, "12345"));
console.log(str.padStart(8, "ab"));

console.log(str.padEnd(8, "12345"));

// String trimming ES2019
var str = "    some stuff \t\t";

// 很早就有
console.log(str.trim());

console.log(str.trimStart());

console.log(str.trimEnd());
