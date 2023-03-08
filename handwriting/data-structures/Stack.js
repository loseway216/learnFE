module.exports = class Stack {
  constructor(size) {
    this.size = size;
    this.items = [];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  push(value) {
    this.items.push(value);
    return this;
  }

  pop() {
    if (this.items.length > 0) {
      return this.items.pop();
    }
    return null;
  }

  getTop() {
    return this.items[this.items.length - 1];
  }
};
