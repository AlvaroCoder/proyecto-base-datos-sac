"use client"
import React, { useState } from 'react'

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { BotonFormularioIngreso } from '..';

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

export default function FormElement() {

  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const [valuesForm, setValuesForm] = useState({
    username : "",
    password : ""
  });
  const handleChangeInput=(e)=>{
    const target=e.target;
    setValuesForm({
      ...valuesForm,
      [target.name]:target.value
    })
  }

  const handleChangeVisibilityPassword=()=>{
    setVisibilityPassword(!visibilityPassword);
  }
  return (
    <div className='p-8 rounded-xl max-w-[450px] w-full bg-guindaOpaco'>
      <form >
        <section className='mt-6'>
          <label htmlFor='username' className='text-white text-xl mb-4'>Nombre Usuario</label>
          <div className=' flex flex-row items-center justify-center bg-white rounded-lg px-4 py-2'>
            <PersonIcon
              className='text-guinda mr-2 '

            />
            <input
              className="w-full p-2 bg-transparent outline-none shadow-none text-guinda border-none rounded-none border-b-2"
              value={valuesForm.username}
              name="username"
              onChange={handleChangeInput}
            />
          </div>
        </section>
        <section className='mt-6'>
          <label htmlFor='password' className='text-white text-xl mb-4'>Contraseña</label>
          <div className='flex flex-row items-center justify-center bg-white rounded-lg px-4 py-2'>
            <LockIcon
            className='text-guinda mr-2'
            />
            <input
              type={visibilityPassword ? 'text' : 'password'}
              className="w-full p-2 bg-transparent outline-none shadow-none text-guinda border-none rounded-none border-b-2"
              value={valuesForm.password}
              name="password"
              onChange={handleChangeInput}
            />
            {
              visibilityPassword ?<p onClick={handleChangeVisibilityPassword} > <VisibilityOffIcon className='text-guinda'/></p> : <p onClick={handleChangeVisibilityPassword}><RemoveRedEyeIcon className='text-guinda'/></p>
            }
          </div>
        </section>
        <BotonFormularioIngreso 
          href={"/dashboard/libros"}
          valuesForm={valuesForm}
        >
          Ingresar
        </BotonFormularioIngreso>
      </form>
    </div>
  )
}
