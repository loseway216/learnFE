const _ = require("lodash");

/*

  Implement a radix sort in a function called radixSort.

  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

  If you need help understanding radix sort, see https://btholt.github.io/four-semesters-of-cs-part-two/radix-sort

  You can visualize each iteration of bucketing and emptying of buckets by calling snapshot(array) at the end of each
  loop. It'll tell you how many iterations you've gone through where it says `Comparisons` at the top.


*/

// 1000
// 0102
// 0099
// place是从个位开始的位数，从0开始
function getDigit(number, place, longestNumber) {
  const string = number.toString();
  const size = string.length;
  const mod = longestNumber - size;
  return string[place - mod] || 0;
}

console.log(getDigit(102, 3, 4));
console.log(getDigit(102, 2, 4));
console.log(getDigit(102, 1, 4));
console.log(getDigit(102, 0, 4));

function findLongestNumber(array) {
  let longest = 0;
  for (let i = 0; i < array.length; i++) {
    const currentLength = array[i].toString().length;
    longest = currentLength > longest ? currentLength : longest;
  }
  return longest;
}

function radixSort(array) {
  // snapshot(array);
  const longestNumber = findLongestNumber(array);

  // 创建一个数组，包含10个空数组
  const buckets = Array.from({ length: 10 }, () => []);

  for (let i = longestNumber - 1; i >= 0; i--) {
    while (array.length) {
      const current = array.shift();
      buckets[getDigit(current, i, longestNumber)].push(current);
    }

    for (let j = 0; j < 10; j++) {
      while (buckets[j].length) {
        array.push(buckets[j].shift());
      }
    }
  }

  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001,
    ]);
  });
  it("should sort correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(_.sortBy(nums));
  });
});
