import React, { useState, useEffect } from "react";
import service from "../../services/config.services";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Spinner } from "react-bootstrap/esm";

function UserProfile() {
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
    <div> 
   
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 style={{ marginBottom: '40px' }}>Perfil</h2>
      <Form className="w-100">
        <Row className="mb-3 justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group className="text-center text-md-start">
              <Form.Label>
                <strong>Nombre:</strong> {user.username}
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group className="text-center text-md-start">
              <Form.Label>
                <strong>Email:</strong> {user.email}
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group className="text-center text-md-start">
              <Form.Label>
                <strong>Juegos de mi colección:</strong> 
                {selectedUser.gameCollection && selectedUser.gameCollection.map((eachGame)=>{
      return <p key={eachGame._id}>{eachGame.title}</p>
    })}
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

    </Container>
    </div>
  );
}

export default UserProfile;
