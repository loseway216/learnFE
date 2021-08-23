import { useState } from "react";

const StateComponent = () => {
  // 调用setState就会触发rerender，即使值不变
  const [isGreen, setIsGreen] = useState(true);

  return (
    <h1
      onClick={() => setIsGreen(!isGreen)}
      style={{ color: isGreen ? "greenyellow" : "orangered" }}
    >
      useState Example
    </h1>
  );
};

export default StateComponent;
