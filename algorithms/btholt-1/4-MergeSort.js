// array.sort底层使用的算法,stable
// O(n logn)
// 空间复杂度，O(n)，因为创建了新的数组

const mergeSort = (nums) => {
  if (nums.length < 2) {
    return nums;
  }
  const length = nums.length;
  const middle = Math.floor(length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle, length);

  // 递归，二分然后分别调用
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return stitch(sortedLeft, sortedRight);
};

// 拼接两个已经排过序的数组
const stitch = (left, right) => {
  const results = [];

  // 比较两个数组的第一个元素，将小的从原数组拿出，放到新数组中
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      results.push(left.shift());
    } else {
      results.push(right.shift());
    }
  }

  // left或right，会剩下最后一个元素
  return [...results, ...left, ...right];
};

console.log(mergeSort([10, 5, 3, 8, 2, 6, 4, 7, 9, 1]));
