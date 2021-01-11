// 一个简单的贪心算法例子：找零，永远优先找一个最大的硬币

const makeChange = (coins, amount) => {
  coins.sort((a, b) => b - a);

  let coinTotal = 0;
  let i = 0;
  while (amount > 0) {
    if (coins[i] <= amount) {
      amount -= coins[i];
      coinTotal++;
    } else {
      i++;
    }
  }

  return coinTotal;
};

console.log(makeChange([5, 10, 25], 40));
console.log(makeChange([10, 6, 1], 12));
