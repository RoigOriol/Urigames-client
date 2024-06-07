import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Se agrega useNavigate
import service from "../../services/config.services";
import { Form, Col, Row, Spinner, Button } from "react-bootstrap"; // Se importa Button de react-bootstrap

function GameEdition(props) {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [designer, setDesigner] = useState("");
  const [genre, setGenre] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [minPlayers, setMinPlayers] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [image, setImage] = useState("");

  
  const fetchGameDetails = async () => {
    try {
      const response = await service.get(`/game/${id}`);
      

      setTitle(response.data.title);
      setDescription(response.data.description);
      setImage(response.data.image);
      setDesigner(response.data.designer);
      setGenre(response.data.genre);
      setMaxPlayers(response.data.maxPlayers);
      setMinPlayers(response.data.minPlayers); 
      setPlayTime(response.data.playTime);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const editGame = {
      title: title,
      designer: designer,
      genre: genre,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
      description: description,
      image: image,
      playTime: playTime,
    };

    service
      .put(`/game/${id}`, editGame)
      .then(() => {
        console.log("Juego editado correctamente");
        navigate("/games");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchGameDetails(); 
  }, [id]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <h2 className="text-center mb-4">Edita un juego</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label>Título</Form.Label>{" "}
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" >
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Diseñador@</Form.Label>
            <Form.Control
              type="text"
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Género</Form.Label>
            <Form.Control
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
  <Col>
    <Form.Label>Máx. jugadores</Form.Label>
    <Form.Control
      type="number"
      value={maxPlayers}
      onChange={(e) => setMaxPlayers(e.target.value)}
    />
  </Col>

  <Col>
    <Form.Label>Min. jugadores</Form.Label>
    <Form.Control
      type="number"
      value={minPlayers}
      onChange={(e) => setMinPlayers(e.target.value)}
    />
  </Col>

  <Col>
    <Form.Label>Tiempo estimado de juego</Form.Label>
    <Form.Control
      type="number"
      value={playTime}
      onChange={(e) => setPlayTime(e.target.value)}
    />
  </Col>
</Row>
          <div className="text-center">
            <Button variant="secondary" type="submit">
              Editar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default GameEdition;
