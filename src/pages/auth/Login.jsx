import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";
import MyNavbar from "../../components/MyNavbar";

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
      password: password,
    };

    try {
      const response = await service.post("/auth/login", userCredentials); // ya no utilizamos axios porque llamamos al service
      console.log(response);

      // almacenamos el token en localstorage
      localStorage.setItem("authToken", response.data.authToken);

      // validamos el token y actualizamos los estados
      authenticateUser();

      // redireccionar a una pagina privada
      // navigate("/games");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      navigate("/error");
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
