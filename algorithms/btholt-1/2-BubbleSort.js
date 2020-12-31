// 冒泡排序效率很低，但是符合人的直觉，现实中几乎不会使用
// O(n^2)

const bubbleSort = (nums) => {
  do {
    var swapped = false;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > nums[i + 1]) {
        // 两两交换
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  console.log(nums);
};

bubbleSort([10, 5, 3, 8, 2, 6, 4, 7, 9, 1]);
