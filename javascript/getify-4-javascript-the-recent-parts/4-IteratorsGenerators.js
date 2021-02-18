// *****************************
// Iterator：基础类型都已经内置的迭代器
var str = "Hello";

for (
  let it = str[Symbol.iterator](), v, result;
  (result = it.next()) && !result.done && (v = result.value || true);

) {
  console.log(result);
}

var it = str[Symbol.iterator]();

// for of 是ES6添加的，用来消费迭代器
for (const v of it) {
  console.log(v);
}

for (const v of str) {
  console.log(v);
}

// ...操作符也可以消费迭代器
var letters = [...str];

// *******************************
// Object 没有内置的迭代器，需要手动添加
var obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    var keys = Object.keys(this);
    var index = 0;
    return {
      next: () =>
        index < keys.length
          ? { done: false, value: this[keys[index++]] }
          : { done: true, value: undefined },
    };
  },
};

console.log([...obj]);

// *************************
// generators:制造Iterator
function* main() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

var it = main();

console.log("-----------------------\r\n");
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log([...main()]);

// 用generator改写上面的obj
var obj = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) {
      yield this[key];
    }
  },
};

console.log("-----------------------\r\n");
console.log([...obj]);

console.log("-----------------------");
console.log("Exercise\r\n");

var numbers = {
  *[Symbol.iterator]({ start = 0, end = 100, step = 1 } = {}) {
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  },
};

for (const num of numbers) {
  console.log(num);
}

console.log(
  `My lucky numbers are:${[
    ...numbers[Symbol.iterator]({ start: 6, end: 30, step: 4 }),
  ]}`
);
