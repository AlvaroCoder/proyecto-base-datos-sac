import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

export default function DialogDeletePapers({
  title,
  link,
  year,
  members=[],
  id
}) {
  return (
    <section className='w-full px-8 my-4'>
      <h1 className='font-bold'>Titulo: </h1>
      <p>{title}</p>
      <h1 className='font-bold'>Link</h1>
      <a href={link} target='_blank' className='text-guinda underline cursor-pointer'>Link del archivo</a>
      <h1 className='font-bold'>Año</h1>
      <p>{year}</p>
      <h1 className='font-bold'>Miembros</h1>
      <ul>
        {
          members?.map((item, key)=><li key={key}><PersonIcon/><span>{item?.first_name} {item?.last_name}</span></li>)
        }
      </ul>
    </section>
  )
}
