import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-page.png";

function Home() {
  return (
    <div className="home-container">
      <Link to="/games">
        <img src={logo} alt="logo" className="img-fluid" />
      </Link>
    </div>
  );
}

export default Home;
