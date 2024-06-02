import React from "react";

import github from "../assets/images/logotipo-de-github.png";
import Card from "react-bootstrap/Card";

function AboutPage() {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Oriol</Card.Title>

          <Card.Text>
            Oriol es un talentoso creador de juegos de mesa, conocido por su
            habilidad para diseñar experiencias estratégicas e inmersivas. Su
            enfoque innovador en la mecánica del juego y la narrativa temática
            ha capturado la atención de entusiastas de los juegos de mesa en
            todo el mundo. Con una pasión por la creatividad y un compromiso con
            la calidad, Oriol continúa elevando los estándares en la industria
            de los juegos de mesa.
          </Card.Text>
          <Card.Link to="/">
            <button className="button">Home</button>
          </Card.Link>
          <Card.Link
            to="https://github.com/RoigOriol/Urigames-client"
            target="_blank"
          >
            <img src={github} alt="GitHub" className="footer-image-left" />
          </Card.Link>
        </Card.Body>
      </Card>
      ;
    </div>
  );
}

export default AboutPage;
