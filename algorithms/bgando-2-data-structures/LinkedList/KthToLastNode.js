const LinkedList = require("../3-LinkedList");

// Given a linked list and a number k, write a function that returns the value at the k’th node from end of the linked list.

/*
 * returns the k-to-the-last node in a singly-linked list
 * @param {number} k - positive integer that counts from the end of a linked list to a node.
 * @param {Node} head - the head of a singly-link-list
 * @return {Node} - the kth node from the end of the linked list
 */

// counting solution
// TODO:
function kthToLastNode(k, head) {
  let length = 1;
  let currNode = head;

  // get count all the nodes
  while (currNode.next) {
    currNode = currNode.next;
    length += 1;
  }

  const distance = length - k;

  currNode = head;
  for (let i = 0; i < distance; i++) {
    currNode = currNode.next;
  }

  return currNode;
}

//improved solution w/ 2 pointers
function kthToLastNode(k, head) {
  let leftPointer = head;
  let rightPointer = head;

  // move rightPointer to the kth node
  for (let i = 0; i < k - 1; i++) {
    rightPointer = rightPointer.next;
  }

  while (rightPointer.next) {
    leftPointer = leftPointer.next;
    rightPointer = rightPointer.next;
  }

  return leftPointer;
}
