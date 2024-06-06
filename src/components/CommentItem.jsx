import React, { useState } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// props viene de comments
function CommentItem(props) {
  const navigate = useNavigate();
  console.log(props.comment.comment);

  const deleteComment = (id) => {
    service
      .delete(`/comments/${id}`)
      .then((response) => {
        console.log(response.data);
        // Actualizamos la lista de comentarios en el componente padre después de eliminar el comentario
        //! volver a pedir al sistema todos los comentarios sin incluir el que acabo de borrar
        //props.setData(props.comments.filter((comment) => comment._id !== id));
        props.getData();
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="commentForm.ControlTextarea">
        <>
          <p>{props.comment.comment}</p>
          <p> {props.comment.user.username}</p>
        </>
      </Form.Group>
      <Button
        variant="outline-danger"
        className="button-sinfondo"
        onClick={() => deleteComment(props.comment._id)}
      >
        🗑️
      </Button>
    </Form>
  );
}

export default CommentItem;
