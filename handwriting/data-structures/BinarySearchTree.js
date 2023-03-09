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
    // case 1: empty tree
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

    // case 2: not found
    if (currentNode == null) {
      return false;
    }
    // case 3: delete a leaf node
    else if (currentNode.leftChild == null && currentNode.rightChild == null) {
      // delete the root node
      if (currentNode.val == this.root.val) {
        this.root = null;
        return true;
      }
      // 根据大小判断删除左边还是右边
      else if (currentNode.val < parent.val) {
        parent.leftChild = null;
        return true;
      } else {
        parent.rightChild = null;
        return true;
      }
    }
    // case 4: delete a node has a left child only
    else if (currentNode.leftChild && currentNode.rightChild == null) {
      if (currentNode.val == this.root.val) {
        this.root = currentNode.leftChild;
        return true;
      } else if (currentNode.leftChild.val < parent.val) {
        parent.leftChild = currentNode.leftChild;
        return true;
      } else {
        parent.rightChild = currentNode.leftChild;
        return true;
      }
    }
    // case 5: delete a node has a right child only
    else if (currentNode.rightChild && currentNode.leftChild == null) {
      if (currentNode.val === this.root.val) {
        this.root = currentNode.rightChild;
        return true;
      } else if (currentNode.rightChild.val < parent.val) {
        parent.leftChild = currentNode.leftChild;
        return true;
      } else {
        parent.rightChild = currentNode.leftChild;
        return true;
      }
    }
    // case 6: delete a node with two children
    else {
      // 右侧最小的值
      let minRight = currentNode.rightChild;

      while (minRight.leftChild) {
        minRight = minRight.leftChild;
      }

      const temp = minRight.val;
      this.delete(currentNode, minRight.val);
      currentNode.val = temp;
      return true;
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

// var BST = new BinarySearchTree(6);
// console.log("The root val for BST : ", BST.root.val);
// BST.insert(4);
// BST.insert(9);
// BST.insert(5);
// BST.insert(2);
// BST.insert(8);
// BST.insert(12);
// BST.insert(3);
// BST.insert(1);

// BST.inOrderPrint(BST.root);
// console.log("Delete 9!");
// console.log(BST.delete(BST.root, 9));
// BST.inOrderPrint(BST.root);

// var BST = new BinarySearchTree(6);
// console.log("The root val for BST : ", BST.root.val);
// BST.insert(4);
// BST.insert(9);
// BST.insert(5);
// BST.insert(2);
// BST.insert(8);
// BST.insert(12);

// console.log(BST.search(8));
// console.log(BST.search(11));
