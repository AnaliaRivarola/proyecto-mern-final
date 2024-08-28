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
      <div style={{ paddingTop: '100px', backgroundcolor: '##ededed' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 70px' }}>
          <h1 style={{ margin: 0 }}>Mis mascotas</h1>
          <Link className="btn-nuevo" to="/pets/new" style={{ fontSize: '14px', textDecoration: 'none', color: '#fff', backgroundColor: '#28a745', borderRadius: '4%' }}>
           Agregar
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 70px' }}>
          <ListaMascota pets={pets} />
        </div>
      </div>
    </>
  );
};

export default PerfilRescatista;
