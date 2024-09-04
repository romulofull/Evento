import React, { useState } from 'react';
import axios from 'axios';

const Encuesta = ({ name, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (feedback) {
      try {
        await axios.post('http://localhost:5000/encuesta', { name, feedback });
        onSubmit(feedback);
      } catch (error) {
        console.error('Error al enviar feedback:', error);
      }
    }
  };

  return (
    <div>
      <h1>Encuesta del Evento</h1>
      <textarea
        placeholder="¿Cómo fue el evento?"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={handleSubmit}>Enviar Feedback</button>
    </div>
  );
};

export default Encuesta;
