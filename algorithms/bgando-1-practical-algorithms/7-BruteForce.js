// 暴力算法：处理每一种可能性，比贪心算法更准确

const coins = [10, 6, 1];

const makeChange = (value) => {
  if (value === 0) return 0;
  let minCoins;
  coins.forEach((coin) => {
    if (value - coin >= 0) {
      //  递归处理更小的找零
      let currMincoins = makeChange(value - coin);
      if (minCoins === undefined || currMincoins < minCoins) {
        minCoins = currMincoins;
      }
    }
  });

  return minCoins + 1;
};

console.log(makeChange(12));
