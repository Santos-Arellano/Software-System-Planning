///Users/santosa/Documents/GitHub/Software-System-Planning/ Software_Quality(Pepe)/Exercise09-10/09-TestingWithContext/09SolutionPart1.test.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import EasyButton from '../sharedComponent/EasyButton';
import { ThemeProvider } from '../sharedComponent/theme';

describe('EasyButton with ThemeProvider', () => {
  function Wrapper({ children, theme = 'light' }) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
  }

   Wrapper.propTypes = {
    children: PropTypes.node,
    theme: PropTypes.string
  };

  test('renders with light theme', () => {
    render(<EasyButton>Click me</EasyButton>, { wrapper: props => <Wrapper {...props} /> });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveStyle({
      backgroundColor: 'white',
      color: 'black'
    });
  });

  test('renders with dark theme', () => {

    render(<EasyButton>Click me</EasyButton>, { 
      wrapper: props => <Wrapper {...props} theme="dark" />

    });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveStyle({
      backgroundColor: 'black',
      color: 'white'
    });
  });
});