'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea';

export default function DialogTrabajos({
    dataDialog,
    setDataDialog : setDataDialogTrabajos
}) {
  console.log(dataDialog);
  const handleChangeInput=()=>{

  }
  
  return (
    <section>
      <div className='my-2'>
        <h1 className='font-semibold'>Titulo</h1>
        <Textarea
          name="title"
          value={dataDialog?.title}
          onChange={handleChangeInput}
        />
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Curso</h1>
        <Input
            name="course"
            value={dataDialog?.course}

          />
      </div>
      <div className='my-2'>
        <h1>Link</h1>
        <Input
          name="link"
          value={dataDialog?.link}
        />
      </div>
      <div className='my-2'>
        <h1>Año</h1>
        <Input
          name="year"
          value={dataDialog?.year}
        />
      </div>
    </section>
  )
}

