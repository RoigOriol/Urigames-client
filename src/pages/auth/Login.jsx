import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar cambios en el campo de correo electrónico
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Función para manejar cambios en el campo de contraseña
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Función para manejar el evento de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      const response = await service.post("/auth/login", userCredentials);

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();

      // Redirigir al usuario a la página "/games" después de autenticarse
      navigate("/games"); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  return (
    <div className="registration-form-container">
      <div className="container mt-5">
        <h5>Formulario de Acceso</h5>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form noValidate onSubmit={handleLogin}>
          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="2">
              Correo Electrónico:
            </Form.Label>
            <Col sm="10">
              <Form.Control
              required
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
               required
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
