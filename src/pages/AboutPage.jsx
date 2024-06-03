import React from "react";
import github from "../assets/images/logotipo-de-github.png";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px", // Añade padding para asegurar que el contenido no esté pegado a los bordes en pantallas pequeñas
        boxSizing: "border-box", // Incluye el padding en el cálculo del ancho y alto
        flexDirection: "column", // Para que los elementos se apilen verticalmente
      }}
    >
      <img
        src="src/assets/images/about-logo.png"
        style={{ width: "250px" }}
        alt="about-logo"
      />
      <Card
        style={{
          maxWidth: "100%",
          width: "18rem",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Oriol
          </Card.Title>
          <Card.Text style={{ fontSize: "1rem", marginBottom: "20px" }}>
            Oriol es un talentoso creador de juegos de mesa, conocido por su
            habilidad para diseñar experiencias estratégicas e inmersivas. Su
            enfoque innovador en la mecánica del juego y la narrativa temática
            ha capturado la atención de entusiastas de los juegos de mesa en
            todo el mundo. Con una pasión por la creatividad y un compromiso con
            la calidad, Oriol continúa elevando los estándares en la industria
            de los juegos de mesa.
          </Card.Text>

          <a
            href="https://github.com/RoigOriol/Urigames-client"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center" }}
          >
            <img
              src={github}
              alt="GitHub"
              className="footer-image-left"
              style={{ width: "24px", height: "24px" }}
            />
          </a>
        </Card.Body>
      </Card>
      <Link to="/games" style={{ marginTop: "20px" }}>
        <Button variant="primary">Todos los juegos</Button>
      </Link>
    </div>
  );
}

export default AboutPage;
