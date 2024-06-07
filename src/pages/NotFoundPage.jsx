import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-text">
          <h1>
            Juego no encontrado, <br /> sigue jugando...
          </h1>
        </div>
        <div className="error-image">
          <img
            src="./images/not-found-logo.png"
            alt="error-logo"
          />
        </div>
      </div>
      <Link to="/games" className="error-link">
        <Button variant="secondary">Volver</Button>
      </Link>
    </div>
  );
}


export default ErrorPage;
