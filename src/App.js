import React, { useState, useEffect } from 'react';
import taxiImage from './assets/taxi.png';  // Asegúrate de poner la ruta correcta
import './App.css';

const CarGame = () => {
  const [position, setPosition] = useState(10);  // Posición del carrito
  const [isMoving, setIsMoving] = useState(15);  // Estado del movimiento

  // Función que mueve el carrito
  const handleTap = () => {
    setIsMoving(true);
    setPosition((prev) => prev + 10);  // Aumenta la posición
  };

  // Detiene el movimiento después de un tiempo
  useEffect(() => {
    if (isMoving) {
      const timer = setTimeout(() => {
        setIsMoving(false);
      }, 500);  // Detiene el movimiento después de 500ms
      return () => clearTimeout(timer);
    }
  }, [isMoving]);

  const handleRestart = () => {
    setPosition(0);  // Restablecer la posición a 0
  };

  return (
    <div className="game-container" onClick={handleTap}>
      <p className="instructions">Toca la pantalla para mover el taxi.</p>
      <button onClick={handleRestart} className="restart-button">Restart</button>
      <div className="track">
      <img 
          src={taxiImage} 
          alt="Taxi clásico de NY" 
          className="car" 
          style={{ left: `${position}px` }} 
        />      
      </div>
      
    </div>
  );
};

export default CarGame;
