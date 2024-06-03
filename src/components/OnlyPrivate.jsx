import React from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

function OnlyPrivate(props) {
  // !estos components HOC solo se deben usar sobre paginas completas en App.jsx
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    // si el usuario está logeado, renderiza props.children
    <Navigate to="/games" />;
    return props.children;
  } else {
    // si no está logeado, redirecciona
    return <Navigate to="/login" />; // no podemos usar usenavigate aqui
  }
}

export default OnlyPrivate;
