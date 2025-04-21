///Users/santosa/Documents/GitHub/Software-System-Planning/ Software_Quality(Pepe)/Exercise09-10/09-TestingWithContext/09SolutionPart2.test.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Añadir esta importación
import { render, screen } from '@testing-library/react';
import EasyButton from '../sharedComponent/EasyButton';
import { ThemeProvider } from '../sharedComponent/theme';

function renderWithProviders(ui, { theme = 'light', ...options } = {}) {
  function Wrapper({ children }) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
  }
  
  // Añadir PropTypes
  Wrapper.propTypes = {
    children: PropTypes.node
  };
  
  return render(ui, { wrapper: Wrapper, ...options });
}

describe('EasyButton with custom renderWithProviders', () => {
  test('renders with light theme', () => {

    renderWithProviders(<EasyButton>Click me</EasyButton>, { theme: 'light' });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveStyle({
      backgroundColor: 'white',
      color: 'black'
    });
  });

  test('renders with dark theme', () => {

    renderWithProviders(<EasyButton>Click me</EasyButton>, { theme: 'dark' });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveStyle({
      backgroundColor: 'black',
      color: 'white'
    });
  });
});