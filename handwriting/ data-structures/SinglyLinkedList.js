class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function length(list) {
  if (list.isEmpty()) {
    return -1;
  }

  let length = 0;
  let currentNode = list.getHead();

  while (currentNode != null) {
    currentNode = currentNode.next;
    length++;
  }
  return length;
}

function reverse(list) {
  if (list.isEmpty()) {
    return null;
  }

  let currentNode = list.getHead();
  let previous = null;
  let next = null;

  while (currentNode != null) {
    next = currentNode.next;
    currentNode.next = previous;
    previous = currentNode;
    currentNode = next;
  }

  list.setHead(previous);

  return this;
}

function detectLoop(list) {
  if (list.isEmpty()) {
    return false;
  }

  let onestep = list.getHead();
  let twostep = list.getHead();

  while (onestep != null && twostep != null && twostep.next != null) {
    onestep = onestep.next;
    twostep = twostep.next.next;
    if (onestep == twostep) {
      return true;
    }
  }

  return false;
}

function findMid(list) {
  if (list.isEmpty()) {
    return null;
  }

  let onestep = list.getHead();
  let twostep = list.getHead();

  while (
    onestep.next != null &&
    twostep.next != null &&
    twostep.next.next != null
  ) {
    onestep = onestep.next;
    twostep = twostep.next.next;
  }

  if (onestep == null) {
    return null;
  }

  return onestep;
}

function removeDuplicates(list) {
  if (list.isEmpty()) {
    return list;
  }

  const map = {};

  let currentNode = list.getHead();

  map[currentNode.data] = 1;

  while (currentNode.next != null) {
    if (map[currentNode.next.data]) {
      currentNode.next = currentNode.next.next;
    } else {
      map[currentNode.next.data] = 1;
      currentNode = currentNode.next;
    }
  }

  return list;
}

function union(list1, list2) {
  if (list1.isEmpty()) {
    return list2;
  } else if (list2.isEmpty()) {
    return list1;
  }

  let currentNode = list1.getHead();
  while (currentNode.next != null) {
    currentNode = currentNode.next;
  }

  currentNode.next = list2.getHead();

  removeDuplicates(list1);

  return list1;
}

function findNth(list, n) {
  if (list.isEmpty()) {
    return null;
  }

  let length = 0;
  let startNode = list.getHead();

  while (startNode != null) {
    startNode = startNode.next;
    length++;
  }

  const nPos = length - n;

  if (nPos < 0 || nPos > length) {
    return null;
  }

  startNode = list.getHead();
  for (let i = 0; i < nPos; i++) {
    startNode = startNode.next;
  }

  return startNode;
}

function intersection(list1, list2) {
  const list = new LinkedList();

  let node1 = list1.getHead();
  let node2 = list2.getHead();

  while (node1 != null) {
    while (node2 != null) {
      if (node1.data == node2.data) {
        list.insertAtTail(node1.data);
      }
      node2 = node2.next;
    }
    node2 = list2.getHead();
    node1 = node1.next;
  }

  return removeDuplicates(list);
}

class LinkedList {
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
}

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

// test length
// let list = new LinkedList();
// list.insertAtHead(4);
// list.insertAtHead(3);
// list.insertAtHead(2);
// list.insertAtHead(1);
// list.insertAtHead(0);
// console.log(length(list));

// test reverse
// let list = new LinkedList();
// list.insertAtHead(4);
// list.insertAtHead(9);
// list.insertAtHead(6);
// list.insertAtHead(1);
// list.insertAtHead(0);
// list.printList();
// reverse(list);
// list.printList();

// test detectLoop
// let list = new LinkedList();

// list.insertAtHead(21);
// list.insertAtHead(14);
// list.insertAtHead(7);

// let head = list.getHead();
// let node = list.getHead();

// // Adding a loop
// for (var i = 0; i < 4; i++) {
//   if (node.next == null) {
//     node.next = head.next;
//     break;
//   }
//   node = node.next;
// }
// console.log(detectLoop(list));

// test findMid
// let list = new LinkedList();

// list.insertAtHead(21);
// list.insertAtHead(14);
// list.insertAtHead(11);
// list.insertAtHead(7);

// list.printList();

// console.log(findMid(list).data);

// test removeDuplicates
// let list = new LinkedList();
// list.insertAtHead(7);
// list.insertAtHead(7);
// list.insertAtHead(7);
// list.insertAtHead(22);
// list.insertAtHead(14);
// list.insertAtHead(21);
// list.insertAtHead(14);
// list.insertAtHead(7);

// list.printList();
// removeDuplicates(list);
// list.printList();

// test union
// let ulist1 = new LinkedList();
// let ulist2 = new LinkedList();
// ulist1.insertAtHead(8);
// ulist1.insertAtHead(22);
// ulist1.insertAtHead(15);
// ulist1.insertAtHead(22);
// ulist1.printList();

// ulist2.insertAtHead(21);
// ulist2.insertAtHead(14);
// ulist2.insertAtHead(21);
// ulist2.insertAtHead(8);
// ulist2.insertAtHead(7);
// ulist2.printList();

// union(ulist1, ulist2);
// ulist1.printList();

// test intersection
// let ulist1 = new LinkedList();
// let ulist2 = new LinkedList();
// ulist1.insertAtHead(8);
// ulist1.insertAtHead(22);
// ulist1.insertAtHead(15);
// ulist1.insertAtHead(14);
// ulist1.insertAtHead(8);
// ulist1.printList();

// ulist2.insertAtHead(21);
// ulist2.insertAtHead(14);
// ulist2.insertAtHead(7);
// ulist2.insertAtHead(14);
// ulist2.printList();

// let res = intersection(ulist1, ulist2);
// res.printList();

// test findNth
let l1 = new LinkedList();
l1.insertAtHead(54);
l1.insertAtHead(89);
l1.insertAtHead(11);
l1.insertAtHead(40);
l1.insertAtHead(23);

for (var i = 1; i < 5; i++) {
  console.log(findNth(l1, i).data);
}
console.log(findNth(l1, 100));
