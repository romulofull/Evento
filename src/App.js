import React, { useState, useEffect } from 'react';
import Registro from './Registro';
import RecordatorioEvento from './RecordatorioEvento';
import Encuesta from './Encuesta';
import axios from 'axios';

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const address = 'Guayaquil, Ecuador';
  const [feedback, setFeedback] = useState('');
  const [allFeedback, setAllFeedback] = useState([]);

  const handleRegister = (name, email) => {
    setRegistered(true);
    setName(name);
  };

  const handleFeedbackSubmit = (feedback) => {
    setFeedback(feedback);
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/encuesta');
        setAllFeedback(response.data);
      } catch (error) {
        console.error('Error al obtener feedback:', error);
      }
    };

    fetchFeedback(); 
  }, []);

  return (
    <div className="app-container">
      <h1>Bienvenido al Evento</h1>
      <Registro onRegister={handleRegister} />
      {registered && (
        <>
          <RecordatorioEvento address={address} />
          <Encuesta name={name} onSubmit={handleFeedbackSubmit} />
          {feedback && <p>Gracias por tu respuesta {feedback}</p>}
        </>
      )}
      
    </div>
  );
};

export default App;
