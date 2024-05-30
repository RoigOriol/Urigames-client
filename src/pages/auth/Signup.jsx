import React from 'react';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import service from '../../services/config.services';
function Signup() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
  
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);

    const handleSignup = async (e) => {
        e.preventDefault();
    
        // ... contactar al backend para registrar al usuario aqui
    
        const newUser = {
          email: email,
          password: password,
          username: username
        }
    
        try {
      
            // await axios.post("http://localhost:5005/api/auth/signup", newUser) ya no utlizamos axios pk llmamos al service

            //hacemos las llamadas a nuestro servidor
            await service.post("/auth/signup", newUser)
            
            navigate("/login")
      
          } catch (error) {
            console.log(error)
            if(error.response.status === 400) {
              setErrorMessage(error.response.data.errorMessage)
            }
            // aqui deberia ir navegación a una pagina de error
          }
      
        };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div>

    <h1>Formulario de Registro</h1>
  
    <form onSubmit={handleSignup}>

      <label>Correo Electronico:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />

      <br />

      <label>Nombre de usuario: </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
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

        <button type="submit">Registrar</button>

        {errorMessage && <p>{errorMessage}</p>}

        </form>

       








    {/*<Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Button type="submit">Sign up</Button>
  </Form>*/}
    </div>
  );
}

export default Signup;
