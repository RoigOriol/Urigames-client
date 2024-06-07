import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo-page.png";
import { AuthContext } from "../context/auth.context";
import { themeContext } from "../context/theme.context";

function MyNavbar() {
  const { authenticateUser, isLoggedIn, isAdmin, loggedUserId } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const { isDarkTheme, handleToggleTheme } = useContext(themeContext);

  const handleSwitch = () => {
    handleToggleTheme();
  };

  const handleLogout = async () => {
        localStorage.removeItem("authToken");
      await authenticateUser(); 
      navigate("/games");
  };

  return (
    <Navbar
      expand="lg"
      bg={isDarkTheme ? "dark" : "light"}
      data-bs-theme={isDarkTheme ? "dark" : "light"}
      className="bg-body-tertiary"
    >
      <Container fluid className="bg-body-tertiary">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo-web-img" width={80} />
        </Navbar.Brand>
       
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
  className="me-auto my-2 my-lg-0"
  style={{ maxHeight: "100px" }}
  navbarScroll
><Nav.Link as={Link} to="games" className="nav-item">
        Listado de juegos
      </Nav.Link>
  {isLoggedIn && (
    <>
      
      <Nav.Link as={Link} to={`/user/${loggedUserId}`} className="nav-item">
        Perfil
      </Nav.Link>
      <Nav.Link as={Link} to={"/collaborators"} className="nav-item">
        Colaboradores
      </Nav.Link>
    </>
  )}
  {isAdmin && (
    <>
      <Nav.Link as={Link} to="games/create" className="nav-item">
        Crear juego
      </Nav.Link>
    </>
  )}
  {isLoggedIn && (
    <Nav.Link onClick={handleLogout} className="nav-item">
      Cerrar sesión
    </Nav.Link>
  )}
</Nav>
<Nav className="ms-auto">
  {!isLoggedIn && (
    <>
      <Nav.Link as={Link} to="/login" className="nav-item">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/signup" className="nav-item">
        Signup
      </Nav.Link>
    </>
  )}
</Nav>

        </Navbar.Collapse>
      </Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 15px 15px 15px",
        
        }}
      >
        ☀️
        <Form.Check type="switch" onClick={handleSwitch} />
        🌙
      </div>
    </Navbar>
  );
}

export default MyNavbar;
