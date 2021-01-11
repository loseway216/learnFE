const mergeSort = (nums) => {
  if (nums.length === 1) return nums;

  const middle = Math.floor(nums.length / 2);

  const left = nums.slice(0, middle);
  const right = nums.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  const result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return [...result, ...left, ...right];
};

console.log(mergeSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]));
console.log(mergeSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
