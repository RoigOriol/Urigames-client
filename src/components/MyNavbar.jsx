import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo-page.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function MyNavbar() {

//aqui pasamos las funciones para de authcontext 
  const { authenticateUser, isLoggedIn, isAdmin } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {

    // 1. debemos remover el token de localstorage
    localStorage.removeItem("authToken")

    // 2. cambiar los estados del contexto
    await authenticateUser() // esto va a forzar que el el token sea valido y cambiar los estados

    // 3. redireccionar al usuario a algun lugar publico
    navigate("/login")

  }

  return (
    <nav>
    <Link to="/">Home</Link>

    {isLoggedIn === false && <>
      <Link to="/signup">Registro</Link>
      <Link to="/login">Acceso</Link>
    </>}

    {isLoggedIn === true && <>
      <Link to="/private-page-example">Ejemplo Privado</Link>
      <Link onClick={handleLogout}>Cerrar sesión</Link>
    </>}

    {isAdmin && <p>Eres administrador</p>}

  

    {/*<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" width={80} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Buscar juego" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/buscar/nombre">Nombre</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/buscar/categoria">Categoria</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
         
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>*/}
    </nav>
  );
}

export default MyNavbar;
