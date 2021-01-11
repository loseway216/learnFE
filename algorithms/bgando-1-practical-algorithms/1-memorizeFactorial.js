// 利用闭包缓存
const memorize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      const result = fn(args);
      cache[n] = result;
      return result;
    }
  };
};

const factorial = memorize((x) => {
  if (x <= 1) {
    return 1;
  } else {
    return x * factorial(x - 1);
  }
});
console.log(factorial(5)); // calculated
console.log(factorial(5)); // calculated for 6 and cached for 5
