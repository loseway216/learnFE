/////////////////////////////////////////
// optional chaining

// ?. 符号前面是nullish时，返回undefined而不是报错
// obj?.prop
// obj?.[expr]
// arr?.[index]
// func?.(args)

// obj上first属性可能为nullish
let nestedProp = obj.first && obj.first.second;
let nestedProp = obj.first?.second;

// 处理函数的参数，调用者可能并没有传这个参数
function doSomething(onContent, onError) {
  try {
    // do something with the data
  } catch (error) {
    // 校验onError是否真的存在
    // if (onError) {
    //   onError(error.message);
    // }
    // 如果onError是undefined也不会有异常;
    onError?.(error.message);
  }
}

// ?. 如果触发，右边不会被执行
let potentiallyNullObj = null;
let x = 0;
let prop = potentiallyNullObj?.[x++];

console.log(x); // x 将不会被递增，依旧输出 0

//////////////////////////////////
// nullish coalescing，比“或”更适合用来设置默认值
// ?? 判断 nullish
// || 判断 falsy

let obj = {};
let nestedProp = obj.first?.second ?? "jojo";
console.log(nestedProp); // jojo


// 不能和 && || 一起使用
null || undefined ?? "foo"; // raises a SyntaxError
