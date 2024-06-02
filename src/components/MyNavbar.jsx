import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo-page.png";
import { AuthContext } from "../context/auth.context";

function MyNavbar() {
  const { authenticateUser, isLoggedIn, isAdmin, loggedUserId } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 1. Remover el token de localstorage
    localStorage.removeItem("authToken");

    // 2. Cambiar los estados del contexto
    await authenticateUser(); // Esto va a forzar que el token sea valido y cambiar los estados

    // 3. Redireccionar al usuario a algún lugar público
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="bg-body-tertiary">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" width={80} />
        </Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-secondary">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="games">
                  Listado de juegos
                </Nav.Link>
                <Nav.Link as={Link} to={`/user/${loggedUserId}`}>
                  Perfil
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            )}
            {isAdmin && <Nav.Link disabled>Eres administrador</Nav.Link>}
          </Nav>
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
