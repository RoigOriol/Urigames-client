import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import service from "../../services/config.services";
import { Spinner } from "react-bootstrap";
//import FormComments from "../components/FormComments";

//import Comment from "../components/Comment";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function GameDetails() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [comments, setComments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    service
      .get(`/game/${id}`)
      .then((response) => {
        console.log(response.data);
        setGameDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, [id, navigate]);

  useEffect(() => {
    service
      .get(`/comment/${id}`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, [id, navigate]);
  console.log(comments);
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
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50%" }}
        ></div>
        <Card.Body>
          <Card.Title>
            <h1>{gameDetails.title}</h1>
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
          <Card.Text>
            <p>{gameDetails.description}</p>
            <p>
              <strong>Designer:</strong> {gameDetails.designer}
            </p>
            <p>
              <strong>Genre:</strong> {gameDetails.genre}
            </p>
            <p>
              <strong>Max. players:</strong> {gameDetails.maxPlayers}
            </p>
            <p>
              <strong>Min. players:</strong> {gameDetails.minPlayers}
            </p>
            <p>
              <strong>Play time:</strong> {gameDetails.playTime}
            </p>
          </Card.Text>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <Comment comment={comment} />
              </li>
            ))}{" "}
            //!COMPROBAR
            <p>
              gameId={id} getData={() => {}}
            </p>
          </ul>
        </Card.Body>
      </Card>
      <Link to="/games" style={{ marginTop: "20px" }}>
        <Button variant="primary">Volver</Button>
      </Link>
    </div>
  );
}

export default GameDetails;
