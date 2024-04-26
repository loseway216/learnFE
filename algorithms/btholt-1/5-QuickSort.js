// O(n logn)
// 如果是一个已经排过序的数组，以最大的数字为轴，效率很低，会是O(n^2)
// 现实中使用的是QucikSort3

const quickSort = (nums) => {
  if (nums.length < 2) return nums;
  // 以最后一个数字为轴，分成比pivot小的，和比轴大的两部分，然后递归
  // 不用pop是因为尽量不改变nums本身
  const pivot = nums[nums.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] < pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

console.log(quickSort([10, 5, 3, 8, 2, 6, 4, 7, 9, 1]));


const quickSortInPlace = (nums, start = 0, end = nums.length - 1) => {
  if (start >= end) return;
  
  const pivotIndex = partition(nums, start, end);
  
  quickSortInPlace(nums, start, pivotIndex - 1);
  quickSortInPlace(nums, pivotIndex + 1, end);
};

const partition = (nums, start, end) => {
  const pivot = nums[end];
  let i = start;

  for (let j = start; j < end; j++) {
    if (nums[j] < pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }

  [nums[i], nums[end]] = [nums[end], nums[i]];

  return i;
};

const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
quickSortInPlace(nums);
console.log(nums);
