const LinkedList = require("../3-LinkedList");

// 删除中间的元素
function deleteMid(list) {
  let mid = Math.floor(countOfNodes(list) / 2);
  let curr = list._head;
  while (mid > 1) {
    curr = curr.next;
    mid--;
  }
  curr.next = curr.next.next;
}

function countOfNodes(list) {
  let curr = list._head;
  let i = 0;
  while (curr) {
    curr = curr.next;
    i++;
  }
  return i;
}

const ll = new LinkedList();
ll.insert(1);
ll.insert(2);
ll.insert(3);
ll.insert(4);
ll.insert(5);
console.log(ll._head.next.next);
deleteMid(ll);
console.log(ll._head.next.next);
