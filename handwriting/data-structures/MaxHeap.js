module.exports = class MaxHeap {
  // class MaxHeap {
  constructor() {
    this.heap = [];
    this.elements = 0;
  }

  insert(value) {
    if (this.elements >= this.heap.length) {
      this.heap.push(value);
      this.elements += 1;
      this.__percolateUp(this.elements - 1);
    } else {
      this.heap[this.elements] = value;
      this.elements += 1;
      this.__percolateUp(this.elements - 1);
    }
  }

  getMax() {
    if (this.elements > 0) {
      return this.heap[0];
    } else {
      return null;
    }
  }

  removeMax() {
    if (this.elements > 1) {
      var max = this.heap[0];
      this.heap[0] = this.heap[this.elements - 1];
      this.elements = this.elements - 1;
      this.__maxHeapify(0);
      return max;
    } else if (this.elements == 1) {
      var max = this.heap[0];
      this.elements = this.elements - 1;
      return max;
    } else {
      return null;
    }
  }

  buildHeap(arr) {
    this.heap = arr;
    this.elements = arr.length;
    for (let i = this.heap.length - 1; i > -1; i--) {
      this.__maxHeapify(i);
    }
  }

  __percolateUp(index) {
    if (index <= 0) {
      return;
    }
    const parent = Math.floor((index - 1) / 2);

    if (this.heap[parent] < this.heap[index]) {
      const temp = this.heap[parent];
      this.heap[parent] = this.heap[index];
      this.heap[index] = temp;

      this.__percolateUp(parent);
    }
  }

  __maxHeapify(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (this.elements > left && this.heap[largest] < this.heap[left]) {
      largest = left;
    }
    if (this.elements > right && this.heap[largest] < this.heap[right]) {
      largest = right;
    }
    if (largest != index) {
      const temp = this.heap[largest];
      this.heap[largest] = this.heap[index];
      this.heap[index] = temp;
      this.__maxHeapify(largest);
    }
  }

  printHeap() {
    console.log(this.heap);
  }
};

// var heap = new MaxHeap();
// var arr = [6, 9, 3, 4, 13, 22, 1, 30, 17];
// heap.buildHeap(arr);
// heap.printHeap();
// // console.log(heap.getMax());
// heap.removeMax();
// heap.printHeap();
// heap.removeMax();
// heap.printHeap();
