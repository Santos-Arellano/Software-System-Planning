# Testing Custom Hooks - Part 4

## Background

### What is `renderHook`?

`renderHook` is a utility that allows you to test the behavior of custom React hooks in isolation. It provides a way to invoke a hook and observe its behavior, such as its return values, state changes, and side effects, without needing to render a full React component.

### Why use `renderHook`?

Custom hooks often encapsulate complex logic, such as state management or side effects. Testing them directly ensures that they work as expected and helps catch bugs early. `renderHook` simplifies this process by providing a clean API to test hooks without the overhead of rendering components.

### Example Usage

Here’s an example of how you might use `renderHook` to test a custom hook:

```typescript
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "./useCounter"; // Assume this is your custom hook

test("should increment counter", () => {
  const { result } = renderHook(useCounter);

  // Initial state
  expect(result.current.count).toBe(0);

  // rest of code
});
```

### Key Points in the Example

1. **`renderHook`**: Invokes the custom hook and returns an object containing the `result`, which holds the hook's return values.
2. **`act`**: Ensures that state updates and side effects are processed correctly, simulating user interactions or events.
3. **Assertions**: You can directly test the hook's state and behavior by accessing `result.current`.

### When to Use `renderHook`

- Testing hooks that manage state (e.g., `useState`, `useReducer`).
- Testing hooks that perform side effects (e.g., `useEffect`).
- Ensuring hooks behave correctly under different conditions.

## Exercise

1. Create a test file for your custom hook, called `10SolutionsPart3.test.tsx`.
2. The custom `setup` function is very similar to the `renderHook` function from
   [`@testing-library/react`](https://github.com/testing-library/react-testing-library)!
   Swap the `setup` function with `renderHook`.
3. Remove the `TestComponent`.
