import React, { useState, navigate, useContext } from "react";
import service from "../../services/config.services";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import { themeContext } from "../../context/theme.context";

function GameCreation() {
  const { authenticateUser, isLoggedIn, isAdmin, loggedUserId } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [designer, setDesigner] = useState("");
  const [genre, setGenre] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [minPlayers, setMinPlayers] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [image, setImage] = useState("");
  const { handleToggleTheme } = useContext(themeContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Crea<mos el juego
    const newGame = {
      title: title,
      designer: designer,
      genre: genre,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
      description: description,
      image: image,
      playTime: playTime,
    };

    // Hacemos la pewtición al servidor
    service
      .post("/", newGame)
      .then(() => {
        console.log("Juego creado correctamente");
        navigate("/games");
      })
      .catch((error) => {
        console.log(error);
        navigate("/error"); // vamos a la página de games
      });

    // Actualizamos los estados del formulario

    setTitle("");
    setImage("");
    setDescription("");
    setDesigner("");
    setGenre("");
    setMaxPlayers("");
    setMinPlayers("");
    setPlayTime("");
    //props.getData(); no se cecesita
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <h2 className="text-center mb-4">Crea tu juego</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="String"
                placeholder="Titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="String"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Diseñador@</Form.Label>
            <Form.Control
              type="String"
              placeholder="Diseñador@"
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Género</Form.Label>
            <Form.Control
              type="String"
              placeholder="Género"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Máx. jugadores</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Máx. jugadores"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Min. jugadores</Form.Label>
              <Form.Control placeholder="Min. jugadores" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Tiempo estimado de juego</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Minutos"
                value={minPlayers}
                onChange={(e) => setMinPlayers(e.target.value)}
              />
            </Form.Group>
          </Row>

          <div className="text-center">
            {" "}
            <Link to={"/games"}>
              <Button variant="primary" type="submit">
                Crear
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default GameCreation;
