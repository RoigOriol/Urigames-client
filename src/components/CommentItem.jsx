import React, { useState } from "react";
import service from "../../services/config.services";
import { useNavigate } from "react-router-dom";

function CommentItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [textareaInput, setTextareaInput] = useState(props.comment.comment);
  const navigate = useNavigate();
  console.log(props.comment);

  const deleteComment = (id) => {
    service
      .delete(`/comment/${id}`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  const saveComment = (id) => {
    service
      .patch(`/comment/${id}`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <div>
      {!isEditing ? (
        <p>{props.comment.comment}</p>
      ) : (
        <textarea
          onChange={(e) => setTextareaInput(e.target.value)}
          value={textareaInput}
        />
      )}
      {!isEditing ? (
        <button className="button-sinfondo" onClick={() => setIsEditing(true)}>
          🖊️
        </button>
      ) : (
        <>
          <button
            className="button-sinfondo"
            onClick={() => saveComment(props.comment.id)}
          >
            💾
          </button>
          <button
            className="button-sinfondo"
            onClick={() => setIsEditing(false)}
          >
            ❌
          </button>
        </>
      )}
      <button
        className="button-sinfondo"
        onClick={() => deleteComment(props.comment.id)}
      >
        🗑️
      </button>
    </div>
  );
}

export default CommentItem;
