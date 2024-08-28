// views/PerfilRescatista.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/menu';


import ListaMascota from '../components/ListaMascota';
import { Link } from 'react-router-dom';

const PerfilRescatista = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pets')
      .then(res => setPets(res.data))
      .catch(err => console.error(err));
  }, []);


  return (
    <>
    <Menu></Menu>
    <div className="perfilRescatista-container">
      <h1>Rescatista de mascotas</h1>
      <div className='contenedor-rescatista'> 
        <h2>Mi informacion</h2>
        <p>Nombre:</p>
        <p>Apellido:</p>
        <p>Telefono:</p>
        <p>Ciudad:</p>
      </div>  
      <h2>Mis mascotas</h2>
      <div className="button-container">
        <Link className="btn-nuevo"  to="/pets/new">Agregar una mascota</Link>
      </div>
      <ListaMascota pets={pets} />
    </div>
    </>
  );
};

export default PerfilRescatista;
