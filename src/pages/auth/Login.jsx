import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";
import MyNavbar from "../../components/MyNavbar";

function Login() {
  const { authenticateUser } = useContext(AuthContext); // Importa la función para autenticar al usuario del contexto
  const navigate = useNavigate(); // Hook de navegación de React Router

  const [email, setEmail] = useState(""); // Estado para el campo de correo electrónico
  const [password, setPassword] = useState(""); // Estado para el campo de contraseña
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar mensajes de error

  // Función para manejar cambios en el campo de correo electrónico
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Función para manejar cambios en el campo de contraseña
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Función para manejar el evento de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      const response = await service.post("/auth/login", userCredentials); // Realiza una solicitud POST al servidor para iniciar sesión

      console.log(response); // Información sobre la respuesta del servidor

      // Almacena el token de autenticación en el localStorage del navegador
      localStorage.setItem("authToken", response.data.authToken);

      // Valida el token de autenticación y actualiza el estado de autenticación del usuario
      authenticateUser();

      // Redirige a una página privada
      // navigate("/games");
    } catch (error) {
      console.log(error); // Imprime cualquier error en la consola

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage); // Establece un mensaje de error si la solicitud falla
      }
      navigate("/error"); // Redirige a la página de error en caso de error
    }
  };

  return (
    <div className="registration-form-container">
      <div className="container mt-5">
        <h5>Formulario de Acceso</h5>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="2">
              Correo Electrónico:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Ingresa tu correo electrónico"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPassword">
            <Form.Label column sm="2">
              Contraseña:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Ingresa tu contraseña"
              />
            </Col>
          </Form.Group>

          <Button variant="secondary" type="submit">
            Acceder
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
