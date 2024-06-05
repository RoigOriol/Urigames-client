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
  const { isAdmin } = useContext(AuthContext);
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [comments, setComments] = useState([]);

  //! FUNCION asincrona hablado Jorge
  const fetchComments = async () => {
    try {
      const response = await service.get(`/comments/game/${id}`);
      console.log(response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGameDetails = async () => {
    try {
      const response = await service.get(`/game/${id}`);
      setGameDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGameDetails();
    fetchComments();
  }, [id]);

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
            {isAdmin && (
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
