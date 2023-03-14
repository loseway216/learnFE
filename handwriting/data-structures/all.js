const LinkedList = require("./SinglyLinkedList");
const Queue = require("./Queue");
const Stack = require("./Stack");
const Graph = require("./Graph");
const BinarySearchTree = require("./BinarySearchTree");

/////////////////////////////////
// Array

// Merge Two Sorted Arrays
function mergeArrays(arr1, arr2) {}

// Find Two Numbers that Add up to "value"
function twoSum(arr, value) {}

// console.log(twoSum([1, 2, 3, 4], 5));
// console.log(twoSum([1, 2, 3, 4], 10));

// Array of Products of All Other Elements
function findProduct(arr) {}

// console.log(findProduct([1, 3, 4, 5]));

// Find Minimum Value in Array
function findMinimum(arr) {}

// console.log(findMinimum([9, 2, 3, 6, -1]));

// First First Unique Integer in an Array
function findFirstUnique(arr) {}

// console.log(findFirstUnique([9, 2, 3, 6, 2, 6, 9, 0, 3]));

// Find Second Maximum Value in an Array
function findSecondMaximum(arr) {}

// console.log(findSecondMaximum([9, 2, 3, 6]));

// Right Rotate an Array by n
// arr = [1, 2, 3, 4, 5]; n = 3; -> arr = [3, 4, 5, 1, 2];
function rightRotate(arr, n) {}

// console.log(rightRotate([1, 2, 3, 4, 5], 3));

// Rearrange Positive & Negative Values
// [10,-1,20,4,5,-9,-6] -> [-1,-9,-6,10,20,4,5]
function reArrange(arr) {}

// console.log(reArrange([10, -1, 20, 4, 5, -9, -6]));

// Rearrange Sorted Array in Max/Min Form
// arr = [1,2,3,4,5] -> arr = [5,1,4,2,3]
function maxMin(arr) {}

// console.log(maxMin([1, 2, 3, 4, 5, 6, 7]));

// Maximum Sum Subarray
function findMaxSumSubArray(arr) {}

// console.log(findMaxSumSubArray([-4, 2, -5, 1, 2, 3, 6, -5, 1])); // 12

/////////////////////////////////
// LinkedList

// Find the Length of a Linked List
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

// Reverse a Linked List
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

// Detect a Loop in a Linked List
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

// Find Middle Node of a Linked List
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

// Remove Duplicates from Linked List
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

// Union & Intersection of Linked Lists
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

// Union & Intersection of Linked Lists
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

// Return the Nth Node from the End
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

/////////////////////////////////
// Queue

// Generate Binary Numbers From 1 to n Using Queue
// n = 3 -> result = ["1","10","11"]
function findBin(number) {}

// console.log(findBin(3));

// Reversing First k Elements of Queue
// Queue = [1,2,3,4,5,6,7,8,9,10] k = 5 -> result = [5,4,3,2,1,6,7,8,9,10]
function reverseK(queue, k) {}

// var queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// queue.enqueue(5);
// queue.enqueue(6);
// queue.enqueue(7);
// queue.enqueue(8);
// queue.enqueue(9);
// queue.enqueue(10);

// reverseK(queue, 5);
// let queueSize = queue.size();
// for (var i = 0; i < queueSize; i++) console.log(queue.dequeue());

// Implement a Queue Using Stacks
class newQueue {
  constructor() {
    this.mainStack = new Stack();
    this.tempStack = new Stack();
  }

  enqueue(value) {}

  dequeue() {}
}

// var queue = new newQueue();
// for (var i = 0; i < 5; i++) queue.enqueue(i + 1);
// console.log("----------");
// for (var i = 0; i < 5; i++) console.log(queue.dequeue());

/////////////////////////////////
// Stack

// Implement Two Stacks using One Array
class twoStacks {
  constructor(s) {
    this.arr = [];
    this.top1 = -1;
    this.top2 = s;
    this.size = s;
  }

  push1(value) {}

  push2(value) {}

  pop1() {}

  pop2() {}
}

// var stack = new twoStacks(10);
// stack.push1(20);
// stack.push2(10);
// stack.push1(30);
// stack.push2(40);
// stack.push1(60);
// stack.push2(50);

