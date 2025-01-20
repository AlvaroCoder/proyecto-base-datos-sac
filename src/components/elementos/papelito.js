import React, { useEffect } from 'react'

export default function papelito() {
    useEffect(()=>{
        async function getData() {
            const response = await fetch();
            if (!response.ok) {
                alert("Error");
                return;
            }
            // JSON de respuesta
            const responseJSON = await response.json();
            console.log(responseJSON);
            
        }
        getData()
    },[])
  return (
    <div>papelito</div>
  )
}
