import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Menu from '../components/menu';
import PerroImg from "../assents/perro.png";
import GatoImg from "../assents/gato.png";
import '../estilos/perfilMascota.css';


const PerfilMascota = ({agregarAFavoritos}) => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Conectar con el servidor de socket.io
    const socketIo = io('http://localhost:8000');
    setSocket(socketIo);

    // Manejar las notificaciones de adopción
    socketIo.on('adoptionStatus', (data) => {
      setNotification(`Status de adopción: ${data.status}`);
    });

    // Obtener los detalles de la mascota
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => {
        setPet(res.data);
        setLikes(res.data.likes || 0); // Asegúrate de que `likes` se inicializa correctamente
      })
      .catch(err => console.error(err));

    // Cleanup en desmontaje del componente
    return () => {
      socketIo.disconnect();
    };
  }, [id]);

  const adoptPet = (event) => {
    event.preventDefault();
    // Emitir solicitud de adopción al servidor
    if (socket) {
      socket.emit('adoptionRequest', { petId: id });

      // Mostrar notificación de solicitud enviada
      setNotification('Solicitud de adopción enviada');
    } else {
      console.error('Socket not initialized');
    }
  

    // Opcional: Eliminar la mascota (esto puede depender de tu lógica)
    axios.delete(`http://localhost:8000/api/pets/${id}`)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  const likePet = (event) => {
    event.preventDefault();
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
  
  const añadirAFavoritos = (event)=>{
    event.preventDefault();
    agregarAFavoritos(pet);
    navigate('/HomeAdoptante')
}
  return (
    <>
      <Menu />
      <div className=" gradient-custom">
        <div className="container-registro">
          <form >
            <div >




              {/* Centrar el título principal */}
              <div className="titulo-container">
                <h2 className="titulo-registro">{`Perfil de ${pet.nombre}`}</h2>
              </div>

              {/* Alinear datos descriptivos e imagen a la izquierda */}
              <div className="descripcion-imagen-container">
                <div className="descripcion" >
                  <p className=' linea'><strong>Tipo de mascota:</strong> {pet.tipo}</p>
                  <p className=' linea'><strong>Raza:</strong> {pet.raza}</p>
                  <p className=' linea'><strong>Edad:</strong> {pet.edad} años</p>
                  <p className=' linea'><strong>Sexo:</strong> {pet.sexo}</p>
                  <p className=' linea'><strong>Otros Datos:</strong> {pet.otrosDatos}</p>
                  <p className=' linea'><strong>En adopción:</strong> {pet.enAdopcion ? 'Sí' : 'No'}</p>
                </div>

                <div className="imagen">
                  <img src={PerroImg} className="mascota-perfil" alt="Logo" />
                </div>
              </div>

              {/* Alinear botones a la izquierda */}
              <div className="panel-botones">
                <button className="btn-save" onClick={adoptPet}>Adoptar {pet.nombre}</button>
                <button className="btn-like" onClick={likePet} disabled={isLiked}>Like {pet.nombre}</button>
                <button onClick={añadirAFavoritos}> Añadir a favorito </button>
                <p>{likes} like(s)</p>
              </div>

              {/* Mostrar notificaciones si hay */}
              {notification && <p>{notification}</p>}
            </div>
          </form>
        </div>
      </div>
    </>

  );
};

export default PerfilMascota;
