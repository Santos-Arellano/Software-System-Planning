import { renderHook, act } from '@testing-library/react';
import useCounter from '../sharedComponent/useCounter';

describe('useCounter hook with renderHook', () => {
  test('should initialize counter to 0 and increment/decrement correctly', () => {

    const { result } = renderHook(() => useCounter());
    

    expect(result.current.count).toBe(0);
    

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
    
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(2);
    
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(1);
  });
  
  test('should allow customization of the initial count', () => {

    const { result } = renderHook(() => useCounter({ initialCount: 10 }));
    

    expect(result.current.count).toBe(10);
    
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11);
  });
  
  test('should allow customization of the step', () => {

    const { result } = renderHook(() => useCounter({ step: 5 }));
    

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