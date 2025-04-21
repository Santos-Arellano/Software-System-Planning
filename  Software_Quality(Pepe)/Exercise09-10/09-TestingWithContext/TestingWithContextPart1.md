# Testing with Context - Part 1

## Learning Objectives

- Understand how to test components that use context values.
- Learn how to create a custom render function that wraps components in context providers.
- Write tests for a component that uses context values.
- Understand how to assert that a component renders correctly with different context values.

## Background

When testing React components, a common question is what to do with React components that use context values. Take a step back and remember:  
**The more your tests resemble the way your software is used, the more confidence they can give you.**

Therefore, you'll know that you want to render your component with the provider:

```javascript
render(
  <ContextProvider>
    <ComponentToTest />
  </ContextProvider>
);
```

The one problem with this is if you want to re-render the `<ComponentToTest />` (for example, to give it new props and test how it responds to updated props), then you must include the context providers:

```javascript
const { rerender } = render(
  <ContextProvider>
    <ComponentToTest />
  </ContextProvider>
);

rerender(
  <ContextProvider>
    <ComponentToTest newProp={true} />
  </ContextProvider>
);
```

This is kind of annoying, so instead, you can provide a `wrapper` option, and that will ensure that rerenders are wrapped as well:

```javascript
function Wrapper({ children }) {
  return <ContextProvider>{children}</ContextProvider>;
}

const { rerender } = render(<ComponentToTest />, { wrapper: Wrapper });

rerender(<ComponentToTest newProp={true} />);
```

https://testing-library.com/docs/react-testing-library/api#wrapper

This `Wrapper` could include providers for all your app’s context providers, such as the router, Theme, Authentication, etc.

## Exercise

In this exercise, we have an `Easy Button` component that's styled differently based on the Theme context. Before starting the exercise, check the files `src/context/ThemeContext.js` and `src/components/EasyButton.js`.

- The `EasyButton` component is a simple button that changes its background and text color based on the current theme.
- The `ThemeProvider` is a context provider that provides the current theme to its children.
- The `useTheme` hook is used to access the current theme.

## Instructions

1. Open a file called `09SolutionPart1.test.jsx` in this directory. Make sure to use the correct file name and extension.
2. Create a custom Wrapper function that wraps the component in the `ThemeProvider`. This will allow you to test the `EasyButton` component with different themes.
3. Write a test for the `EasyButton` component that checks if it renders with the `light` theme. The test should:
   - Use the **Wrapper** function to render the `EasyButton` component with the `light` theme.
   - Do not forget to update the render call to include the Wrapper.
   - Assert that the button has the correct styles for the light theme (background: 'white', color: 'black').
4. Write a test for the `EasyButton` component that checks if it renders with the `dark` theme. The test should:
   - Use the **Wrapper** function to render the `EasyButton` component with the `dark` theme.
   - Do not forget to update the render call to include the Wrapper.
   - Assert that the button has the correct styles for the dark theme (background: 'black', color: 'white').
