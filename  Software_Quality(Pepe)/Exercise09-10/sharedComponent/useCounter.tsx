///Users/santosa/Documents/GitHub/Software-System-Planning/ Software_Quality(Pepe)/Exercise09-10/sharedComponent/useCounter.tsx
import * as React from "react";

function useCounter({ initialCount = 0, step = 1 } = {}) {
  const [count, setCount] = React.useState(initialCount);
  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  return { count, increment, decrement };
}

export default useCounter;
