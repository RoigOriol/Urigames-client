import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import service from "../../services/config.services";

function GameDetails() {
  //tenemos que coegher use params para obtener la id del juego específico
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState({});

  useEffect(() => {
    service
      .get(`/game/${id}`)
      .then((response) => {
        setGameDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
