# Testing with Context - Part 2

## Background

To take it further, you could create your own custom render method that does
this automatically:

```javascript
import { render } from "@testing-library/react";

function renderWithProviders(ui, options) {
  function Wrapper({ children }) {
    return <ContextProvider>{children}</ContextProvider>;
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

// then in your tests, you don't need to worry about context at all:
const { rerender } = renderWithProviders(<ComponentToTest />);

rerender(<ComponentToTest newProp={true} />);
```

## Create a custom render method

Now it is time to trim down the code in your tests. You can create a custom render method that will wrap your components in the necessary context providers. This will help you avoid repeating the same code in each test.
Create a custom render method, called `renderWithProviders`, that encapsulates this shared logic. It'll need a prop called `theme` (dark or light) and any additional options for rendering. This method should return the rendered component wrapped with the necessary context providers.

1. Create a file called `09SolutionPart2.test.jsx`. Copy and paste the code for `09SolutionPart1.test.jsx` into `09SolutionPart2.test.jsx`.
2. Create a function called `renderWithProviders` based on the above example and the duplicate code in your tests.
   - Inside this function, use the `render` method from `@testing-library/react` to render the component.
   - Use the `wrapper` option to wrap the component with the `ThemeProvider` and any other context providers you need.
   - Pass the `theme` prop to the `ThemeProvider` to set the theme for the test.
   - Return the result of the `render` method.
3. Modify your test to use `renderWithProviders` to render the `EasyButton` component with the `light` theme and assert its styles.
4. Modify your test to use `renderWithProviders` to render the `EasyButton` component with the `dark` theme and assert its styles.
