import React from 'react'

export default function DialogDeleteTrabajos({
  title,
  link,
  year,
  course,  
}) {
  return (
    <section className='w-full px-8 my-4'>
      <h1 className='font-bold'>Titulo</h1>
      <p>{title}</p>
      <h1 className='font-bold'>Link</h1>
      <a href={link} target='_blank' className='cursor-pointer text-guinda underline'>Link del archivo</a>
      <section className='flex flex-row'>
        <div className='flex-1'>
        <h1 className='font-bold'>Curso</h1>
        <p>{course?.value}</p>
        </div>
        <div className='flex-1'>
        <h1 className='font-bold'>Año</h1>
        <p>{year}</p>
        </div>
      </section>
    </section>
  )
}
