import React, { useState, useEffect, useRef } from 'react';
import taxiImage from './assets/car.png';  // Asegúrate de poner la ruta correcta
import helicopter from './assets/helicopter.png';
import './App.css';

const CarGame = () => {
  const [carPosition, setCarPosition] = useState(10);  // Posición del carrito
  const [isMoving, setIsMoving] = useState(15);  // Estado del movimiento
  const [obstaclePosition, setObstaclePosition] = useState(0); // Posición vertical del obstáculo
  const intervalRef = useRef(null); // Referencia para el intervalo del obstáculo

  
  // Función que mueve el carrito

  const handleTap = () => {
    setIsMoving(true);
    setCarPosition((prev) => prev + 20);  // Aumenta la posición
  };


  // Detiene el movimiento después de un tiempo
  useEffect(() => 
  {

    if (isMoving) {
      const timer = setTimeout(() => {
        setIsMoving(false);
      }, 500);  // Detiene el movimiento después de 500ms
      return () => clearTimeout(timer);
    }

    //Helicoptero
    intervalRef.current = setInterval(() => {
      setObstaclePosition((prevPosition) => {
        // Si el obstáculo llega al límite superior, reinicia su posición
        if (prevPosition >= window.innerHeight - 50) {
          return 0;
        }
        return prevPosition + 15; // Incremento en la posición para mover hacia arriba
      });
    }, 100); // Intervalo de movimiento
    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalRef.current);

  },
[isMoving]  
 

);

  const handleRestart = () => {
    setCarPosition(0);  // Restablecer la posición a 0
  };

  return (
    <div className="game-container" onClick={handleTap}>
      <p className="instructions">Toca la pantalla para mover el taxi.</p>
      <button onClick={handleRestart} className="restart-button">Restart</button>
      <div className="track">
      <img 
          src={helicopter} 
          className="obstacle" style={{ bottom: `${obstaclePosition}px`, left: '10%' }}
        />         
      <img 
          src={taxiImage} 
          alt="Taxi clásico de NY" 
          className="car" 
          style={{ bottom: `${carPosition}px` }} 
        />  
        <div  />
   
      </div>
      
    </div>
  );
};

export default CarGame;
