// 两种实现：
// 邻接矩阵 http://slides.com/bgando/intro-graph-trees#/5/7
// 邻接链表 http://slides.com/bgando/intro-graph-trees#/5/12

class Graph {
  constructor(value) {
    // 用object的话，key必须是字符串，所以用node.value
    this.adjList = value || {};
  }

  addNode(node) {
    this.adjList[node.value] = { node, edges: [] };
  }

  // 讲两个点连接起来
  addEdge(node1, node2) {
    this.adjList[node1.value].edges.push(node2);
    this.adjList[node2.value].edges.push(node1);
  }

  removeNode(node) {
    delete this.adjList[node.value];

    const keys = Object.keys(this.adjList);
    keys.forEach((currNode) => {
      const index = this.adjList[currNode].edges.indexOf(node);
      if (index > -1) this.adjList[currNode].edges.splice(index, 1);
    });
  }

  removeEdge(node1, node2) {
    const index1 = this.adjList[node1.value].edges.indexOf(node2);
    if (index1 > -1) this.adjList[node1.value].edges.splice(index1, 1);

    const index2 = this.adjList[node2.value].edges.indexOf(node1);
    if (index2 > -1) this.adjList[node2.value].edges.splice(index2, 1);
  }

  // 深度优先：借用栈
  depthFirstTraversal(startingNode, func = console.log) {
    const nodeStack = [];
    const visited = {};

    nodeStack.push(startingNode);
    visited[startingNode] = true;

    while (nodeStack.length) {
      const current = nodeStack.pop();
      const neighbors = this.adjList[current];
      func(current);

      neighbors.forEach((neighbor) => {
        if (!visited[neighbor]) {
          nodeStack.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
  }

  // 广度优先：借用队列
  breadthFirstTraversal(startingNode, func = console.log) {
    const nodeQueue = [];
    const visited = {};

    nodeQueue.push(startingNode);
    visited[startingNode] = true;

    while (nodeQueue.length) {
      const current = nodeQueue.shift();
      const neighbors = this.adjList[current];
      func(current);

      neighbors.forEach((neighbor) => {
        if (!visited[neighbor]) {
          nodeQueue.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
  }
}

const adjList = {
  1: [2, 5],
  2: [1, 5, 3, 4],
  3: [2, 4],
  4: [2, 5, 3],
  5: [4, 1, 2],
};

const g1 = new Graph(adjList);

g1.depthFirstTraversal(1);
g1.breadthFirstTraversal(1);

// export default Graph;
