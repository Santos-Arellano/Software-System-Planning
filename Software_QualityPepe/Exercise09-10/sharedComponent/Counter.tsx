///Users/santosa/Documents/GitHub/Software-System-Planning/ Software_Quality(Pepe)/Exercise09-10/sharedComponent/Counter.tsx
import React from "react";

const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1>Welcome budy</h1>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

<div>
  <Counter />
</div>;

export default Counter;
