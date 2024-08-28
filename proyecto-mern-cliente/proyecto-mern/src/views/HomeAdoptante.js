import axios from 'axios';
import { useEffect, useState } from 'react';
import Menu from '../components/MenuAdoptante';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/resgistro.css';
import PerroImg from "../assents/perro.png";
import GatoImg from "../assents/gato.png";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import '../App.css'; // Asegúrate de tener este archivo CSS para los estilos
import '../estilos/tarjetas.css';
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

  //<p><strong>OBS: </strong> {pet.otrosDatos}</p>
  //<p><strong>Likes: </strong> {pet.likes}</p>
  return (
    <>
    <Menu></Menu>
    
    <div className="home-page body-registro gradient-custom-2">
      <div>
      <h1 style={{ color: 'white', textAlign: 'center' }}> Mascotas en adopción</h1>
      <div className="pet-cards-container">
        {pets.length > 0 ? (
          pets.map(pet => (
            <div
              key={pet._id}
              className="pet-card"
              onClick={() => handleCardClick(pet._id)} // Maneja el clic en la tarjeta
            >
              <img  src={pet.tipo === 'gato' ? GatoImg : PerroImg}  className="pet-image"alt="Logo" />
              <h2>{pet.nombre}</h2>
              <p>Es un/a  {pet.tipo} {pet.sexo} {pet.raza} de  {pet.edad} años de edad.</p>
   
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

export default HomeAdoptante;