// console.log(stack.pop1());
// console.log(stack.pop2());
// console.log(stack.pop1());
// console.log(stack.pop1());
// console.log(stack.pop2());
// console.log(stack.pop2());

// console.log(stack.pop1());
// console.log(stack.pop2());

// Sort Values in Stack
function sortStack(stack) {}

// var stack = new Stack();
// stack.push(2);
// stack.push(97);
// stack.push(4);
// stack.push(42);
// stack.push(12);
// stack.push(60);
// stack.push(23);
// let s = stack.size();
// sortStack(stack);
// for (var i = 0; i < s; i++) {
//   console.log(stack.pop());
// }

// Evaluate Postfix Expression Using a Stack
function evaluatePostfix(exp) {}

// console.log("Result: " + evaluatePostfix("921*-8-4+"));

// Next Greater Element Using a Stack
// arr = [4, 6, 3, 2, 8, 1] -> result = [6, 8, 8, 8, -1, -1]
function nextGreaterElement(arr) {}

// console.log(nextGreaterElement([4, 6, 3, 2, 8, 1]))

// Check Balanced Parentheses Using Stack
function isBalanced(exp) {}

// min stack
class minStack {
  constructor() {
    this.mainStack = new Stack();
    this.minStack = new Stack();
  }

  pop() {}

  push(value) {}

  min() {}
}

// var stack = new minStack();
// stack.push(5);
// stack.push(2);
// stack.push(4);
// stack.push(1);
// stack.push(3);
// stack.push(9);

// console.log("minimum value: ", stack.min());

// stack.pop();
// stack.pop();
// stack.pop();

// console.log("minimum value: ", stack.min());

// var inputString = "{[()]}";
// console.log(inputString);
// console.log(isBalanced(inputString));

// inputString = "{[([({))]}}";
// console.log(inputString);
// console.log(isBalanced(inputString));

/////////////////////////////////
// Graph

// Detect Cycle in Graph
function detectCycle(g) {}

// let g = new Graph(6);
// g.addEdge(0, 1);
// g.addEdge(1, 2);
// g.addEdge(3, 4);
// g.addEdge(4, 5);

// console.log(detectCycle(g));
// g.addEdge(5, 3);
// console.log(detectCycle(g));

// Find a "Mother Vertex" in a Graph (can reach to any other vertex)
function findMotherVertex(g) {}

// let g = new Graph(4);
// g.addEdge(0, 1);
// g.addEdge(1, 2);
// g.addEdge(3, 0);
// g.addEdge(3, 1);
// console.log(findMotherVertex(g));

// Count the Number of Edges in an Undirected Graph
function numEdges(g) {}

// let g = new Graph(9);
// g.addEdge(0, 2);
// g.addEdge(0, 5);
// g.addEdge(2, 3);
// g.addEdge(2, 4);
// g.addEdge(5, 3);
// g.addEdge(5, 6);
// g.addEdge(3, 6);
// g.addEdge(6, 7);
// g.addEdge(6, 8);
// g.addEdge(6, 4);
// g.addEdge(7, 8);
// g.printGraph();

// let g2 = new Graph(7);
// g2.addEdge(1, 2);
// g2.addEdge(1, 3);
// g2.addEdge(3, 4);
// g2.addEdge(3, 5);
// g2.addEdge(2, 5);
// g2.addEdge(2, 4);
// g2.addEdge(4, 6);
// g2.addEdge(4, 5);
// g2.addEdge(6, 5);

// console.log(numEdges(g));

// console.log(numEdges(g2));、

// Check if a Path Exists Between Two Vertices
function checkPath(g, source, destination) {}

// let g = new Graph(3);
// g.addEdge(0, 1);
// g.addEdge(1, 2);
// console.log(checkPath(g, 0, 2));

// Check if an Undirected Graph is Tree or not
function isTree(g) {}

// let g1 = new Graph(4);
// g1.addEdge(0, 1);
// g1.addEdge(0, 2);
// g1.addEdge(1, 2);
// g1.addEdge(2, 3);
// console.log(isTree(g1));

