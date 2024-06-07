import React from "react";
import github from "../assets/images/logotipo-de-github.png";
import Card from "react-bootstrap/Card";
import { Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { themeContext } from "../context/theme.context";
import { useContext } from "react";
import { Container } from "react-bootstrap";

function AboutPage() {
  const { isDarkTheme } = useContext(themeContext);
  return (
    <div className={isDarkTheme ? "darkTheme" : "lightTheme"}
     >
          <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        src="src/assets/images/about-logo.png"
        style={{ width: "200px",
        marginBottom: "10px"
         }}
        alt="about-logo"
        
      />
      <Card
        style={{
          maxWidth: "100%",
          width: "18rem",
          backgroundColor: "transparent",
          border: "none",
          marginBottom: "10px"
        }}
      >
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
              style={{ width: "40px"}}
            />
          </a>
       
      </Card>
      <Link to="/games" style={{ marginTop: "20px" }}>
        <Button variant="secondary">Todos los juegos</Button>
      </Link>
      </Container>
    </div>
  );
}

export default AboutPage;
