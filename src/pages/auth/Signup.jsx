import React, { useState } from "react";
import { Form, Button, Col, Row, InputGroup, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      username: username,
    };

    try {
      // Hacemos las llamadas a nuestro servidor
      await service.post("/auth/signup", newUser).then((response) => {
        navigate("/games");
      });
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  return (
    <div className="registration-form-container">
      <div className="container mt-5">
        <h5>Formulario de Registro</h5>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form noValidate onSubmit={handleSignup}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombre de usuario"
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Contraseña"
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Correo Electrónico</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Correo Electrónico"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={handleEmailChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Button variant="secondary" type="submit">
            Registrarse
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
