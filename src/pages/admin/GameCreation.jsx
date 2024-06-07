import React, { useState, useContext } from "react";
import service from "../../services/config.services";
import { useNavigate } from "react-router-dom";
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
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { handleToggleTheme } = useContext(themeContext);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);
      console.log(response);
      setImageUrl(response.data.imageUrl);

      setIsUploading(false); 
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGame = {
      title: title,
      designer: designer,
      genre: genre,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
      description: description,
      image: imageUrl,
      playTime: playTime,
    };

    
    try {
      await service.post("/game", newGame);
      console.log("Juego creado correctamente");
      navigate("/games");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }

    setTitle("");
    setImageUrl("");
    setDescription("");
    setDesigner("");
    setGenre("");
    setMaxPlayers("");
    setMinPlayers("");
    setPlayTime("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <h2 className="text-center mb-4">Crea tu juego</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Imagen:    </label>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </div>

          {isUploading ? <h2>... subiendo imagen</h2> : null}
      
          {imageUrl ? (
            <div>
              <img src={imageUrl} alt="img" width={200} />
            </div>
          ) : null}

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Diseñador@</Form.Label>
            <Form.Control
              type="text"
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Control
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Máx. jugadores</Form.Label>
              <Form.Control
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Min. jugadores</Form.Label>
              <Form.Control
                type="number"
                value={minPlayers}
                onChange={(e) => setMinPlayers(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Tiempo estimado de juego</Form.Label>
              <Form.Control
                type="number"
                placeholder="Minutos"
                value={playTime}
                onChange={(e) => setPlayTime(e.target.value)}
              />
            </Form.Group>
          </Row>

          <div className="text-center">
            <Button variant="secondary" type="submit">
              Crear
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default GameCreation;
