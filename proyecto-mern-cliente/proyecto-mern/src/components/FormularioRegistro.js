
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/resgistro.css';

const FormularioRegistro = (props) => {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [rol, setRol] = useState("");
    const [estiloDeVida, setEstiloDeVida] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");


    const navegacion = useNavigate();

    const manejarCambio = (e) => {
        setRol(e.target.value);

    };

    const enviarFormularioRegistro = async (e) => {
        e.preventDefault();
        try {
            const nuevoUsuario = {
                nombre, apellido, edad, correo, contrasena, telefono, ciudad, rol, estiloDeVida
            }
            console.log("Enviando usuario:", nuevoUsuario);
            const URL = "http://localhost:8000/usuario/nuevo";
            const respuesta = await axios.post(URL, nuevoUsuario);
            props.actualizarListaUsuarios(respuesta.data);



            setNombre("");
            setApellido("");
            setEdad("");
            setCorreo("");
            setContrasena("");
            setTelefono("");
            setCiudad("");
            setRol("");
            setEstiloDeVida("");

            setMensaje("¡Bienvenido! Tu registro ha sido exitoso.");

            setTimeout(() => {
                navegacion("/");
            }, 4000);


        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                setError(error.response.statusText || "Error desconocido");
            } else {
                setError("Error al enviar el formulario. Por favor intenta nuevamente.");
            }
        }


    }


    return (
        <>
            <>
                <div className="body-registro fondo-registro" >
                    <div className="container-registro">
                        <h2 className="titulo-registro">Registrarse</h2>
                        <form className="form-registro" onSubmit={enviarFormularioRegistro}>
                            <div className="form-row">
                                <div className="form-group-registro">
                                    <input
                                        type="text"
                                        className="campo"
                                        id="nombre"
                                        name="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Nombre"
                                    />
                                </div>
                                <div className="form-group-registro">
                                    <input
                                        type="text"
                                        className="campo"
                                        id="apellido"
                                        name="apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        placeholder="Apellido"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group-registro">
                                    <input
                                        type="number"
                                        className="campo"
                                        id="edad"
                                        name="edad"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                        placeholder="Edad"
                                    />
                                </div>
                                <div className="form-group-registro">
                                    <input
                                        type="text"
                                        className="campo"
                                        id="correo"
                                        name="correo"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        placeholder="Correo"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group-registro">
                                    <input
                                        type="text"
                                        className="campo"
                                        id="telefono"
                                        name="telefono"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="Teléfono"
                                    />
                                </div>
                                <div className="form-group-registro">
                                    <input
                                        type="text"
                                        className="campo"
                                        id="ciudad"
                                        name="ciudad"
                                        value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}
                                        placeholder="Ciudad"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group-registro">
                                    <input
                                        type="password"
                                        className="campo"
                                        id="contrasena"
                                        name="contrasena"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        placeholder="Contraseña"
                                    />
                                </div>
                                <div className="form-group-registro">
                                    <input
                                        type="text"
                                        className="campo"
                                        id="estiloDeVida"
                                        name="estiloDeVida"
                                        value={estiloDeVida}
                                        onChange={(e) => setEstiloDeVida(e.target.value)}
                                        placeholder="Estilo de vida"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group-registro full-width">
                                    <select
                                        id="opciones"
                                        className="campo"
                                        value={rol}
                                        onChange={manejarCambio}
                                    >
                                        <option value="">Seleccione un Rol</option>
                                        <option value="Adoptante">Adoptante</option>
                                        <option value="Rescatista">Rescatista</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn-registrarse">Registrarse</button>
                            <div className="error-mensaje">{error}</div>
                            <div className="mensaje-exito">{mensaje}</div>
                        </form>
                    </div>
                </div>
            </>




        </>
    )
}

export default FormularioRegistro;

