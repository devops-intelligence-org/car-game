import { render, screen, fireEvent } from '@testing-library/react';
import CarGame from './App';

test("Permite avanzar al seleccionar un nickname válido", () => {
  render(<CarGame />);

  // Buscar el input de nickname y el botón de continuar
  const nicknameInput = screen.getByPlaceholderText("Ingresa tu nickname");
  const continueButton = screen.getByText("Continuar");

  // Simular ingreso de un nickname
  fireEvent.change(nicknameInput, { target: { value: "Player123" } });

  // Hacer clic en el botón de continuar
  fireEvent.click(continueButton);

  // Verificar que se muestra la pantalla de selección de equipo
  expect(screen.getByText(/Selecciona tu equipo:/i)).toBeInTheDocument();
  expect(screen.getByText(/Hola, Player123/i)).toBeInTheDocument();
});
