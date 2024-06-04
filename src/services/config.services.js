import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // la base de todas las llamadas al backend con el /api
});

// nos permite interceptar la llamada justa antes de salir (de client a servder) para añadirle el token
service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default service;
