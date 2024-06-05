import React, { useState } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// props viene de comments
function CommentItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [textareaInput, setTextareaInput] = useState(props.comment.comment);
  const navigate = useNavigate();
  console.log(props.comment.comment);

  const deleteComment = (id) => {
    service
      .delete(`/comments/${id}`)
      .then((response) => {
        console.log(response.data);
        // Actualizamos la lista de comentarios en el componente padre después de eliminar el comentario

        props.setData(props.comments.filter((comment) => comment._id !== id));
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  const saveComment = (id) => {
    service
      .patch(`/comments/${id}`, { comment: textareaInput })
      .then((response) => {
        console.log(response.data);
        // Actualizamos la lista de comentarios en el componente padre después de editar el comentario
        props.setData(response.data.comments);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="commentForm.ControlTextarea">
        {!isEditing ? (
          <>
            {" "}
            <p>{props.comment.comment}</p>
            <p> {props.comment.user.username}</p>
          </>
        ) : (
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setTextareaInput(e.target.value)}
            value={textareaInput}
          />
        )}
      </Form.Group>
      <div>
        {!isEditing ? (
          <Button
            variant="outline-primary"
            className="button-sinfondo"
            onClick={() => setIsEditing(true)}
          >
            🖊️
          </Button>
        ) : (
          <>
            <Button
              variant="outline-primary"
              className="button-sinfondo"
              onClick={() => saveComment(props.comment._id)}
            >
              💾
            </Button>
            <Button
              variant="outline-danger"
              className="button-sinfondo"
              onClick={() => setIsEditing(false)}
            >
              ❌
            </Button>
          </>
        )}
        <Button
          variant="outline-danger"
          className="button-sinfondo"
          onClick={() => deleteComment(props.comment._id)}
        >
          🗑️
        </Button>
      </div>
    </Form>
  );
}

export default CommentItem;
