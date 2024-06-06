import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <h1>
            No cometas un error, <br /> sigue jugando...
          </h1>
        </div>
        <div>
          <img
            src="./images/error-logo.png"
            style={{ height: "400px" }}
            alt="error-logo"
          />
        </div>
      </div>
      <Link to="/games" style={{ marginTop: "20px" }}>
        <Button variant="primary">Volver</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
