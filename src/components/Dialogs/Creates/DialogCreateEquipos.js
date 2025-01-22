import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Textarea } from '@/components/ui/textarea'
import DropdownMenuComponent from '@/components/elementos/dropdownComponent'
import { ButtonCloseDialog, FormUploadImage } from '@/components'
import { CREATE_EQUIPO, UPLOAD_IMAGE_EQUIPO } from '@/components/commons/apiConnection'
import { useToast } from '@/components/ui/use-toast'

export default function DialogCreateEquipos({
  dataLocation=[],
  dataTypes=[],
  dataStatus=[]
}) {
  const {toast} = useToast();
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

  // Funcion de guardar registro
  const handleClickSave=async()=>{
    const newFormDataImage = new FormData();
    newFormDataImage.append("evidence", dataDialog.evidence);
    newFormDataImage.append("equipment_name", dataDialog.equipment);

    const responseImage = await UPLOAD_IMAGE_EQUIPO(newFormDataImage);
    if (!responseImage.ok) {
      toast({
        variant : "destructive",
        title : "Error",
        description : "Problemas de subir la imagen"
      });
      return;
    }
    const responseImageJSON = await responseImage.json();
    const newJSONToSend={
      ...dataDialog,
      evidence : responseImageJSON?.url
    }
    console.log(newJSONToSend);
    
    const response = await CREATE_EQUIPO(newJSONToSend);
    if (!response.ok) {
      toast({
        variant : "destructive",
        title : "Error",
        description :"Ocurrio un error"
      });
      return;
    }

    const responseJSON = await response.json();
    console.log(responseJSON);
    handleClickSave(dataDialog);
    toast({
      title : "Exito",
      description : `Se guardo el equipo ${dataDialog.equipment}`
    });
  }
  const handleChangeImage=(data)=>{
    setDataDialog({
      ...dataDialog,
      evidence : data
    })
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
          handleChange={handleChangeImage}

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
      <ButtonCloseDialog
        textButton='Guardar Registro'
        handleClickSave={handleClickSave}
      />
    </div>
  )
};