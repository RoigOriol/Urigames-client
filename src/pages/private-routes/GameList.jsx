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
  const [games, setGames] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

  const navigate = useNavigate();
  // useEffect para llamar a la API, utulizamos service pk ya esta definido como axios en services
  useEffect(() => {
    service
      .get("/game")
      .then((response) => {
        setGames(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, []);

  // gestionamos el tipo de juego
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Filtramos por género
  const filteredGames =
    games && selectedGenre
      ? games.filter((game) => game.genre === selectedGenre)
      : games;

  /*const uniqueGenres = games ? [...new Set(games.map(game => game.genre))] : [];
      Desglosemos esta línea:
      games.map(game => game.genre): Esta parte del código crea un array con todos los géneros de los juegos.
      new Set(...): El Set se utiliza para eliminar los valores duplicados del array de géneros.
      [...new Set(...)]: El operador de propagación ... se usa para convertir el Set de nuevo en un array.
      games ? ... : []: Esto asegura que si games es null o undefined, uniqueGenres será un array vacío, evitando errores.*/

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
                        maxHeight: "50%",
                        maxWidth: "50%",
                        marginTop: "10px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <h3>{game.title}</h3>
                    </Card.Title>
                    <Card.Text>
                      <p>{game.description}</p>
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
    </div>
  );
}

export default GameList;
