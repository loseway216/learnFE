//////////////////////////////
// 最简单的一个递归，其实应该用循环
let wr = (msg = "------") => console.log(msg);

function basicRecursion(max, current) {
  if (current > max) return;
  wr(current);
  basicRecursion(max, current + 1);
}

basicRecursion(5, 1);
wr();
wr();

///////////////////////////////
// 斐波那契数列
// 递归比循环有更好的可读性
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 2) + fibonacci(n - 1);
}

for (let i = 1; i < 20; i++) {
  wr(`${i}. ${fibonacci(i)}`);
}
wr();
wr();

//////////////////////////////
// factorial 阶乘

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

for (let i = 1; i < 20; i++) {
  wr(`${i}. ${factorial(i)}`);
}
wr();
wr();
