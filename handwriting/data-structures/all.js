const LinkedList = require("./SinglyLinkedList");
const Queue = require("./Queue");
const Stack = require("./Stack");
const Graph = require("./Graph");

/////////////////////////////////
// Array

/////////////////////////////////
// Queue

/////////////////////////////////
// Stack

/////////////////////////////////
// LinkedList

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

// test length
// let list = new LinkedList();
// list.insertAtHead(4);
// list.insertAtHead(3);
// list.insertAtHead(2);
// list.insertAtHead(1);
// list.insertAtHead(0);
// console.log(length(list));

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

// test findMid
// let list = new LinkedList();

// list.insertAtHead(21);
// list.insertAtHead(14);
// list.insertAtHead(11);
// list.insertAtHead(7);
// list.printList();

// console.log(findMid(list).data);

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

// test findNth
// let l1 = new LinkedList();
// l1.insertAtHead(54);
// l1.insertAtHead(89);
// l1.insertAtHead(11);
// l1.insertAtHead(40);
// l1.insertAtHead(23);

// for (var i = 1; i < 5; i++) {
//   console.log(findNth(l1, i).data);
// }
// console.log(findNth(l1, 100));

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

/////////////////////////////////
// Graph
