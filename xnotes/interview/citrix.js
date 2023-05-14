const { log } = require("console");

// count word ula
function countWordUla(data, diatribe) {
  const match = diatribe.match(/[a-zA-Z]/g);
  const str = match.join("");
  const match2 = str.match(data);
  return match2.index;
}

console.log("---------------------");
console.log(countWordUla("word", "$@^!$2132dsword#$&w134ord"));

// parking delimma
function carParkingRoof(cars, windowSize) {
  if (cars.length === 0 || windowSize < 0) {
    return 0;
  }

  cars.sort((a, b) => a - b);
  // console.log(cars);

  let roofLength = Infinity;

  for (let i = 0; i < cars.length; i++) {
    if (i + windowSize <= cars.length) {
      let currentLength = cars[i + windowSize - 1] - cars[i] + 1;
      // console.log(cars[i + windowSize - 1], cars[i]);
      roofLength = Math.min(roofLength, currentLength);
    }
  }

  if (roofLength === Infinity) {
    return 0;
  }

  return roofLength;
}

console.log("---------------------");
console.log(carParkingRoof([2, 10, 8, 17], 3));
console.log(carParkingRoof([1, 2, 3, 10], 4));

// stay positive
// 1413. Minimum Value to Get Positive Step by Step Sum
function minStart(arr) {
  let initial = 1;
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total += arr[i];

    if (total < 1) {
      initial += 0 - total;
      total += initial;
    }
  }

  return initial;
}

console.log("---------------------");
console.log(minStart([-4, 3, 2, 1]));
console.log(minStart([3, -6, 5, -2, 1]));
console.log(minStart([5]));

// birthday card collection
function hackerCards(collection, budget) {
  const result = [];
  let sum = 0;

  for (let i = 1; i < budget; i++) {
    if (collection.indexOf(i) > -1) {
      continue;
    }
    if (sum + i > budget) {
      break;
    }
    result.push(i);
    sum += i;
  }
  return result;
}

console.log("---------------------");
console.log(hackerCards([1, 3, 4], 7));
console.log(hackerCards([2, 4, 5], 7));

// how many sentences
function countSentences(wordSet, sentences) {
  function calculate(str) {
    let total = 0;
    [...str]
      .map((e) => e.charCodeAt())
      .forEach((code) => {
        total += code;
      });

    return total;
  }

  const map = {};
  let result = [];

  wordSet.forEach((word) => {
    const n = calculate(word);
    if (map[n]) {
      map[n] += 1;
    } else {
      map[n] = 1;
    }
  });
  console.log(map);

  result = sentences.map((sentence) => {
    const arr = sentence.split(" ");
    let sum = 0;
    arr.forEach((str) => {
      if (map[calculate(str)] > 1) {
        sum += map[calculate(str)];
      }
    });

    return sum;
  });

  return result;
}

console.log("---------------------");
console.log(
  countSentences(
    ["bats", "tabs", "in", "cat", "act"],
    ["cat the bats", "in the act", "act tabs in"]
  )
);

// Balancing Parentheses(Same as LeetCode 921)
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
  let left = 0;
  let balance = 0;

  const arr = [...s];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      balance += 1;
    }
    if (arr[i] === ")") {
      balance -= 1;
    }
    if (balance === -1) {
      left += 1;
      balance += 1;
    }
  }

  return balance + left;
};

console.log("---------------------");
console.log(minAddToMakeValid(")((()"));

// reductor array
function reductorArray(a, b, d) {
  let comparator = 0;
  for (let i = 0; i < a.length; i++) {
    let count = 0;

    for (let j = 0; j < b.length; j++) {
      if (Math.abs(a[i] - b[j]) > d) {
        count++;
      }
    }

    if (count === b.length) {
      comparator++;
    }
  }

  return comparator;
}

console.log("---------------------");
console.log(reductorArray([7, 5, 9], [13, 1, 4], 3));

// substring search
function findSubstrings(s) {
  s = [...s];
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    count += 1;

    let right = i + 1;
    let str = s[i];
    while (right < s.length) {
      if (str.indexOf(s[right]) == -1) {
        str += s[right];
        count += 1;
        right += 1;
      } else {
        break;
      }
    }
  }

  return count;
}

console.log("---------------------");
console.log(findSubstrings("abac"));
console.log(findSubstrings("bcada"));

