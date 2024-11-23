import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarGame from './App';
// Test Bkp
describe('Car movement with tap', () => {
  test('should start at position 0', () => {
    const { getByText, container } = render(<CarGame />);
    
    const car = container.querySelector('.car');
    // Verificar que la posición inicial sea 0
    expect(car).toHaveStyle('left: 0px');
  });

  test('should move the car when clicked', () => {
    const { container } = render(<CarGame />);
    
    const car = container.querySelector('.car');
    const track = container.querySelector('.game-container');

    // Simular un "tap" o clic en la pista
    fireEvent.click(track);

    // Verificar que el carro se haya movido 20px a la derecha
    expect(car).toHaveStyle('left: 10px');
  });

  test('should move the car multiple times when clicked multiple times', () => {
    const { container } = render(<CarGame />);
    
    const car = container.querySelector('.car');
    const track = container.querySelector('.game-container');

    // Simular varios "taps" o clics en la pista
    fireEvent.click(track);
    fireEvent.click(track);
    fireEvent.click(track);

    // Verificar que el carro se haya movido 60px (3 clics * 20px)
    expect(car).toHaveStyle('left: 30px');
  });
});

