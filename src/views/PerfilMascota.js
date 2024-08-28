import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/menu';

import { useNavigate, useParams } from 'react-router-dom';

const PerfilMascota = ({agregarAFavoritos}) => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const adoptPet = () => {
    axios.delete(`http://localhost:8000/api/pets/${id}`)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  const likePet = () => {
    axios.put(`http://localhost:8000/api/pets/${id}/like`)
      .then(res => {
        setLikes(likes + 1);
        setIsLiked(true);
      })
      .catch(err => console.error(err));
  };

  const goHome = () => {
    navigate('/');
  };

const añadirAFavoritos = ()=>{
     agregarAFavoritos(pet);
     navigate('/HomeAdoptante')
}

  return (
    <div>
      <div className='atras'>
        <button className="back-button" onClick={goHome}>Volver a inicio</button>

      </div>

      <div className="pet-detail-container">

        <div className="pet-detail-header">
          <h2>Perfil de {pet.nombre}</h2>
        </div>

        <div className="pet-info">
          <div>
            <p><strong>Tipo de mascota:</strong> {pet.tipo}</p>
            <p><strong>Raza:</strong> {pet.raza}</p>
            <p><strong>Edad:</strong> {pet.edad} años</p>
            <p><strong>Sexo:</strong> {pet.sexo}</p>
          </div>
          <div>
            <p><strong>Otros Datos:</strong> {pet.otrosDatos}</p>
            <p><strong>En adopción:</strong> {pet.enAdopcion ? 'Sí' : 'No'}</p>
          </div>
        </div>

        <div className="pet-actions">
          <button className="btn-adopt" onClick={adoptPet}>Adoptar {pet.nombre}</button>
          <button className="btn-like" onClick={likePet} disabled={isLiked}>Like {pet.nombre}</button>
          <button onClick={añadirAFavoritos}> Añadir a favorito </button> 
          <p>{likes} like(s)</p>
        </div>
      </div>
    </div>

  );
};
export default PerfilMascota;
