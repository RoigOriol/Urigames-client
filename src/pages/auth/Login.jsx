import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";
import MyNavbar from '../../components/MyNavbar';

function Login() {

  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: email,
      password: password
    };

    try {
      const response = await service.post("/auth/login", userCredentials); // ya no utlizamos axios pk llmamos al service
      console.log(response);

      // almacenamos el token en localstorage
      localStorage.setItem("authToken", response.data.authToken);

      // validamos el token y actualizamos los estados
      authenticateUser();

      // redireccionar a una pagina privada
      navigate("/private-page-example");

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      // aquí debería ir navegación a una página de error
    }
  };

  return (
    <div>
    
     

      
   
    <div>

      
      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
    </div>
    
    </div>
  );
}

export default Login;
