import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import service from "../../services/config.services";

function GameDetails() {
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
      <p>id:{gameDetails.title}</p>
    </>
  );
}

export default GameDetails;
