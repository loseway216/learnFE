class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

module.exports = class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // Add node to the end of the list

  insertAtTail(item) {
    const newNode = new Node(item);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;

      newNode.prev = this.tail;

      this.tail = newNode;
    }

    this.length++;

    return newNode;
  }

  deleteAtHead() {
    if (this.length === 0) {
      return null;
    }

    const nodeToRemove = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = nodeToRemove.next;

      this.head.prev = null;
      nodeToRemove.next = null;
    }

    this.length--;

    return nodeToRemove.data;
  }

  getHead() {
    if (!(this.head == null)) {
      return this.head.data;
    } else return null;
  }

  toString() {
    const list = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      list.push(JSON.stringify(currentNode.data));
      currentNode = currentNode.next;
    }

    return list.toString();
  }
};
