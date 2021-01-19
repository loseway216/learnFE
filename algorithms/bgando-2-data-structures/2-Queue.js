// 用{}模拟队列
class Queue {
  constructor() {
    this._storage = {};
    this._length = 0;
    this._headIndex = 0;
  }

  // 入队，添加到末尾
  enqueue(value) {
    this._storage[this._length + this._headIndex] = value;
    this._length++;
  }

  // 出队，删除第一个元素，不改变后面每个元素的index
  dequeue() {
    if (this._length) {
      const firstValue = this._storage[this._headIndex];
      delete this._storage[this._headIndex];
      this._length--;
      this._headIndex++;
      return firstValue;
    }
  }
}

const myQ = new Queue();

myQ.enqueue("lzw");
console.log(myQ);
myQ.dequeue();
console.log(myQ);
