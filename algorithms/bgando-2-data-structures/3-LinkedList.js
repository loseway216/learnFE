class LinkedList {
  constructor(value) {
    this._head = { value, next: null };
    this._tail = this._head;
  }

  insert(value) {
    this._tail.next = { value, next: null };
    this._tail = { value, next: null };
  }

  remove() {}

  removeTail() {}

  contains() {}

  isHead() {}

  isTail() {}
}
