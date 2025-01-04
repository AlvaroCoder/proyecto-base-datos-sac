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
  const [showFormComentario, setShowFormComentario] = useState(false);

  // Funcion de cambiar valor de Input
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
  // Funcion aparecer formulario de Comentario
  const handleChangeFormAuthor=()=>{
    setShowFormComentario(!showFormComentario);
  }
  return (
    <div className='max-h-[400px] h-full overflow-auto py-2 px-2'>
      <div className='my-2'>
        <h1 className='font-bold'>Equipo</h1>
        <Input
          name="equipment"
          value={dataDialog.equipment}
          onChange={handleChangeInput}
          required
        />
      </div>
      <div>
        <h1 className='font-bold'>Comentarios</h1>
        {
          showFormComentario ?
          <section className='p-4 rounded-lg bg-slate-50'>
            <div>
              <h1>Titulo</h1>
              <Input/>
            </div>
          </section>:
          <Button
            className="text-guinda underline hover:bg-white hover:text-guinda"
            variant="ghost"
            onClick={handleChangeFormAuthor}
          >
            Agregar Comentario
          </Button>
        }
      </div>
      <div className='my-2 relative'  >
        <h1 className='font-bold'>Tipo</h1>
        <Input
          name="type"
          value={dataDialog.type}
          onChange={handleChangeInput}
          required/>
      </div>
      <div className='my-2 relative'>
        <h1 className='font-bold'>Origen</h1>
        <Input
          name='origin'
          value={dataDialog.origin}
          onChange={handleChangeInput}
        />
      </div>
      <div className='my-2 relative'>
        <h1 className='font-bold'>Año de adquisición</h1>
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
          <h1 className='font-bold'>Ubicacion</h1>
          <DropdownComponent
            nameButton='Ubicacion de los equipos'
            nameTitle='Ubicacion'
          />
        </section>
        <section className='flex-1 ml-2'>
          <h1 className='font-bold'>Estado</h1>
          <DropdownComponent
            nameButton='Estado actual'
            nameTitle='Estado'
          />
        </section>
      </div>
    </div>
  )
};