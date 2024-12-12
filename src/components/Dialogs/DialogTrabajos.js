'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import _ from "lodash";

export default function DialogTrabajos({
    initialDataDialog,
    dataDialog : dataDialogTrabajos,
    setDataDialog : setDataDialogTrabajos,
    dataStatus : dataCourse =[],
    handleChangeExistChanges,
    handleChangeNotExistChanges
}) {  
  const handleChangeInput=(evt)=>{
    const target = evt.target;
    const newDataInput = {
      ...dataDialogTrabajos,
      [target.name] : target.value
    }
    setDataDialogTrabajos(newDataInput);
    const existChanges = _.isEqual(initialDataDialog, newDataInput);
    if (!existChanges) {
      handleChangeExistChanges();
    }else{
      handleChangeNotExistChanges();
    }
  }
  
  return (
    <section>
      <div className='my-2'>
        <h1 className='font-semibold'>Titulo</h1>
        <Textarea
          name="title"
          value={dataDialogTrabajos?.title}
          onChange={handleChangeInput}
        />
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Curso</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full border-gray-100 border-[1px] shadow-sm"
            >
              <span>{dataDialogTrabajos?.course}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {
              dataCourse.map((item,key)=>
              <DropdownMenuCheckboxItem
                key={key}
              >
                {item}
              </DropdownMenuCheckboxItem>)
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='my-2'>
        <h1>Link</h1>
        <Input
          name="link"
          value={dataDialogTrabajos?.link}
        />
      </div>
      <div className='my-2'>
        <h1>Año</h1>
        <Input
          name="year"
          value={dataDialogTrabajos?.year}
        />
      </div>
    </section>
  )
}

