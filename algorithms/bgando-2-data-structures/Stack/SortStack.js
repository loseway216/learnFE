const Stack = require("../1-Stack");

// 利用一个空stack，对另一个stack进行排序
function sortStack(stack) {
  let tempStack = new Stack();
  tempStack.push(stack.pop());

  while (!stack.isEmpty()) {
    let curr = stack.pop(),
      count = 0,
      currTemp = tempStack.peek();

    // 如果临时栈的元素更大，腾空临时栈，
    while (!tempStack.isEmpty() && curr < currTemp) {
      stack.push(tempStack.pop());
      ++count;
    }
    // 放入更小的元素
    tempStack.push(curr);
    // 再把较大的元素放到临时栈
    for (let i = 0; i < count; ++i) {
      tempStack.push(stack.pop());
    }
  }

  while (!tempStack.isEmpty()) {
    stack.push(tempStack.pop());
  }

  return stack;
}

const myS = new Stack();
myS.push(1);
myS.push(2);
myS.push(3);
myS.push(4);
console.log(sortStack(myS));
