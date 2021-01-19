module.exports = class LinkedList {
  constructor(value) {
    this._head = { value, next: null };
    this._tail = this._head;
  }

  // 尾部插入
  insert(value) {
    // update node
    const node = { value, next: null };
    if (!this._head.value) {
      this._head = node;
    } else {
      this._tail.next = node;
    }
    this._tail = node;
  }

  remove(index) {
    // 如果删除的是头
    if (index === 0) {
      const head = this._head;
      if (head) {
        this._head = head.next;
      } else {
        this._head = this._tail = null;
      }
    }

    // 找到index的前一个元素，将其next设为null
    let i = 0;
    let current = this._head;
    while (current) {
      if (index - 1 === i) {
        current.next = null;
      }
      current = current.next;
      i++;
    }
  }

  removeTail() {
    let current = this._head;
    // 循环找到倒数第二个元素
    while (current.next !== this._tail) {
      current = current.next;
    }
    current.next = null;
    this._tail = current;
  }

  contains(value) {
    let current = this._head;
    while (current.value !== value) {
      current = current.next;
    }
    return current.value === value;
  }

  isHead(node) {
    return node === this._head;
  }

  isTail(node) {
    return node === this._tail;
  }
};
