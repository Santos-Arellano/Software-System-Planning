import React from 'react';
import { render, act } from '@testing-library/react';
import useCounter from '../sharedComponent/useCounter';

function setup(props = {}) {
  const result = { current: {} as ReturnType<typeof useCounter> };
  
  function TestComponent() {
    result.current = useCounter(props);
    return null;
  }
  
  render(<TestComponent />);
  return result;
}

describe('useCounter hook with setup function', () => {
  test('should initialize counter to 0 and increment/decrement correctly', () => {

    const result = setup();
    
    expect(result.current.count).toBe(0);
    
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
    
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });
  
  test('should allow customization of the initial count', () => {

    const result = setup({ initialCount: 10 });
    
    expect(result.current.count).toBe(10);
    
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11);
  });
  
  test('should allow customization of the step', () => {
    const result = setup({ step: 5 });
    
    expect(result.current.count).toBe(0);
    
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5);
    
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });
});