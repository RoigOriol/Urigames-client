import React, { useState, useEffect } from "react";
import service from "../../services/config.services";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Spinner } from "react-bootstrap/esm";
import { themeContext } from "../../context/theme.context";
import { useContext } from "react";

import { Link } from 'react-router-dom';
function UserProfile() {
  const { isDarkTheme } = useContext(themeContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    service
      .get(`/user/${id}`)
      .then((response) => {
        setUser(response.data);
        setSelectedUser(response.data);
       console.log(response) 
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  }, []);

  if (user === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className={isDarkTheme ? "darkTheme" : "lightTheme"}>
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h2 style={{ marginBottom: '40px' }}>Perfil</h2>
        <Form className="w-100">
          <Row className="mb-3 justify-content-center">
            <Col xs={12} md={6}>
              <Form.Group className="text-center text-md-start">
                <Form.Label>
                  <h5><strong>Nombre:</strong> {user.username}</h5>
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Col xs={12} md={6}>
              <Form.Group className="text-center text-md-start">
                <Form.Label>
                 <h5><strong>Email:</strong> {user.email}</h5> 
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Col xs={12} md={6}>
              <Form.Group className="text-center text-md-start">
              <Form.Label>
        <h5><strong>Juegos de mi colección:</strong></h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {selectedUser.gameCollection && selectedUser.gameCollection.map((eachGame) => (
          <Link key={eachGame._id} to={`/games/${eachGame._id}`} style={{ textDecoration: 'none' }}>
          <Card style={{ width: '18rem', margin: '20px auto', marginLeft: '15px', marginRight: '15px', textAlign: 'center' }}>
            <Card.Title style={{ marginTop: '15px' }}>{eachGame.title}</Card.Title>
            <Card.Img
              src={eachGame.image}
              alt={eachGame.title}
              style={{ width: '100px', height: 'auto', paddingBottom: '10px', margin: 'auto' }} 
            />
          </Card>
        </Link>
      ))}
    </div>
      </Form.Label>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}


export default UserProfile;
