import React, { useState } from 'react'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

function DropdownComponent({
  nameButton="",
  nameTitle="",
  listData=[]
}) {
  return(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        className="w-full border-input bg-transparent "
        variant="ghost"
        
      >
        {nameButton}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>
        {nameTitle}
      </DropdownMenuLabel>
      <DropdownMenuSeparator/>
      {
        listData.map((item)=>(
          <DropdownMenuCheckboxItem>{item?.name}</DropdownMenuCheckboxItem>
        ))
      }
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default function DialogCreateEquipos({
  dataLocations=[]
}) {
  const [dataDialog, setDataDialog] = useState({
    equipment : '',
    type : '',
    origin : '',
    date : '',

  });
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  const [isValidDate, setIsValidDate] = useState(true);

  const handleChangeInput=(evt)=>{
    const target = evt.target;
    if (target.name == "date") {
      const isCorrectDate = dateRegex.test(target.value);
      setIsValidDate(isCorrectDate);
      console.log(isCorrectDate);
      
    }
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }
  return (
    <div className='max-h-[400px] h-full overflow-auto py-2 px-2'>
      <div className='my-2'>
        <h1>Equipo</h1>
        <Input
          name="equipment"
          value={dataDialog.equipment}
          onChange={handleChangeInput}
          required
        />
      </div>
      <div className='my-2 relative'  >
        <h1>Tipo</h1>
        <Input
          name="type"
          value={dataDialog.type}
          onChange={handleChangeInput}
          required/>
      </div>
      <div className='my-2 relative'>
        <h1>Origen</h1>
        <Input
          name='origin'
          value={dataDialog.origin}
          onChange={handleChangeInput}
        />
      </div>
      <div className='my-2 relative'>
        <h1>Año de adquisición</h1>
        <Input
          name="date"
          placeholder="yyyy-mm-dd"
          onChange={handleChangeInput}
          value={dataDialog.date}
          className={!isValidDate ? "border-red-400" : ""}
        />
        {!isValidDate && (
          <p className='text-red-500 font-bold'>
            La fecha ingresada es incorrecta
          </p>
        )}
      </div>
      <div className='w-full flex flex-row items-center justify-center my-2'>
        <section className='flex-1'>
          <h1>Ubicacion</h1>
          <DropdownComponent
            nameButton='Ubicacion de los equipos'
            nameTitle='Ubicacion'
          />
        </section>
        <section className='flex-1 ml-2'>
          <h1>Estado</h1>
          <DropdownComponent
            nameButton='Estado actual'
            nameTitle='Estado'
          />
        </section>
      </div>
    </div>
  )
};