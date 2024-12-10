

import React from 'react'

import PersonIcon from '@mui/icons-material/Person';

export default function DialogDeleteProyectos({
    project,
    coordinator,
    year_start,
    year_end,
    status
}) {
  return (
    <section className='w-full px-8 my-4'>
      <h1 className='font-bold'>Proyecto</h1>
      <p>"{project}"</p>
      <h1 className='font-bold'>Coordinador</h1>
      <p><PersonIcon/> {coordinator}</p>
      <h1 className='font-bold'>Estado</h1>
      <p>{status}</p>
      <section className='flex flex-row items-center'>
        <div className='flex-1'>
          <h1 className='font-bold'>Fecha de Inicio</h1>
          <p>{year_start}</p>
        </div>
        <div className='flex-1'>
          <h1 className='font-bold'>Fecha de Fin</h1>
          <p>{year_end}</p>
        </div>
      </section>
    </section>
  )
}
