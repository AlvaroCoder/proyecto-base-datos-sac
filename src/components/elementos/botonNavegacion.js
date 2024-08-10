"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { handleAddCookie } from '../serverComp/addCookie';


function validarCredenciales(credenciales) {
    if (credenciales.username.trim() === '') {
        return {
            esValido: false,
            mensaje: "El nombre de usuario no puede estar vacío."
        };
    }
  
    if (credenciales.password.trim() === '') {
        return {
            esValido: false,
            mensaje: "La contraseña no puede estar vacía."
        };
    }
  
    return {
        esValido: true,
        mensaje: "Las credenciales son válidas."
    };
  }

export default function BotonNavegacion({href, valuesForm, children}) {
    const router = useRouter(); 
    const handleClick=async()=>{
        
        const existeError = validarCredenciales(valuesForm);
        if(!existeError.esValido) return alert(existeError.mensaje);
        console.log(valuesForm);
        await handleAddCookie(valuesForm.username, valuesForm.password);
        router.push(href);
    }
  return (
    <p onClick={handleClick} className='w-full cursor-pointer bg-guinda rounded-lg py-4 mt-4 text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'>
          {children}
    </p> 
  )
}
