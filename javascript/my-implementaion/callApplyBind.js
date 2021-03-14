////////////////////////////////////
// call
Function.prototype.call2 = function (obj, ...args) {
  obj.fn = this
  obj.fn(...args)
  delete obj.fn
}

var foo = {
  value: 1
}

function Bar(x, y) {
  console.log(x + y + this.value)
}

Bar.call2(foo, 2, 3)

////////////////////////////////////
// apply
Function.prototype.apply2 = function (obj, arr) {
  obj.fn = this
  obj.fn(...arr)
  delete obj.fn
}

Bar.apply2(foo, [2, 3])

////////////////////////////////////
// bind
Function.prototype.bind2 = function (obj, args) {
  obj.fn = this
  return function () {
    obj.fn(...args)
  }
}

var bar2 = Bar.bind(foo)
bar2(2, 3)
