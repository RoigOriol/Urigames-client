import React from "react";
import CommentItem from "../components/CommentItem";

//!@TODO REVISAR: Llamar al backend en lugar de obtener los comentarios desde props por su ID y renderizarlos.

// Registra los comentarios recibidos como props
function Comment(props) {
  // Registra los comentarios recibidos como props
  console.log(props.comments);

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
