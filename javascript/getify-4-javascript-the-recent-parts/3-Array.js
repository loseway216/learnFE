// find ES6添加
var arr = [{ a: 1 }, { a: 2 }];

arr.find(function match(v) {
  return v && v.a > 1;
}); // {a: 2}

arr.find(function match(v) {
  return v && v.a > 10;
}); // undefined

// find无法判断没找到还是找到的是undefined
arr.findIndex(function match(v) {
  return v && v.a > 10;
}); // -1

// includes ES2016添加
var arr = [10, 20, NaN, 30, 40];

arr.includes(10, -2); // false

arr.includes(NaN); // true

// flat ES2019添加
var nestedValues = [1, [2, 3], [[]], [4, [5]], 6];

nestedValues.flat(0);

nestedValues.flat(/* 默认是1 */);

nestedValues.flat(2);

nestedValues.flat(Infinity);

// flatMap
[1, 2, 3].map(function tuples(v) {
  return [v * 2, String(v * 2)];
});
// [[2, "2"], [4, "4"], [6, "6"]]

[1, 2, 3]
  .map(function tuples(v) {
    return [v * 2, String(v * 2)];
  })
  .flat();

// 并不是先map后flat，是同时进行的，而且level默认是1
[1, 2, 3].flatMap(function tuples(v) {
  return [v * 2, String(v * 2)];
});

// 可以用来改变原数组
[1, 2, 3, 4, 5, 6].flatMap(function doubleEvens(v) {
  if (v % 2 == 0) {
    return [v * 2];
  } else {
    return [];
  }
});
// [2, 4, 8, 12]
