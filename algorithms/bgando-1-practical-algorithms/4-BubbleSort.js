const bubbleSortBasic = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 1; j < nums.length; j++) {
      if (nums[j - 1] > nums[j]) {
        const temp = nums[j - 1];
        nums[j - 1] = nums[j];
        nums[j] = temp;
      }
    }
  }
  return nums;
};

const bubbleSort = (nums) => {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > nums[i + 1]) {
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return nums;
};

console.log(bubbleSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]));
console.log(bubbleSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(bubbleSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
