function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c)
      }
    }
  }
}

function add(a, b, c) {
  return a + b + c
}

var curried = curry(add)

console.log(curried(1)(2)(3))

/////////////////////////////////////////

const curry = (fn, ...args) => {}
