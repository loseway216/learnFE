import { useEffect, useState } from "react";

const EffectComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    // return function: when component destroyed, clearTimeout or unsubscribe
    // 每次rerender之前都会clean up
    return () => clearTimeout(timer);
  }, [time, setTime]);
  // []: no dependency, run once
  // leave empty: no dependency, run forever
  // [time,setTime]: depends on time

  return <h1>useEffect Example: {time.toLocaleTimeString()}</h1>;
};

export default EffectComponent;
