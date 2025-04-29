# Testing Custom Hooks - Part 1

## Learning Objectives

- Understand how to test hooks in a component.
- Understand how to test the behavior of a custom hook by testing the component that uses it.

## Background

When testing custom hooks, a common question is how to test them. Take a step back and remember:  
**The more your tests resemble the way your software is used, the more confidence they can give you.**

Therefore, you'll know that you want to test your custom hooks in a component that use them. This is because custom hooks are often designed to be used within a component, and their behavior can depend on the component's lifecycle and state.

## Exercise

1. Create a test file for your custom hook, called `10SolutionsPart1.test.tsx`.
2. Create a simple function component, called `UseCounterHook`, that uses the `useCounter` hook and then exposes some UI that our test can interact with to test the capabilities of this hook. The component should include buttons for incrementing and decrementing the counter, and a h1 tag to display the current count.
3. Write a test that renders the `UseCounterHook` component and verifies that the counter starts at 0, and that the increment and decrement buttons work as expected.
4. The test should simulate clicking the increment and decrement buttons and verify that the counter updates correctly. Use the `userEvent` library to simulate user interactions.