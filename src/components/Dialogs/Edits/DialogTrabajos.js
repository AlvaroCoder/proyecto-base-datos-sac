'use client'
import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea';
import _ from "lodash";
import DropdownMenuComponent from '@/components/elementos/dropdownComponent';
import { ButtonCloseDialog } from '@/components';

export default function DialogTrabajos({
    initialDataDialog,
    setDataDialog : setDataDialogTrabajos,
    dataCourses=[],

}) {    
  const [dataTrabajos, setDataTrabajos] = useState({
    id : initialDataDialog.id,
    title : initialDataDialog?.title,
    course : initialDataDialog?.course,
    year : initialDataDialog?.year,
    link : initialDataDialog?.link
  });
  const handleChangeInput=(evt)=>{
    const target = evt.target;
   setDataTrabajos({
    ...dataTrabajos,
    [target.name] : target.value
   });
  }

  const handleClickSave=()=>{
    console.log(dataTrabajos);
    
  }
  return (
    <section>
      <div className='my-2'>
        <h1 className='font-semibold'>Titulo</h1>
        <Textarea
          name="title"
          value={dataTrabajos?.title}
          onChange={handleChangeInput}

        />
      </div>

      <div className='my-2'>
        <h1 className='font-bold'>Link</h1>
        <Input
          name="link"
          value={dataTrabajos?.link}
          onChange={handleChangeInput}
        />
      </div>
      <section className='flex flex-row items-center'>
        <div className='my-2 flex-1'>
          <h1 className='font-bold'>Año</h1>
          <Input
            name="year"
            value={dataTrabajos?.year}
            onChange={handleChangeInput}
          />
        </div>
        <div className='my-2 min-w-[100px] ml-2'>
          <h1 className='font-semibold'>Curso</h1>
          <DropdownMenuComponent
            data={dataCourses}
            initialValue={dataTrabajos?.course}
            changeData={(item)=>setDataTrabajos({
              ...dataTrabajos,
              course : item
            })}
          />
        </div>
      </section>
      <ButtonCloseDialog
        handleClickSave={handleClickSave}
      />
    </section>
  )
}

