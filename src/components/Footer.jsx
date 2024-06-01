import React from "react";
import { Link } from "react-router-dom";
import github from "../assets/images/logotipo-de-github.png";
import about from "../assets/images/about-logo.png";

function Footer() {




  return (
    <div className="footer">
      <Link to="https://github.com/RoigOriol/Urigames-client" target="_blank">
        <img src={github} alt="GitHub" className="footer-image-left"  />
      </Link>

      <Link to="/about">
        <img src={about} alt="About" className="footer-image-right" />
      </Link>


    </div>
  );
}

export default Footer;
