# Testing Custom Hooks - Part 2

## Background

When testing custom hooks, a common question is how to test them. Take a step back and remember:  
**The more your tests resemble the way your software is used, the more confidence they can give you.**

Sometimes it's hard to write a test component without making a pretty complicated "TestComponent." For those situations, you can try the following technique:

```javascript
let result;
function TestComponent(props) {
  result = useCustomHook(props);
  return null;
}

// interact with and assert on results here
```

## Exercise

1. Create a test file for your custom hook, called `10SolutionsPart2.test.tsx`.
2. Create a `TestComponent` that uses the custom hook and returns null.
3. Use the `render` function from React Testing Library to render the `TestComponent`.
4. Use assertions to check the state of the test component and the custom hook.
