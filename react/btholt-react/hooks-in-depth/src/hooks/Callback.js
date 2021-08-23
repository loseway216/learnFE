import { memo, useCallback, useEffect, useState } from "react";

// memo == pureComponent
// if props not changed, dont rerender
const ExpensiveComputationComponent = memo(({ compute, count }) => {
  return (
    <div>
      <h1>computed: {compute(count)}</h1>
      <h4>last re-render {new Date().toLocaleTimeString()}</h4>
    </div>
  );
});

const CallbackComponent = () => {
  const [time, setTime] = useState(new Date());
  const [count, setCount] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  });
  // time一直在变，导致CallbackComponent一直在重新渲染，导致每次都生成了新的fibonacci instance，导致子组件每次都重新渲染
  // useCallback意味着每次都返回同一个instance，子组件的两个依赖中只有count变化的时候，子组件才重新渲染
  // 这里可以把finbonacci定义在component外面，更适合的场景其实是function需要形成closure利用component内部的变量
  const fibonacci = (n) => {
    if (n <= 1) {
      return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
  };
  const theFibonacci = useCallback(fibonacci, []);

  return (
    <div>
      <h1>useCallback Example {time.toLocaleTimeString()}</h1>
      <button onClick={() => setCount(count + 1)}>
        current count: {count}
      </button>
      <ExpensiveComputationComponent compute={theFibonacci} count={count} />
    </div>
  );
};

export default CallbackComponent;