// vowels
function vowels(strArr, queries) {
  const vowelsArr = ["a", "e", "i", "o", "u"];
  const result = [];

  for (let i = 0; i < queries.length; i++) {
    const [l, r] = queries[i].split("-");
    const arr = strArr.slice(l - 1, r);
    let count = 0;

    for (let j = 0; j < arr.length; j++) {
      const start = arr[j][0];
      const end = arr[j][arr[j].length - 1];
      if (vowelsArr.includes(start) && vowelsArr.includes(end)) {
        count += 1;
      }
    }
    result.push(count);
  }

  return result;
}

console.log("---------------------");
console.log(vowels(["aba", "bcb", "ece", "aa", "e"], ["1-3", "2-5", "2-2"]));

// minimum processing time
function minTime(processorTime, taskTime) {
  processorTime.sort((a, b) => a - b);
  taskTime.sort((a, b) => a - b);

  const firstHalf = taskTime.slice(0, 4).map((e) => e + processorTime[1]);
  const secondHalf = taskTime.slice(4).map((e) => e + processorTime[0]);
  console.log(firstHalf, secondHalf);

  return Math.max(firstHalf.pop(), secondHalf.pop());
}

console.log("---------------------");
console.log(minTime([8, 10], [2, 2, 3, 1, 8, 7, 4, 5]));
console.log(minTime([10, 20], [2, 3, 1, 2, 5, 8, 4, 3]));

// 526. Beautiful Arrangement
// backtracking
function countArrangement(N) {
  let count = 0;
  if (N == 0) return 0;
  const nums = new Array(N + 1);
  for (let i = 0; i <= N; i++) nums[i] = i;

  console.log(nums);

  helper(nums, N);
  return count;

  function helper(nums, start) {
    if (start == 0) {
      count++;
      return;
    }
    for (let i = start; i > 0; i--) {
      swap(nums, start, i);
      if (nums[start] % start == 0 || start % nums[start] == 0) {
        helper(nums, start - 1);
      }
      swap(nums, i, start);
    }
  }

  function swap(nums, a, b) {
    const temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
  }
}

console.log("---------------------");
console.log(countArrangement(2));
console.log(countArrangement(3));
console.log(countArrangement(5));

// 1046. Last Stone Weight
function lastStoneWeight(stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => b - a);
    stones[1] = stones[0] - stones[1];
    stones.shift();
  }
  return stones[0];
}

console.log("---------------------");
console.log(lastStoneWeight([1, 2, 3, 6, 7, 7]));

// office design
function getMaxColor(prices, budget) {
  let max = 0;
  let left = 0;
  let right = 0;

  while (right < prices.length) {
    let temp = left;
    let total = 0;
    while (temp < right) {
      //we add up the prices from left (replaced by temp) to right index to see what the current total is
      total += prices[temp];
      if (temp + 1 == right) {
        total += prices[right];
        break;
      }
      temp++;
    }
    if (total <= budget) {
      // if the total falls within budget, we set the max # of indexes shown by right-left+1
      max = Math.max(max, right - left + 1);
    }

    if (total > budget) {
      // if we exceeded budget, left moves up 1
      left++;
    } else {
      // if we haven't exceeded budget, we try one more index
      right++;
    }
  }

  return max;
}

console.log("---------------------");
console.log(getMaxColor([2, 3, 5, 1, 1, 2, 1], 7));

// equal levels two signals
function maxEquals(signalOne, signalTwo) {
  const n = Math.min(signalOne.length, signalTwo.length);
  let max = -1;
  let total = 0;

  for (let i = 0; i < n; i++) {
    if (signalOne[i] == signalTwo[i]) {
      if (signalOne[i] > max) {
        max = signalOne[i];
        total += 1;
      }
    }
  }

  return max;
}

console.log("---------------------");
console.log(maxEquals([1, 2, 3, 3, 3, 5, 4], [1, 2, 3, 4, 3, 5, 4]));

// calculate region
function calculateRegion(arr) {
  // Edge case
  if (arr == null || arr.length == 0) {
    return 0;
  }

  let region = 0;

  for (let i = 0; i < arr.length; i++) {
    let left = i - 1,
      right = i + 1;
    // Process left
    while (left >= 0 && arr[left] <= arr[i]) {
      left--;
    }
    // Process right
    while (right < arr.length && arr[right] <= arr[i]) {
      right++;
    }
    left = left + 1;
    right = right - 1;
    region += right - left + 1;
  }

  return region;
}

console.log("---------------------");
console.log(calculateRegion([1, 2, 1]));

// 2335. Minimum Amount of Time to Fill Cups
function fillCups() {}

// 227. Basic Calculator II
// 772. Basic Calculator III
// 207. Course Schedule
// 141. Linked List Cycle
// 142. Linked List Cycle II
// 242. Valid Anagram
