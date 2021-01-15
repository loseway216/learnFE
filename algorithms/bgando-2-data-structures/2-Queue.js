// 用{}模拟队列
class Queue {
  constructor() {
    this._storage = {};
    this._length = 0;
  }

  // 入队
  enqueue(value) {
    this._storage[this._length] = value;
    this._length++;
  }

  // 出队
  dequeue() {
    if (this._length) {
      const value = this._storage[0];
      // 每个元素前移一位
      Object.keys(this._storage).forEach(
        (index) =>
          (this._storage[index] = !!this._storage[index + 1]
            ? this._storage[index + 1]
            : undefined)
      );
      // 删除最后元素
      delete this._storage[this._length - 1];
      this._length--;
      return value;
    }
  }
}
