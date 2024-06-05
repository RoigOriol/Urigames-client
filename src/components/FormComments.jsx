import React, { useState } from "react";
import service from "../services/config.services";

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
      <h5>Add Comment</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormComments;
