import axios from 'axios';
import { useEffect, useState } from 'react';
import Menu from '../components/menu';

import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import '../App.css'; // Asegúrate de tener este archivo CSS para los estilos

const HomeAdoptante = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate(); // Usa el hook useNavigate para redirigir

  useEffect(() => {
    axios.get('http://localhost:8000/api/pets')
      .then(response => {
        setPets(response.data);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/pets/${id}`); // Redirige al perfil de la mascota
  };

  return (
    <>
    <Menu></Menu>
    <div className="home-page">
      <h1>Lista de Mascotas</h1>
      <div className="pet-cards-container">
        {pets.length > 0 ? (
          pets.map(pet => (
            <div
              key={pet._id}
              className="pet-card"
              onClick={() => handleCardClick(pet._id)} // Maneja el clic en la tarjeta
            >
              <h2>{pet.nombre}</h2>
              <p><strong>Tipo:</strong> {pet.tipo}</p>
              <p><strong>Raza:</strong> {pet.raza}</p>
              <p><strong>Edad:</strong> {pet.edad} años</p>
              <p><strong>Sexo:</strong> {pet.sexo}</p>
              <p><strong>Otros Datos:</strong> {pet.otrosDatos}</p>
              <p><strong>Likes:</strong> {pet.likes}</p>
            </div>
          ))
        ) : (
          <p>No hay mascotas disponibles</p>
        )}
      </div>
    </div>
    </>
  );
};

export default HomeAdoptante;
