//import axios from "axios";
import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";

// componente que comparte el contexto
const AuthContext = createContext();

// componete envoltorio
function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true); // estado de espera mientras se valida el usuario

  // ejemplo estado roles
  const [isAdmin, setIsAdmin] = useState(false);

  const authenticateUser = async () => {
    // llama a /verify, valida el token y actualiza los estados acorde.
    const authToken = localStorage.getItem("authToken");

    // clausula de guardia. Si el token no existe, se termina la funcion, no es necesario hacer la llamada

    if (!authToken) {
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAuthenticating(false);
      setIsAdmin(false);
      return;
    }

    try {
      // ya no utlizamos axios pk llmamos al service
      /*const response = await axios.get("http://localhost:5005/api/auth/verify", {
      headers: { authorization: `Bearer ${authToken}` }             
       })*/

      const response = await service.get("/auth/verify");
      console.log(response.data.payload);

      // el token es valido
      setIsLoggedIn(true); // id del usuario que hace login
      setLoggedUserId(response.data.payload._id); //
      setIsAuthenticating(false);

      // condicional de admin
      if (response.data.payload.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log(error);
      // el token no es valido o ha expirado
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAuthenticating(false);
      setIsAdmin(false);
    }
  };
  // aqui se passan todos loes estados que afecta a toda la app
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    isAdmin, // ejemplo compartir en toda la app si el usuario es admin o no
  };
  // esto ocurre cuando TODA mi aplicación existe por primera vez. Cuando un usuario navega a la página ya sabe que esta registardo.
  useEffect(() => {
    authenticateUser();
  }, []);

  if (isAuthenticating === true) {
    //! esto podría ser un spinner o animación bien chula
    return <h3>... authenticando usuario</h3>;
  }

  // aplicación envuelta en todo contexto
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
