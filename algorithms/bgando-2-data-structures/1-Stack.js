// 用{}模拟stack
module.exports = class Stack {
  constructor() {
    this._storage = {};
    this._length = 0;
    this._min = undefined;
  }

  push(value) {
    this._storage[this._length] = value;

    this._length++;
    // 追踪最小值
    this._min = Math.min(
      this._min !== undefined ? this._min : Number.POSITIVE_INFINITY,
      value
    );
  }

  pop() {
    if (this._length) {
      const value = this._storage[this._length - 1];
      delete this._storage[this._length - 1];
      this._length--;
      return value;
    } else {
      // throw
    }
  }

  peek() {
    if (this._length) {
      return this._storage[this._length - 1];
    }
  }

  getMin() {
    return this._min;
  }

  isEmpty() {
    return this._length === 0;
  }
};
