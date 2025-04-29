import React from 'react';
import { render, act } from '@testing-library/react';
import useCounter from '../sharedComponent/useCounter';

describe('useCounter hook with TestComponent', () => {
  test('should initialize counter to 0 and increment/decrement correctly', () => {
    let result: ReturnType<typeof useCounter> | undefined;
    
    function TestComponent() {
      result = useCounter();
      return null;
    }
    
    render(<TestComponent />);
    
    expect(result?.count).toBe(0);
    
    act(() => {
      result?.increment();
    });
    expect(result?.count).toBe(1);
    
    act(() => {
      result?.increment();
    });
    expect(result?.count).toBe(2);
    
    act(() => {
      result?.decrement();
    });
    expect(result?.count).toBe(1);
  });
});