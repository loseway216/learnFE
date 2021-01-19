const Stack = require("../1-Stack");

// create a queue using 2 stacks
class TwoStackQueue {
  constructor() {
    this._stack1 = new Stack();
    this._stack2 = new Stack();
  }

  // 入队，添加到末尾
  enqueue(value) {
    this._stack1.push(value);
  }

  // 出队，删除第一个元素
  dequeue() {
    if (!this._stack2._length) {
      if (!this._stack1._length) return;

      while (this._stack1._length) {
        this._stack2.push(this._stack1.pop());
      }
    }

    return this._stack2.pop();
  }
}

const myQ = new TwoStackQueue();
myQ.enqueue(1);
myQ.enqueue(2);
myQ.enqueue(3);
myQ.enqueue(4);

console.log(myQ.dequeue());
console.log(myQ.dequeue());
console.log(myQ.dequeue());
console.log(myQ.dequeue());
