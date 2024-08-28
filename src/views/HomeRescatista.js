import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/menu';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../estilos/HomeRescatista.css';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomeRescatista = () => {
  const [summary, setSummary] = useState({});
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/pets')
      .then(res => {
        const mascotas = res.data;
        const disponibles = mascotas.filter(pet => pet.disponible).length;
        const adoptadas = mascotas.length - disponibles;
        const likesPromedio = mascotas.reduce((acc, pet) => acc + pet.likes, 0) / mascotas.length;

        setSummary({
          totalMascotas: mascotas.length,
          disponibles,
          adoptadas,
          likesPromedio: likesPromedio.toFixed(2),
        });
        setPets(mascotas);
      })
      .catch(err => console.error(err));
  }, []);

  const data = {
    labels: ['Total', 'Disponibles', 'Adoptadas'],
    datasets: [
      {
        label: 'Cantidad de Mascotas',
        data: [summary.totalMascotas, summary.disponibles, summary.adoptadas],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estadísticas de Mascotas',
      },
    },
  };

  const crearmascota = () => {
    navigate('/pets/new');
  };

  const verperfil = () => {
    navigate('/PerfilRescatista');
  };

  return (
    <>
    <Menu></Menu>
    <div className="home-page body-registro fondo-registro">
      <div className="container">
        <div className="left-column">
          <div className="panel-resumen">
            <h2>Resumen</h2>
            <p>Total de Mascotas Registradas: {summary.totalMascotas}</p>
            <p>Mascotas Disponibles: {summary.disponibles}</p>
            <p>Mascotas Adoptadas: {summary.adoptadas}</p>
            <p>Likes Promedio: {summary.likesPromedio}</p>
          </div>

          <div className="estadisticas">
            <h2>Estadísticas</h2>
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="right-column">
          <div className="acceso-rapido">
            <h2>Acceso Rápido</h2>
            <button onClick={crearmascota}>
              Agregar Nueva Mascota
            </button>
            <button onClick={verperfil}>
              Mi perfil
            </button>
          </div>

          <div className="solicitudes">
            <h2>Solicitudes</h2>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeRescatista;
