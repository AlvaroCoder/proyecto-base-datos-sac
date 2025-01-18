import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Loader2, SaveIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import DropdownMenuComponent from '@/components/elementos/dropdownComponent'
import { FormUploadImage } from '@/components'

export default function DialogCreateEquipos({
  dataLocation=[],
  dataTypes=[],
  dataStatus=[]
}) {
  
  const [loadingData, setLoadingData] = useState(false);

  const [dataDialog, setDataDialog] = useState({
    equipment : '',
    type : '',
    origin : '',
    year : "",
    description : "",
    evidence : null,
    location : {
      id : dataLocation[0]?.id,
      value : dataLocation[0]?.value
    },
    status: {
      id:dataStatus[0]?.id,
      value:dataStatus[0]?.value
    },
    type : {
      id : dataTypes[0]?.id,
      value : dataTypes[0]?.value
    }
  });

  // Funcion de cambiar valor de Input
  const handleChangeInput=(evt)=>{
    const target = evt.target;
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }


  const handleClickSave=async()=>{
    console.log(dataDialog);
  }
  return (
    <div className='max-h-[600px] h-full overflow-auto py-2 px-2'>
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
        <Textarea
          name="description"
          onChange={handleChangeInput}
          value={dataDialog?.description}
        />
      </div>
      <div>
        <h1 className='font-bold'>Evidencia</h1>
        <FormUploadImage
          
        />
      </div>
      <section
        className='flex flex-row items-center my-2`'
      >
        <div className='relative flex-1 mr-2'>
          <h1 className='font-bold'>Origen</h1>
          <Input
            name="origin"
            value={dataDialog?.origin}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className='relative flex-1'  >
          <h1 className='font-bold'>Tipo</h1>
         <DropdownMenuComponent
          data={dataTypes}
          initialValue={dataDialog?.type}
          changeData={
            (data)=>setDataDialog({
            ...dataDialog,
            type : data
          })}
        />
        </div>
      </section>
      <div className='my-2 relative'>
        <h1 className='font-bold'>Año de adquisición</h1>
        <Input
          name="year"
          type="number"
          placeholder="yyyy"
          onChange={handleChangeInput}
          value={dataDialog.year}
        />
        
      </div>
      <div className='w-full flex flex-row items-center justify-center my-2'>
        <section className='flex-1'>
          <h1 className='font-bold'>Ubicacion</h1>
          <DropdownMenuComponent
            data={dataLocation}
            initialValue={dataDialog?.location}
            changeData={
              (data)=>setDataDialog({
              ...dataDialog,
              location : data
            })}
          />
        </section>
        <section className='flex-1 ml-2'>
          <h1 className='font-bold'>Estado</h1>
          <DropdownMenuComponent
            data={dataStatus}
            initialValue={dataDialog?.status}
            changeData={(data)=>setDataDialog({
              ...dataDialog,
              status : data
            })}
          />
        </section>
      </div>
      <DialogFooter
        className="flex flex-row items-center my-4"
      >
        <DialogClose asChild>
          <Button
            className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
            onClick={handleClickSave}
          >
          {loadingData ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <><SaveIcon/><span className='ml-2'>Guardar Registro</span></>}

          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  )
};