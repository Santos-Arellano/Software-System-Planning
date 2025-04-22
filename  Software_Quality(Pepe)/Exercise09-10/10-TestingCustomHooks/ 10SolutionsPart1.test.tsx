///Users/santosa/Documents/GitHub/Software-System-Planning/ Software_Quality(Pepe)/Exercise09-10/10-TestingCustomHooks/ 10SolutionsPart1.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import useCounter from '../sharedComponent/useCounter';

function UseCounterHook() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

describe('useCounter hook in component', () => {
  test('should initialize counter to 0 and increment/decrement correctly', async () => {
    const user = userEvent.setup();
    
    render(<UseCounterHook />);
    
    expect(screen.getByRole('heading').textContent).toContain('Count: 0');
    
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByRole('heading').textContent).toContain('Count: 1');
    
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByRole('heading').textContent).toContain('Count: 2');
    
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByRole('heading').textContent).toContain('Count: 1');
  });
});

