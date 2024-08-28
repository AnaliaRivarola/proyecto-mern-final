import React from 'react';
import ReactDOM from 'react-dom/client';  // Importa createRoot desde 'react-dom/client'
import App from './App';  // Asegúrate de que tu componente principal App esté correctamente importado

// Cambia ReactDOM.render a createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
