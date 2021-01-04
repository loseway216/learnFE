// What we're going to do is process the node, then add the left child to the queue and then add the right child to the queue.
// After that, we'll just dequeue an item off of the queue and call our function recursively on that node.
// You keep going until there's no items left in the queue.
// 循环版本
const breadthFirstTraverse = (queue, array) => {
  if (!queue || !queue.length) return array;

  while (queue.length) {
    const node = queue.shift();
    array.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return array;
};

// 递归版本
const recursiveBFT = (queue, array) => {
  if (!queue.length) return array;

  const node = queue.shift();
  array.push(node.value);
  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);

  return recursiveBFT(queue, array);
};

// unit tests
// do not modify the below code
describe("tests", function () {
  const answer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

  const tree = {
    value: "A",
    left: {
      value: "B",
      left: {
        value: "D",
        left: {
          value: "G",
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: "E",
        left: null,
        right: {
          value: "H",
          left: {
            value: "K",
            left: null,
            right: null,
          },
        },
      },
    },
    right: {
      value: "C",
      left: {
        value: "F",
        left: {
          value: "I",
          left: null,
          right: null,
        },
        right: {
          value: "J",
          left: null,
          right: null,
        },
      },
      right: null,
    },
  };

  it("breadthFirstTraverse", () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer);
  });
});
