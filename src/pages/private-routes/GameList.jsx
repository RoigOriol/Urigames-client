import React, { useState, useEffect } from "react";
import service from "../../services/config.services";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GameList() {
  const [games, setGames] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

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

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredGames =
    games && selectedGenre
      ? games.filter((game) => game.genre === selectedGenre)
      : games;

  return (
    <Container>
      <h3>Listado de juegos</h3>
      <Form.Select onChange={handleGenreChange} value={selectedGenre}>
        <option value="">Todos las categrias</option>
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
            <Col xs={12} md={2} lg={4}>
              <Link to={`/games/${game._id}`} key={game._id}>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <p>{game.genre}</p>
                <img src={game.image} alt={game.title} width="200" />
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default GameList;
