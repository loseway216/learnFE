// TODO: define polyfill for `Object.is(..)`
Object.is = undefined;
if (!Object.is) {
  Object.is = function ObjectIs(v1, v2) {
    // 判断NaN
    // if (Number.isNaN(v1) && Number.isNaN(v2)) return true;
    if (isItNaN(v1) && isItNaN(v2)) {
      return true;
    }

    // 判断-0
    var v1NegZero = isItNegativeZero(v1);
    var v2NegZero = isItNegativeZero(v2);

    if (v1NegZero || v2NegZero) {
      // 其中有一个是-0的时候，两个都是-0返回true，否则返回false
      return v1NegZero && v2NegZero;
    }

    return v1 === v2;

    // 利用特性：NaN跟自己不相等
    function isItNaN(v) {
      return v !== v;
    }

    // 判断是否是-0
    function isItNegativeZero(v) {
      return v === 0 && 1 / v === -Infinity;
    }
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
