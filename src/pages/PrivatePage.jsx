import React from 'react'
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import service from "../services/config.services"

function PrivatePage() {
    const [ data, setData ] = useState(null)

    useEffect(() => {
   // ya no utlizamos axios ni const authtoken   pk llmamos al service


       //const authToken = localStorage.getItem("authToken")
  
      

      // axios.get("http://localhost:5005/api/auth/private-route-example", {
      //   headers: { authorization: `Bearer ${authToken}` }
      // })
  
      service.get("/auth/private-route-example")
  
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {  
        console.log(error)
      })
  
    }, [])
  
    return (
      <div>
        
        <h3>Ejemplo de página privada</h3>
        <p>Solo usuarios que hayan validado credenciales deberian poder acceder</p>
  
      </div>
    )
  }
  

export default PrivatePage