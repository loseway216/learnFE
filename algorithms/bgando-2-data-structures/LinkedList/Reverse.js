const LinkedList = require("../3-LinkedList");

// Given pointer to the head node of a linked list, reverse the linked list.

/*
 * Reverses the linked list
 * @param {Node} head - the head of the linked list
 * @return {Node} - the head of the linked list, reversed
 */
// TODO:
function reverse(head) {
  let currentNode = head;
  let previousNode = null;
  let nextNode = null;

  while (currentNode) {
    nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }

  return previousNode;
}

const a1 = new ListNode(1);
const a2 = new ListNode(2);
const a3 = new ListNode(3);
const a4 = new ListNode(4);
const a5 = new ListNode(5);
a1.next = a2;
a2.next = a3;
a3.next = a4;
a4.next = a5;

console.log(reverse(a1));
