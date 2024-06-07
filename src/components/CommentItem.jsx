import React, { useState } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
// props viene de comments
function CommentItem(props) {
  const {isLoggedIn, loggedUserId } =
  useContext(AuthContext);


  const navigate = useNavigate();
  console.log(props.comment.comment);

  const deleteComment = (id) => {
    service
      .delete(`/comments/${id}`)
      .then((response) => {
        console.log(response.data);
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
      <div style={{ marginTop: '50px' }}>
        <h5>Comentarios:</h5>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: '1' }}>
          <p><strong> Usuario: {props.comment.user.username}</strong></p>
          <p>{props.comment.comment} </p>
        </div>
        {isLoggedIn && loggedUserId === props.comment.user._id && (
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none"
            }}
            onClick={() => deleteComment(props.comment._id)}
          >
            🗑️
          </Button>
        )}
      </div>
    </Form.Group>
  </Form>
  
  );
}

export default CommentItem;
