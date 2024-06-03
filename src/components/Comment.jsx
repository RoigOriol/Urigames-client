import React from "react";
import CommentItem from "../components/CommentItem";

function Comment(props) {
  return (
    <div className="card-comments">
      {props.chats.map((comment, index) => (
        <CommentItem key={index} comment={comment} getData={props.getData} />
      ))}
    </div>
  );
}

export default Comment;
