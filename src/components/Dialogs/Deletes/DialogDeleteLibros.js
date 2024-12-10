import React from 'react'

import PersonIcon from '@mui/icons-material/Person';

export default function DialogDeleteLibros({
    title,
    location=[],
    status,
    authors=[]
}) {
  return (
    <section className='w-full px-8 my-4'>
        <h1 className='font-bold'>Titulo</h1>
        <p>{title}</p>
        <h1 className='font-bold'>Ubicación:</h1>
        {location && <p>{location[0]?.value}</p>}
        <h1 className='font-bold'>Autores</h1>
            <ul>
                {
                    authors?.map(author=><li 
                        key={author?.id} 
                        className='flex flex-row'
                    >
                        <PersonIcon/>
                        <span className='ml-4'>{author?.value}</span>
                    </li>)
                }
            </ul>
    </section>
  )
};