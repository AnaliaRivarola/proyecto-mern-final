import Menu from './menu';
import React from 'react';
import { Link } from 'react-router-dom';
import PerroImg from "../assents/perro.png";
import GatoImg from "../assents/gato.png";
import { useNavigate } from 'react-router-dom';


const ListaFavoritos = ({ pets=[] }) => {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/pets/${id}`); // Redirige al perfil de la mascota
  };

  return (
    <>
    <div className="home-page body-registro gradient-custom-2">
      <div>
      <h1 style={{ color: 'white', textAlign: 'center' }}> Mascotas favoritas</h1>
      <div className="pet-cards-container">
        {pets.length > 0 ? (
          pets.map(pet => (
            <div
              key={pet._id}
              className="pet-card"
              onClick={() => handleCardClick(pet._id)} // Maneja el clic en la tarjeta
            >
              <img src={PerroImg} className="pet-image"alt="Logo" />
              <h2>{pet.nombre}</h2>
              <p>Es un/a  {pet.tipo} {pet.sexo} {pet.raza} de  {pet.edad} años de edad.</p>
              <p><strong>OBS: </strong> {pet.otrosDatos}</p>
              <p><strong>Likes: </strong> {pet.likes}</p>
            </div>
          ))
        ) : (
          <p>No hay mascotas disponibles</p>
        )}
      </div>
                </div>
    </div>
    </>
  );
};
export default ListaFavoritos;