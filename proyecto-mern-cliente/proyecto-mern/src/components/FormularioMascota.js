// components/FormularioMascota.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/resgistro.css';
import Menu from './menu';
import logo from "../assents/logo.png";

const FormularioMascota = ({ initialNombre = '', initialTipo = '', initialRaza = '', initialSexo = '', initialEdad = '', initialOtrosDatos = '', initialEnAdopcion = false, onSubmitProp, errors }) => {
  const [nombre, setNombre] = useState(initialNombre);
  const [tipo, setTipo] = useState(initialTipo);
  const [raza, setRaza] = useState(initialRaza);
  const [sexo, setSexo] = useState(initialSexo);
  const [edad, setEdad] = useState(initialEdad);
  const [otrosDatos, setOtrosDatos] = useState(initialOtrosDatos);
  const [enAdopcion, setEnAdopcion] = useState(initialEnAdopcion);
  

  const navigate = useNavigate();
  const addmascota = e => {
    e.preventDefault();

    onSubmitProp({ nombre, tipo, raza, sexo, edad, otrosDatos, enAdopcion });

  };

  const goHome = () => {
    navigate('/');
  };


  return (
    <>
    <Menu></Menu>
      <div className="body-registro gradient-custom-2">
        <div className="container-registro">
          <h2 className="titulo-registro">Agregar Mascota</h2>
          <form className="form-registro" onSubmit={addmascota}>
            <div className="form-row" >
              <div className="form-group-registro">
                <label>Nombre :</label><br />
                <input className="campo" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                {errors.nombre && <span className="error">{errors.nombre.message}</span>} {/* Mostrar mensaje de error */}
              </div>
              <div className="form-group-registro">
                <label>Tipo (gato/perro):</label><br />
                <input className="campo" type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                {errors.tipo && <span className="error">{errors.tipo.message}</span>} {/* Mostrar mensaje de error */}
              </div>
            </div>

            <div className="form-row" >
              <div className="form-group-registro">
                <label>Raza:</label><br />
                <input className="campo" type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
                {errors.raza && <span className="error">{errors.raza.message}</span>} {/* Mostrar mensaje de error */}
              </div>
              <div className="form-group-registro">
                <label>sexo:</label><br />
                <input className="campo" type="text" value={sexo} onChange={(e) => setSexo(e.target.value)} />
                {errors.sexo && <span className="error">{errors.sexo.message}</span>} {/* Mostrar mensaje de error */}
              </div>
            </div>



            <div className="form-row" >
              <div className="form-group-registro">
                <label>edad(meses):</label><br />
                <input className="campo" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
                {errors.edad && <span className="error">{errors.edad.message}</span>} {/* Mostrar mensaje de error */}
              </div>
              <div className="form-group-registro">
                <label>otros datos:</label><br />
                <input className="campo" type="text" value={otrosDatos} onChange={(e) => setOtrosDatos(e.target.value)} />
                {errors.otrosDatos && <span className="error">{errors.otrosDatos.message}</span>} {/* Mostrar mensaje de error */}
              </div>
            </div>


            <div className="form-row">
              <div className="form-group-registro full-width">
                <label>
                  <input
                    type="checkbox"
                    checked={enAdopcion}
                    onChange={(e) => setEnAdopcion(e.target.checked)}
                  />
                  <span style={{ marginLeft: "8px" }}>En Adopción</span>
                </label>
              </div>
            </div>
            <button className="btn-save" onClick={addmascota}>Guardar</button>

          </form>
        </div>
      </div>
    </>

  );
};
export default FormularioMascota;