class Node {
  constructor(value) {
    this.val = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

module.exports = class BinarySearchTree {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  insert(newValue) {
    if (this.root == null) {
      this.root = new Node(newValue);
      return;
    }
    // 迭代
    let currentNode = this.root;
    let parent;

    while (currentNode) {
      parent = currentNode;
      if (newValue < currentNode.val) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    if (newValue < parent.val) {
      parent.leftChild = new Node(newValue);
    } else {
      parent.rightChild = new Node(newValue);
    }

    // 递归
    // this.insertHelper(this.root, newValue);
  }

  insertHelper(currentNode, newValue) {
    if (currentNode == null) {
      this.root = new Node(newValue);
    } else if (newValue < currentNode.val) {
      currentNode.leftChild = this.insert(currentNode.leftChild, newValue);
    } else {
      currentNode.rightChild = this.insert(currentNode.rightChild, newValue);
    }
    return currentNode;
  }

  search(value) {
    let currentNode = this.root;

    // 迭代
    while (currentNode && currentNode.val !== value) {
      if (value < currentNode.val) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    // finded or null
    return currentNode;

    // 递归
    // return this.searchHepler(currentNode, value);
  }

  searchHepler(currentNode, value) {
    if (currentNode) {
      if (currentNode.val === value) {
        return currentNode;
      } else if (value < currentNode.val) {
        return this.searchHepler(currentNode.leftChild, value);
      } else {
        return this.searchHepler(currentNode.rightChild, value);
      }
    }

    return null;
  }

  delete(currentNode, value) {
    if (currentNode == null) {
      return false;
    }

    let parent;

    while (currentNode && currentNode.val !== value) {
      parent = currentNode;
      if (value < currentNode.val) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    if (currentNode == null) {
      // not found
      return false;
    } else if (
      currentNode.leftChild == null &&
      currentNode.rightChild == null
    ) {
      // leaf node
      parent;
    }
  }

  preOrderPrint(currentNode) {
    if (currentNode) {
      console.log(currentNode.val);
      this.preOrderPrint(currentNode.leftChild);
      this.preOrderPrint(currentNode.rightChild);
    }
  }

  inOrderPrint(currentNode) {
    if (currentNode) {
      this.inOrderPrint(currentNode.leftChild);
      console.log(currentNode.val);
      this.inOrderPrint(currentNode.rightChild);
    }
  }

  postOrderPrint(currentNode) {
    if (currentNode) {
      this.inOrderPrint(currentNode.leftChild);
      this.inOrderPrint(currentNode.rightChild);
      console.log(currentNode.val);
    }
  }
};
