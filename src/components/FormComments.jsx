import React, { useState } from "react";
import service from "../services/config.services";
import { Form  } from "react-bootstrap";
import { Button } from "react-bootstrap";

function FormComments(props) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      game: props.id, // Reemplaza con el ID del juego correspondiente
      comment: comment,
    };

    service
      .post("/comments", newComment)
      .then(() => {
        setComment("");
        props.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Añade un bonito comentario</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            
          />
        </Form.Group>
        <Button variant="secondary" type="submit">Submit</Button>
      </Form>
    </div>
  );
  
}
export default FormComments;
