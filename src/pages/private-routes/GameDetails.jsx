import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../../services/config.services";
import { Nav, Spinner } from "react-bootstrap";
import Comment from "../../components/Comment";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormComments from "../../components/FormComments";
import { AuthContext } from "../../context/auth.context";

function GameDetails() {
  // Obtiene el estado de administrador del contexto de autenticación
  const { isAdmin } = useContext(AuthContext);
  // Obtiene el ID del juego de los parámetros de la URL
  const { id } = useParams();
  // Define el estado para almacenar los detalles del juego
  const [gameDetails, setGameDetails] = useState(null);
  // Define el estado para almacenar los comentarios del juego
  const [comments, setComments] = useState([]);

  //! FUNCION asincrona hablado Jorge
  // Función asincrónica para obtener los comentarios del juego
  const fetchComments = async () => {
    try {
      // Realiza una solicitud GET al servidor para obtener los comentarios del juego
      const response = await service.get(`/comments/game/${id}`);
      console.log(response.data); // Registra los comentarios recibidos del servidor en la consola
      setComments(response.data.comments); // Actualiza el estado de los comentarios con los comentarios recibidos
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
    }
  };

  // Función asincrónica para obtener los detalles del juego
  const fetchGameDetails = async () => {
    try {
      // Realiza una solicitud GET al servidor para obtener los detalles del juego
      const response = await service.get(`/game/${id}`);
      setGameDetails(response.data); // Actualiza el estado de los detalles del juego con los detalles recibidos
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
    }
  };

  // Efecto para cargar los detalles del juego y los comentarios cuando el ID del juego cambia
  useEffect(() => {
    fetchGameDetails(); // Llama a la función para obtener los detalles del juego
    fetchComments(); // Llama a la función para obtener los comentarios del juego
  }, [id]);

  // Renderiza un spinner de carga si los detalles del juego aún no se han cargado
  if (gameDetails === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "20px" }}
    >
      <Card style={{ width: "80%", maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title>
            <h1>{gameDetails.title}</h1>
            {isAdmin && ( // Si el usuario es administrador, muestra un enlace para editar el juego
              <Nav.Link as={Link} to={`/games/${id}/edit`}>
                <Button variant="primary ">Editar juego</Button>
              </Nav.Link>
            )}
          </Card.Title>
          <Card.Img
            variant="top"
            src={gameDetails.image}
            alt={gameDetails.title}
            style={{
              maxHeight: "50%",
              maxWidth: "50%",
              marginTop: "20px",
              marginBottom: "20px",
              objectFit: "contain",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <Card.Text>{gameDetails.description}</Card.Text>
          <Card.Text>
            <strong>Designer:</strong> {gameDetails.designer}
          </Card.Text>
          <Card.Text>
            <strong>Genre:</strong> {gameDetails.genre}
          </Card.Text>
          <Card.Text>
            <strong>Max. players:</strong> {gameDetails.maxPlayers}
          </Card.Text>
          <Card.Text>
            <strong>Min. players:</strong> {gameDetails.minPlayers}
          </Card.Text>
          <Card.Text>
            <strong>Play time:</strong> {gameDetails.playTime}
          </Card.Text>
          <h3>Comments</h3>

          <Comment comments={comments} getData={fetchComments} />
          <FormComments getData={fetchComments} id={id} />
        </Card.Body>
      </Card>
      <Link to="/games" style={{ marginTop: "20px" }}>
        <Button variant="primary">Volver</Button>
      </Link>
    </div>
  );
}

export default GameDetails;
