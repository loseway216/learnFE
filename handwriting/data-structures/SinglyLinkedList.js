class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

module.exports = class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtHead(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    return this;
  }

  deleteAtHead() {
    if (this.isEmpty()) {
      return this;
    }
    this.head = this.head.next;
    return this;
  }

  insertAtTail(value) {
    const node = new Node(value);

    if (this.isEmpty()) {
      this.head = node;
      return this;
    }

    let currentNode = this.head;
    while (currentNode.next != null) {
      currentNode = currentNode.next;
    }
    currentNode.next = node;

    return this;
  }

  deleteAtTail() {
    if (this.isEmpty()) {
      return this;
    }

    let currentNode = this.head;

    if (currentNode.next == null) {
      this.head = null;
      return this;
    }

    while (currentNode.next != null && currentNode.next.next != null) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;

    return this;
  }

  deleteVal(value) {
    if (this.isEmpty()) {
      return false;
    }

    let currentNode = this.head;

    if (currentNode.data == value) {
      this.head = currentNode.next;
      return true;
    }

    while (currentNode.next != null) {
      if (currentNode.next.data == value) {
        currentNode.next = currentNode.next.next;
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  search(value) {
    if (this.isEmpty()) {
      return false;
    }

    let currentNode = this.head;
    if (currentNode != null) {
      if ((currentNode.data = value)) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  isEmpty() {
    return this.head === null;
  }

  getHead() {
    return this.head;
  }

  setHead(newHead) {
    this.head = newHead;
    return this;
  }

  printList() {
    if (this.isEmpty()) {
      console.log("Empty List");
      return false;
    } else {
      let temp = this.head;
      while (temp != null) {
        process.stdout.write(String(temp.data));
        process.stdout.write(" -> ");
        temp = temp.next;
      }
      console.log("null");
      return true;
    }
  }

  getListStr() {
    if (this.isEmpty()) {
      console.log("Empty List");
      return "null";
    } else {
      let st = "";
      let temp = this.head;
      while (temp != null) {
        st += String(temp.data);
        st += " -> ";
        temp = temp.next;
      }
      st += "null";
      return st;
    }
  }
};

// test insertAtTail
// let list = new LinkedList();
// for (var i = 0; i < 5; i++) {
//   list.insertAtTail(i);
//   list.printList();
// }

// test search
// let list = new LinkedList();
// list.insertAtHead(4);
// list.insertAtHead(10);
// list.insertAtHead(40);
// list.insertAtHead(5);
// list.printList();
// console.log(list.search(4));
// console.log(list.search(0));

// test deleteVal
// let list = new LinkedList();
// list.insertAtHead(2);
// list.insertAtHead(4);
// list.insertAtHead(5);
// list.insertAtHead(7);
// list.insertAtHead(1);
// list.printList();
// list.deleteVal(2);
// list.printList();

// test deleteAtTail
// let list = new LinkedList();
// list.insertAtHead(2);
// list.insertAtHead(4);
// list.insertAtHead(5);
// list.insertAtHead(7);
// list.insertAtHead(1);
// list.printList();
// list.deleteAtTail();
// list.printList();
// list.deleteAtTail();
// list.printList();
// list.deleteAtTail();
// list.printList();
// list.deleteAtTail();
// list.printList();
// list.deleteAtTail();
// list.printList();
