import React from "react";
import CommentItem from "../components/CommentItem";


// Registra los comentarios recibidos como props
function Comment(props) {
  // Registra los comentarios recibidos como props
 

  return (
    <div>
      {props.comments && // Verifica si existen comentarios
        props.comments.length > 0 && // Verifica si hay al menos un comentario
        props.comments.map((comment, index) => (
          // Renderiza cada comentario utilizando el componente CommentItem
          <CommentItem key={index} comment={comment} getData={props.getData} />
        ))}
    </div>
  );
}

export default Comment;
