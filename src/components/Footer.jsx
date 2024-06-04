import React from "react";
import { Link } from "react-router-dom";
import github from "../assets/images/logotipo-de-github.png";
import about from "../assets/images/about-logo.png";
import { useContext } from "react";
import { themeContext } from "../context/theme.context";

function Footer() {
  const { isDarkTheme, handleToggleTheme } = useContext(themeContext);

  const handleSwitch = () => {
    handleToggleTheme();
  };

  return (
    <div
      className="bg-body-tertiary"
      style={{
        maxHeight: "100px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: isDarkTheme ? "dark" : "light",
      }}
      data-bs-theme={isDarkTheme ? "dark" : "light"}
    >
      <Link to="https://github.com/RoigOriol/Urigames-client" target="_blank">
        <img src={github} alt="GitHub" className="footer-image-left" />
      </Link>

      <Link to="/about">
        <img src={about} alt="About" className="footer-image-right" />
      </Link>
    </div>
  );
}

export default Footer;
