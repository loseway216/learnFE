const LinkedList = require("../3-LinkedList");

// 根据给出的值，将链表分区：小于x的、等于x的、大于x的
// Given a linked list and a value x, partition it such that all nodes less than x come first, then all nodes with value equal to x and finally nodes with value greater than or equal to x. The original relative order of the nodes in each of the three partitions should be preserved. The partition must work in-place.

/*
 * Partitions a linked list around a value, x
 * @param {Node} head - the head of the linked list
 * @param {number} x - the partition value
 * @return {Node} - the head of the linked list
 */
// TODO:
function partition(head, x) {
  let node = head,
    lessThanXHead,
    lessThanXTail,
    greaterThanXHead,
    greaterThanXTail;

  lessThanXHead = lessThanXTail = greaterThanXHead = greaterThanXTail = null;
  while (node) {
    let next = node.next;
    node.next = null;
    if (node.x >= x) {
      if (!greaterThanXTail) {
        greaterThanXHead = greaterThanXTail = node;
      } else {
        greaterThanXTail = greaterThanXTail.next = node;
      }
    } else if (node.x < x) {
      if (!lessThanXHead) {
        lessThanXHead = lessThanXTail = node;
      } else {
        lessThanXTail = lessThanXTail.next = node;
      }
    }
    node = next;
  }

  if (lessThanXTail) {
    lessThanXTail.next = greaterThanXHead;
  }
  return lessThanXTail || greaterThanXHead;
}

const ll = new LinkedList();

partition(ll, 6);
