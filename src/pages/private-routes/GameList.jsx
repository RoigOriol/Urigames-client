import React, { useState, useEffect } from "react";
import service from "../../services/config.services";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import { Spinner } from "react-bootstrap/esm";

function GameList() {
  // Define el estado para almacenar la lista de juegos y el género seleccionado
  const [games, setGames] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    service
      .get("/game") // Realiza una solicitud GET al servidor para obtener la lista de juegos
      .then((response) => {
        setGames(response.data); // Actualiza el estado con la lista de juegos recibida
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredGames =
    games && selectedGenre
      ? games.filter((game) => game.genre === selectedGenre)
      : games;

  const uniqueGenres = games
    ? [...new Set(games.map((game) => game.genre))]
    : [];

  if (games === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div>
      <Container>
        <Form.Select
          style={{ marginBottom: "20px", marginTop: "20px" }}
          onChange={handleGenreChange}
          value={selectedGenre}
        >
          <option value="">Juegos por género</option>
          {uniqueGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>

        <Row>
          {filteredGames &&
            filteredGames.length > 0 &&
            filteredGames.map((game) => (
              <Col
                xs={12}
                md={6}
                lg={4}
                key={game._id}
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <Card style={{ width: "100%" }}>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "50%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={game.image}
                      alt={game.title}
                      style={{
                                                maxWidth: "45%",
                        marginTop: "20px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title>
                      <h3    style={{
                       marginTop: "10px",
                       
                      }}>{game.title}</h3>
                    </Card.Title>
                    <Card.Text style={{ textAlign: 'left' }}>
                      <p>{game.description}</p>
                    </Card.Text>
                    <Link to={`/games/${game._id}`}>
                      <Button variant="secondary">Ficha del juego</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default GameList;


