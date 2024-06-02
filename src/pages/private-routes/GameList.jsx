import React, { useState, useEffect } from "react";
import service from "../../services/config.services";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
function GameList() {
  const [games, setGames] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

  // useEffect para llamar a la API
  useEffect(() => {
    service
      .get("/game")
      .then((response) => {
        setGames(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Función para manejar el cambio de género seleccionado en el formulario
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Filtramos por género
  const filteredGames =
    games && selectedGenre
      ? games.filter((game) => game.genre === selectedGenre)
      : games;

  return (
    <Container>
      <h3>Listado de juegos</h3>
      <Form.Select onChange={handleGenreChange} value={selectedGenre}>
        <option value="">Todos los juegos</option>
        {games &&
          games.map((game, index) => (
            <option key={index} value={game.genre}>
              {game.genre}
            </option>
          ))}
      </Form.Select>

      <Row>
        {filteredGames &&
          filteredGames.length > 0 &&
          filteredGames.map((game) => (
            <Col xs={12} md={6} lg={4} key={game._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={game.image}
                  alt={game.title}
                  width="100px"
                />
                <Card.Body>
                  <Card.Title>
                    <h3>{game.title}</h3>
                  </Card.Title>
                  <Card.Text>
                    <p>{game.description}</p>
                    <p>{game.genre}</p>
                  </Card.Text>
                  <Link to={`/games/${game._id}`}>
                    <Button variant="primary">Ficha del juego</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default GameList;
