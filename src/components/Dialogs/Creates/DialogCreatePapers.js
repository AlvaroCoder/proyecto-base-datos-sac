import React, {  useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button';
import { CREATE_PAPER } from '../../commons/apiConnection';
import { useToast } from '../../ui/use-toast';
import { ButtonCloseDialog, ListCardsShortPerson, PopoverAddList } from '@/components';

export default function DialogCreatePapers({
  handleClickSaveRegister,
  dataMembers=[]
}) {
  
  const {toast} = useToast();
  const [dataDialog, setDataDialog] = useState({
    title : "",
    members : [],
    year : '',
    link : ''
  });
  const handleChangeDialogInput=(evt)=>{
    const target = evt.target;
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }
  
  const handleClickClearMember=(key)=>{
    const newDataMembers =[...dataDialog?.members].filter((_,idx)=>idx!==key);
    setDataDialog({
      ...dataDialog,
      members : newDataMembers
    })
  }
  const handleClickAddMember=(valueMember)=>{
    const newListMembers = [...dataDialog?.members, valueMember]
    setDataDialog({
      ...dataDialog,
      members : newListMembers
    })
  }
  const handleClickSave=async()=>{
    console.log(dataDialog);
    const response = await CREATE_PAPER(dataDialog);
    if (!response.ok) {
      const responseJSON = await response.json();
      toast({
        variant : "destructive",
        title : "Error",
        description : `Ocurrio un error con el servidor : ${responseJSON?.detail}`
      });
      return
    }
    const responseJSON = await response.json();
    console.log(responseJSON);
    handleClickSaveRegister(dataDialog);
    toast({
      title : "Exito",
      description : `Se guardo correctamente el paper : ${dataDialog.title}`
    })
  }
  
  return (
    <section>
      <div className='my-2'>
        <h1 className='font-bold'>Titulo</h1>
        <Input
          name="title"
          value={dataDialog.title}
          onChange={handleChangeDialogInput}
        />
      </div>
      <div className='my-2'>
        <h1 className='font-bold'>Miembros</h1>
        <ListCardsShortPerson
          data={dataDialog?.members}
          handleClickClearMember={handleClickClearMember}
        />
        <div className='mt-2 w-full'>
          <PopoverAddList
            data={dataMembers}
            handleClickAddMember={handleClickAddMember}
            textButton='Agregar Miembro'
          />
        </div>
      </div>
      <section className='flex flex-row items-center mt-2'>
        <div className='flex-1 mr-2'>
          <h1 className='font-bold'>
            Link del documento
          </h1>
          <Input
            name="link"
            value={dataDialog.link}
            onChange={handleChangeDialogInput}
          />
        </div>
        <div className=''>
          <h1 className='font-bold'>Año</h1>
          <Input
            name="year"
            value={dataDialog.year}
            onChange={handleChangeDialogInput}
            type="number"
          />
        </div>
      </section>
      <ButtonCloseDialog
        textButton='Guardar Registro'
        handleClickSave={handleClickSave}
      />
    </section>
  )
}
