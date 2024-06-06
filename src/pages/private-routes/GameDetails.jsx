import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import service from "../../services/config.services";
import { Nav, Spinner } from "react-bootstrap";
import Comment from "../../components/Comment";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormComments from "../../components/FormComments";
import { AuthContext } from "../../context/auth.context";

function GameDetails() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [gameCollectionList, setGameCollectionList] = useState();

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

  const handleAddToCollection  = async () => {
    try {
      const response = await service.patch(`/user/${id}/collections`) 
      
      console.log(response)
      
     
     // navigate("/games"); //! @TODO navegar a user profile?? games? mirar

    
    } catch (error) {
      
      //navigate("/error");
    }
  };

  const handleDeleteGame = async () => {
    try {
      await service.delete(`/game/${id}`);
      navigate("/games");
    } catch (error) {
      console.log(error);
      navigate("/error");
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
          </Card.Title>
          {isAdmin && (
            <>
              <Nav.Link as={Link} to={`/games/${id}/edit`}>
                <Button variant="success ">Editar juego</Button>
              </Nav.Link>
              <Nav.Link as={Link} to={`/games/${id}/edit`}>
                <Button variant="danger" onClick={handleDeleteGame}>
                  Eliminar juego
                </Button>
              </Nav.Link>
            </>
          )}
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
          <div>
            <Button variant="light" onClick={handleAddToCollection}>
           add
            </Button>

          
          </div>
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
            <strong>Play time:</strong> {gameDetails.playTime} min.
          </Card.Text>
          
          <Comment comments={comments} getData={fetchComments} />
          <FormComments getData={fetchComments} id={id} />
        </Card.Body>
      </Card>
      <Link to="/games" style={{ marginTop: "20px" }}>
        <Button variant="secondary">Volver</Button>
      </Link>
    </div>
  );
}

export default GameDetails;
