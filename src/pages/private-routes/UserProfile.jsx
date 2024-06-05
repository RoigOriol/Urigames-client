import React, { useState, useEffect } from "react";
import service from "../../services/config.services";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Spinner } from "react-bootstrap/esm";

//! FUNCION asincrona como game details
function UserProfile() {
  // Define el estado para almacenar los datos del usuario
  const [user, setUser] = useState(null);
  // Define el estado para almacenar el usuario seleccionado (si es necesario)
  const [selectedUser, setSelectedUser] = useState("");
  console.log(user); // Registra los datos del usuario en la consola
  // Obtiene la función de navegación de React Router
  const navigate = useNavigate();

  // Efecto para obtener los datos del usuario cuando el componente se monta
  useEffect(() => {
    service
      .get("/user") // Realiza una solicitud GET al servidor para obtener los datos del usuario
      .then((response) => {
        setUser(response.data); // Actualiza el estado con los datos del usuario recibidos
      })
      .catch((error) => {
        console.log(err); // Registra cualquier error en la consola
        navigate("/error"); // Redirige a la página de error en caso de error
      });
  }, []);

  // Función para gestionar los cambios en el tipo de usuario seleccionado (si es necesario)
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  // Renderiza un spinner de carga si los datos del usuario aún no se han cargado
  if (user === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <h1>UserProfile</h1>

      {/* Formulario para editar los datos del usuario */}
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UserProfile;
