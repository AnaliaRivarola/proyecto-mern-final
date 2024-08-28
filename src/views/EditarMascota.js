// views/EditarMascota.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FormularioMascota from '../components/FormularioMascota';

const EditarMascota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const updatePet = pet => {
    axios.put(`http://localhost:8000/api/pets/${id}`, pet)
      .then(res => navigate(`/pets/${id}`))
      .catch(err => setErrors(err.response.data.errors)); // Capturar errores y establecer en el estado
  };

  if (!pet) {
    return <div>Loading...</div>;
  }
  const goHome = () => {
    navigate('/');
  };
  return (
    <div>
      <div className='atras'>
        <button className="back-button" onClick={goHome}>Volver a inicio</button>
      </div>
      <h1>Refugio de Mascotas</h1>
      <div className="edit-pet-container">
        <h2>Editar perfil de  {pet.nombre}</h2>
        <FormularioMascota
          initialNombre={pet.nombre}
          initialTipo={pet.tipo}
          initialRaza={pet.raza}
          initialSexo={pet.sexo}
          initialEdad={pet.edad}
          initialOtrosDatos={pet.otrosDatos}
          initialEnAdopcion={pet.enAdopcion}
          onSubmitProp={updatePet}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default EditarMascota;
