import React from 'react'

export default function DialogDeleteEquipos({
    equipment,
    location,
    type
}) {
  return (
    <section className='w-full px-8 my-4'>
        <h1 className='font-bold'>Equipo: </h1>
        <p>{equipment}</p>
        <h1 className='font-bold'>Ubicación:</h1>
        <p>{location?.value}</p>
        <h1 className='font-bold'>Tipo:</h1>
        <p>{type}</p>
    </section>
  )
};