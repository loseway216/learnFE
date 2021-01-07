const _ = require("lodash");
/*

  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)

  You will probably need at least two more functions: heapify and createMaxHeap

  If you want to visualize your algorithm, call snapshot(<your array>) at the end of your heapify. The comparisons number will probably
  be a bit skewed but it's meant to be an approximation.


*/

// 原理：如果目标元素的index是n，将2n+1、2n+2的元素将那两个元素视为左、右叶子，父元素永远应该是最大的，maxHeap的特点是第一个节点永远是最大的
// 创建完maxHeap后，循环地将最大的元素，也就是第一个元素和最后一个元素交换，然后无视最后一个元素，视为一个新的需要进行堆化的数组
const heapSort = (array) => {
  array = createMaxHeap(array);
  for (let i = array.length - 1; i > 0; i--) {
    const largest = array[0];
    array[0] = array[i];
    array[i] = largest;
    heapify(array, 0, i);
  }

  return array;
};

// 创建堆，从中间的index开始，比较index的元素和 2n+1 2n+2 的元素
const createMaxHeap = (array) => {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, i, array.length);
  }
  return array;
};

// 堆化
const heapify = (array, index, heapSize) => {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  // 找到父、左、右三个中最大的下标，和index交换
  let largestValueIndex = index;

  if (heapSize > left && array[largestValueIndex] < array[left]) {
    largestValueIndex = left;
  }

  if (heapSize > right && array[largestValueIndex] < array[right]) {
    largestValueIndex = right;
  }
  if (largestValueIndex !== index) {
    const temp = array[index];
    array[index] = array[largestValueIndex];
    array[largestValueIndex] = temp;

    // 如果进行了交换，对交换后的下标继续heapify
    heapify(array, largestValueIndex, heapSize);
  }
};

// unit tests
// do not modify the below code
describe("heap sort", function () {
  // only one of these can run at a time due to how I implemented it D:
  // the first one is the real test, the second is just to see what it looks like on a large scale

  it("should sort correctly", () => {
    const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
    heapSort(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it("should sort correctly", () => {
    const fill = 50;
    const nums = _.shuffle(new Array(fill).fill().map((_, index) => index + 1));
    heapSort(nums);
    expect(nums).toEqual(new Array(fill).fill().map((_, index) => index + 1));
  });
});
