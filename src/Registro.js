import React, { useState } from 'react';
import axios from 'axios';

const Registro = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (name && email) {
      try {
        await axios.post('http://localhost:5000/registro', { name, email });
        onRegister(name, email);
      } catch (error) {
        console.error('Error al registrarse:', error);
      }
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Registrarse</button>
    </div>
  );
};

export default Registro;
