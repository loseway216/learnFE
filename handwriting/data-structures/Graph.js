const LinkedList = require("./SinglyLinkedList");
const Queue = require("./Queue");
const Stack = require("./Stack");

module.exports = class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjacentList = [];

    for (let i = 0; i < vertices; i++) {
      this.adjacentList.push(new LinkedList());
    }
  }

  addEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices) {
      this.adjacentList[source].insertAtHead(destination);
    }
    return this;
  }

  bfsTraversal(source) {
    let result = "";
    const queue = new Queue();
    const visited = new Array(this.vertices).fill(false);

    queue.enqueue(source);
    visited[source] = true;

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      result += current;
      const list = this.adjacentList[current];

      let startNode = list.getHead();
      while (startNode != null) {
        const data = startNode.data;
        if (!visited[data]) {
          queue.enqueue(data);
          visited[data] = true;
        }
        startNode = startNode.next;
      }
    }

    return result;
  }

  dfsTraversal(source) {
    let result = "";
    const stack = new Stack();
    const visited = new Array(this.vertices).fill(false);

    stack.push(source);
    visited[source] = true;

    while (!stack.isEmpty()) {
      const current = stack.pop();
      result += current;
      const list = this.adjacentList[current];

      let startNode = list.getHead();
      while (startNode != null) {
        const data = startNode.data;
        if (!visited[data]) {
          stack.push(data);
          visited[data] = true;
        }
        startNode = startNode.next;
      }
    }

    return result;
  }

  printGraph() {
    console.log(">>Adjacency List of Directed Graph<<");
    var i;
    for (i = 0; i < this.adjacentList.length; i++) {
      process.stdout.write("|" + String(i) + "| => ");
      let temp = this.adjacentList[i].getHead();
      while (temp != null) {
        process.stdout.write("[" + String(temp.data) + "] -> ");
        temp = temp.next;
      }
      console.log("null ");
    }
  }
};

// let g1 = new Graph(6);
// g1.addEdge(0, 1);
// g1.addEdge(0, 2);
// g1.addEdge(1, 3);
// g1.addEdge(1, 4);
// g1.addEdge(2, 5);
// g1.printGraph();
// console.log(g1.bfsTraversal(0));
// console.log(g1.dfsTraversal(0));
