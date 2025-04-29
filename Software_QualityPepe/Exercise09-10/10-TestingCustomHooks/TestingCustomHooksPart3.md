# Testing Custom Hooks - Part 3

## Background

## Exercise

1. Create a test file for your custom hook, called `10SolutionsPart3.test.tsx`.
2. Create two more tests titled:
   - should allow customization of the initial count.
   - should allow customization of the step.
3. Abstract the common logic into a `setup` function.
   - As you can see, there is a different `TestComponent` created inside each test. Hence, you can abstract the common logic into a `setup` function.
   * The `setup` function will return an object containing the **current** state of the hook, which you can use in your tests. This way, you can easily test different scenarios by passing different props to the `setup` function.

Be aware of variable references, it gets tricky. Therefore, your should use `result.current` to access the current state of the hook.

```javascript
function setup(props) {
  // create a test component that uses the custom hook
  // and exposes the current result of the hook
  const result = { current: {} as ReturnType<typeof useCounter> };

  function TestComponent() {
    result.current = // hook with props
    return null;
  }

  // render test component
  // return result;
}
// interact with and assert on results here
```
