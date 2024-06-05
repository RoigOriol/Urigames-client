import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/config.services";
import { Form, Col, Row, Spinner } from "react-bootstrap";

function GameEdition(props) {
  const { id } = useParams(); // Obtiene el parámetro de la URL
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Define estados para otros campos
  //! @TODO y asi con todos los campos

  // Función para obtener los detalles del juego

  const fetchGameDetails = async () => {
    try {
      const response = await service.get(`/game/${id}`); // Realiza una solicitud GET al servidor para obtener los detalles del juego
      setTitle(response.data.title); // Actualiza el estado del título con los datos del juego
      setDescription(response.data.description); // Actualiza el estado de la descripción con los datos del juego

      // asi para todos los campos
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const editGame = {
      title: title,
      /// asi para todos los estados
    };

    service
      .put(`/game/${id}`, editGame)
      .then(() => {
        // haces lo que quieras hacer, coll lanzar un mesaje que se han actulaizado los datos o redireccionarlte al detalle del juego
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchGameDetails(); // Obtiene los detalles del juego al montar el componente
  }, [id]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      GameEdition
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Row>
        // asi para todos los campos
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default GameEdition;
