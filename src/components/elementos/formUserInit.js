"use client"
import React, { useState } from 'react'

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { BotonFormularioIngreso } from '..';
import { validarCredenciales } from '@/app/utils/checkFormData';
import { login } from '@/authentication/lib';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

export default function FormElement() {
  const {toast} = useToast();
  const router = useRouter();
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  
  const [valuesForm, setValuesForm] = useState({
    username : "",
    password : ""
  });
  const [loading, setLoading] = useState(false);

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
  const handleSubmit=async (evt)=>{
    evt.preventDefault();
    setLoading(true)

    const dataValidaCredenciales = validarCredenciales(valuesForm);
    if (!dataValidaCredenciales.esValido) {
      setLoading(false)
      toast({
        title : "Error",
        variant : "destructive",
        description : dataValidaCredenciales.mensaje
      });
      return;
    }
    const response = await login(valuesForm);
    if (response.error) {
      toast({
        title : "Error",
        variant : "destructive",
        description : response?.message
      });
      setLoading(false)
      return
    }
    toast({
      title : "Exito",
      description : "Ingreso"
    });
    router.push("/dashboard");
    setLoading(false)
  }
  return (
    <div className='p-8 rounded-xl max-w-[450px] w-full bg-guindaOpaco'>
      <form onSubmit={handleSubmit} >
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
          <div className='flex-1 flex flex-row justify-center'>
          <BotonFormularioIngreso 
          href={"/dashboard/libros"}
          valuesForm={valuesForm}
          loading={loading}
        >
          Ingresar
        </BotonFormularioIngreso>
          </div>
      </form>
    </div>
  )
}
