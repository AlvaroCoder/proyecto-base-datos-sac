"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { useRouter } from 'next/router';

export default function FormElement() {


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
  const handleSubmit=()=>{
   
  }
  return (
    <div className='p-8 rounded-xl max-w-[450px] w-full bg-guindaOpaco'>
      <form onSubmit={handleSubmit}>
        <section className='my-4'>
          <label className='text-white text-xl mb-4'>Nombre Usuario</label>
          <div >

            <Input
              className="bg-transparent outline-none text-white"
              value={valuesForm.username}
              name="username"
              onChange={handleChangeInput}
            />
          </div>
        </section>
        <section className='my-4'>
          <label className='text-white text-xl mb-4'>Contraseña</label>
          <div >
            <Input
              className="bg-transparent outline-none text-white"
              type="password"
              value={valuesForm.password}
              name="password"
              onChange={handleChangeInput}
            />
          </div>
        </section>
        <Button
          className="bg-guinda w-full py-6 text-lg"
          type="submit"
        >Ingresar </Button>
      </form>
    </div>
  )
}
