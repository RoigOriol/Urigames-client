import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import service from "../../services/config.services";
import { Spinner } from "react-bootstrap/esm";
function GameDetails() {
  //tenemos que coegher use params para obtener la id del juego específico
  //const { id } = useParams();
  const params = useParams();
  const [gameDetails, setGameDetails] = useState({});

  useEffect(() => {
    service
      .get(`/game/${id}`)
      .then((response) => {
        console.log(response.data);
        setGameDetails(response.data);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  if (games === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <>
      //!poner boton volver
      <div>GamesDetails</div>
      <p>{game.image}</p>
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <p>{game.designer}</p>
      <p>{game.minPlayers}</p>
      <p>{game.maxPlayers}</p>
      <p>{game.playTime}</p>
    </>
  );
}

export default GameDetails;
