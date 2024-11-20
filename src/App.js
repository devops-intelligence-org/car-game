import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from "uuid";
import taxiImage from './assets/car.png';  // Asegúrate de poner la ruta correcta
import helicopter from './assets/helicopter.png';
import './App.css';

const CarGame = () => {
  const [carPosition, setCarPosition] = useState(10);  // Posición del carrito
  const [isMoving, setIsMoving] = useState(15);  // Estado del movimiento
  const [obstaclePosition, setObstaclePosition] = useState(0); // Posición vertical del obstáculo
  const [team, setTeam] = useState(null); // Equipo seleccionado por el jugador
  const [tapCount, setTapCount] = useState(0); // Contador de taps
  const [startTime, setStartTime] = useState(null); // Tiempo de inicio
  const [endTime, setEndTime] = useState(null); // Tiempo de finalización
  const [nickname, setNickname] = useState("");
  const [isNicknameSet, setIsNicknameSet] = useState(false);
 // const [playerId, setPlayerId] = useState(null);
 
 const [tapCountII, setTapCountII] = useState(0); 
  const intervalRef = useRef(null); // Referencia para el intervalo del obstáculo

  // Función que mueve el carrito

  const moveCar = () => {
    setIsMoving(true);
    setCarPosition((prev) => prev + 20);  // Aumenta la posición
    if (!startTime) {
      // Establecer el tiempo de inicio en el primer tap
      setStartTime(Date.now());
    }

    setTapCount((prevCount) => prevCount + 1);
    setTapCountII((prevCount)=> prevCount + 1);
    setCarPosition((prevPosition) => {const newPosition = prevPosition + 10;

      // Verificar si el carro ha llegado al límite superior
      if (newPosition >= window.innerHeight - 50) {
        registerGame();
        setEndTime(Date.now()); // Establecer el tiempo de finalización
        setCarPosition(10);
      }

      return newPosition;
    });
  };


  // Detiene el movimiento después de un tiempo
  useEffect(() => 
  {

    if (!team) return;
 
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
[isMoving,team] );

  const registerGame = () => {
    const durationInSeconds = (Date.now() - startTime) / 1000;
    fetch("http://localhost:3001/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId,
        taps: tapCountII,
        duration: durationInSeconds,
      }),
    })
    .then((response) => response.json())
    .then((data) => {    
      console.log("Juego registrado:", data);
      
    })
    .catch((error) => console.error("Error registrando juego:", error));
    

  }

  const handleRestart = () => {
    registerGame();
    // Reiniciar contadores
    setCarPosition(10);  // Restablecer la posición a partida
    setTapCount(-1);
    setTapCountII(-1);
    setStartTime(null);
    setEndTime(null);
    
     }

     
     const handleNicknameSubmit = () => {
      if (nickname.trim()) {
        setIsNicknameSet(true);
      } else {
        alert("Por favor ingresa un nickname válido.");
      }
    }
  
    //PlayerID
    const [playerId, setPlayerId] = useState(() => {
      const savedPlayerId = localStorage.getItem("playerId");
      if (savedPlayerId) return savedPlayerId;
    
      const newPlayerId = uuidv4();
      localStorage.setItem("playerId", newPlayerId);
      return newPlayerId;
    });

    // Enviar Nickname y equipo
    const handleSelectTeam = (selectedTeam) => {
        fetch("http://localhost:3001/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({playerId, nickname, team: selectedTeam }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Jugador registrado:", data);
          setTeam(selectedTeam);
        })
        .catch((error) => console.error("Error registrando jugador:", error));
    }


  // Calcular el tiempo transcurrido
  const elapsedTime = endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;
  const averageTime = (tapCount/elapsedTime).toFixed(2);

    return (
      <div className="game">
        {!isNicknameSet ? (
          <div className="nickname-screen">
            
            <h1>Power the Future</h1>
            <h4>Bienvenido a Car Game! </h4>
            <input
              placeholder="Ingresa tu nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={handleNicknameSubmit} className='nickname-buttom'>Continuar</button>
          </div>
        ) : !team ? (
          <div className="team-selection">
            <h1>Hola, {nickname}</h1>
            <p>Selecciona tu equipo:</p>
            <button onClick={() => handleSelectTeam("Equipo Dev")} className="team-button team-a">Equipo Dev</button>
            <button onClick={() => handleSelectTeam("Equipo Ops")} className="team-button team-b">Equipo Ops</button>

          </div>
        ) : (
          <div className="gameplay">
            <h3>¡A jugar, {nickname}! ({playerId}) {team}</h3>
            
            {
              <div className="game-container" onClick={moveCar}>
              <p className="instructions">Toca la pantalla para mover el taxi.</p>
              <button onClick={handleRestart} className="restart-button">Restart</button>
              <p className="linea-meta"> Finish</p>
              
              <p className="tap-counter">Taps: {tapCount}</p>
              {elapsedTime && <p className="time-display">Tiempo: {elapsedTime} sec</p>}
              {averageTime && <p className="avg-display">AVG: {averageTime} tap/sec</p>}
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
            }
          </div>
        )}
      </div>
    );
};

export default CarGame;