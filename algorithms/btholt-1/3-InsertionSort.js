// 适用于已经或接近排过序的数组，效率高于冒泡，但现实中很少会用
// O(n^2)

const insertionSort = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] < nums[j]) {
        // 取出右侧的元素
        const spliced = nums.splice(i, 1);
        // 插入到合适的位置
        nums.splice(j, 0, spliced[0]);
      }
    }
  }
  console.log(nums);
};

insertionSort([10, 5, 3, 8, 2, 6, 4, 7, 9, 1]);