// let g2=new Graph(3);
// g2.addEdge(0, 1);
// g2.addEdge(0, 2);
// console.log(isTree(g2));

// let g3 = new Graph(3);
// g3.addEdge(0, 0);
// console.log(isTree(g3));

// Find the Shortest Path Between Two Vertices
function findMin(g, source, destination) {}

// let g = new Graph(7);
// g.addEdge(1, 2);
// g.addEdge(1, 3);
// g.addEdge(2, 4);
// g.addEdge(4, 5);
// g.addEdge(2, 5);
// g.addEdge(5, 6);
// g.addEdge(3, 6);
// console.log(findMin(g, 1, 6));

// Remove Edge
function removeEdge(graph, source, destination) {}

// let g = new Graph(5);
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 3);
// g.addEdge(2, 4);
// g.addEdge(4, 0);
// console.log("Before removing edge");
// g.printGraph();
// removeEdge(g, 1, 3);
// console.log("\nAfter removing edge");
// g.printGraph();

/////////////////////////////////
// BinarySearchTree

// Find the Minimum Value in a Binary Search Tree
function findMin(rootNode) {}

// var BST = new BinarySearchTree(6);
// BST.insertBST(20);
// BST.insertBST(-1);
// console.log(findMin(BST.root));

// Find the kth Maximum Value in a Binary Search Tree
function findKthMax(rootNode, k) {}

// var BST = new BinarySearchTree(6);
// BST.insertBST(1);
// BST.insertBST(133);
// BST.insertBST(12);
// console.log(findKthMax(BST.root, 3));

// Find Ancestors of a Given Node in a BST
function findAncestors(rootNode, k) {}

// var BST = new BinarySearchTree(6);
// BST.insertBST(1);
// BST.insertBST(133);
// BST.insertBST(12);
// console.log(findAncestors(BST.root, 12)); // [ 133, 6 ]

// Find the Height of a BST
function findHeight(rootNode) {}

// var BST = new BinarySearchTree(6);
// BST.insertBST(4);
// BST.insertBST(9);
// BST.insertBST(5);
// BST.insertBST(2);
// BST.insertBST(8);
// BST.insertBST(12);
// console.log(findHeight(BST.root));

// Find Nodes at "k" Distance From the Root
function findKNodes() {}

// var BST = new BinarySearchTree(6);
// BST.insertBST(4);
// BST.insertBST(9);
// BST.insertBST(5);
// BST.insertBST(2);
// BST.insertBST(8);
// BST.insertBST(12);
// console.log(findKNodes(BST.root, 2));

/////////////////////////////////
// Trie

// Total Number of Words in a Trie

function totalWords(root) {}

// let t = new Trie();
// t.insert("data", 0);
// t.insert("structures", 1);
// console.log(totalWords(t.root));

// Find All Words Stored in Trie

function findWords(root) {}

// let tr = new Trie();
// let keys = ["This", "is", "our", "first", "trie"];

// for (var x = 0; x < keys.length; x++) {
//   tr.insert(keys[x], x);
// }

// console.log(findWords(tr.root));

// Array Sort Using Tries

function sortArray(arr) {}

// let arr = ["abc", "aba", "ceed", "cde"];
// console.log(arr);
// console.log(sortArray(arr));

// Word Formation from a Dictionary Using a Trie

function isFormationPossible(dict, word) {}

// let keys = [
//   "the",
//   "hello",
//   "there",
//   "answer",
//   "any",
//   "educative",
//   "world",
//   "their",
//   "abc",
// ];
// console.log(isFormationPossible(keys, "helloworld"));

/////////////////////////////////
// Heap

// Convert Max-Heap to Min-Heap

// function convertMax(maxHeap) {
// Min Heapify all Parent Nodes
//   return minHeap;
// }

// Find k Smallest Elements in an Array

function findKSmallest(arr, k) {}

// var arr = [9, 4, 7, 1, -2, 6, 5];
// var k = 6;
// console.log(findKSmallest(arr, k));

// Find k Largest Elements in an Array

function findKLargest(arr, k) {}

// var arr = [9, 4, 7, 1, -2, 6, 5];
// var k = 6;
// console.log(findKLargest(arr, k));
