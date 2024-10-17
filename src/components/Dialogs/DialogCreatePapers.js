import React, { useState } from 'react'
import { Input } from '../ui/input'
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';

import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Loader2 } from 'lucide-react';
import { CREATE_PAPER } from '../commons/apiConnection';
import { useToast } from '../ui/use-toast';

export default function DialogCreatePapers({
  handleClickSaveRegister
}) {
  const {toast} = useToast();
  const [dataDialog, setDataDialog] = useState({
    title : "",
    members : [],
    year : '',
    link : ''
  });
  const [showFormNewMember, setShowFormNewMember] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [inputValueMember, setInputValueMember] = useState({
    first_name : '',
    last_name : ''
  })
  const handleChangeDialogInput=(evt)=>{
    const target = evt.target;
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }
  
  const handleClickDeleteMember=(evt)=>{

  }
  const handleChangeFormMember=(evt)=>{
    const target = evt.target;
    setInputValueMember({
      ...inputValueMember,
      [target.name] : target.value
    })
  }
  const handleShowNewForm=()=>{
    setShowFormNewMember(!showFormNewMember);
  } 
  const handleClickAddMember=()=>{
    setInputValueMember({
      first_name : '',
      last_name : ''
    });
    setShowFormNewMember(false);
    setDataDialog(prev=>({
      ...dataDialog,
      members : [...prev.members, inputValueMember]
    }))
  }
  const handleClickCancelMember=()=>{
    setInputValueMember({
      first_name :'',
      last_name : ''
    });
    setShowFormNewMember(false);  
  }
    const handleClickSave=async()=>{
      setLoadingData(true);
      await CREATE_PAPER(dataDialog);
      toast({
        title :"Exito",
        description : "Exito en guardar el paper!"
      });
      handleClickSaveRegister(dataDialog)
      setLoadingData(false);
  }
  
  return (
    <section>
      <div className='my-2'>
        <h1>Titulo</h1>
        <Input
          name="title"
          value={dataDialog.title}
          onChange={handleChangeDialogInput}
        />
      </div>
      <div className='my-2'>
        <h1>Miembros</h1>
        <div className='w-full rounded-lg flex flex-wrap gap-x-4 gap-y-2 items-center'>
          {
            dataDialog.members.map((member, key)=>{
              return (
                <p key={key} className='py-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'>
                  <span className='mr-2 px-2'>
                    {member.first_name}, {member.last_name}
                    <ClearIcon
                      className='cursor-pointer ml-2'
                      onClick={handleClickDeleteMember}
                    />
                  </span>
                </p>
              )
            })
          }
        </div>
        <div className='mt-2'>
          {
            showFormNewMember ?
            <section className='p-4 rounded-lg bg-slate-50'>
              <h1 className='font-bold'>Nuevo Miembro</h1>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex-1'>
                  <label>Nombre</label>
                  <Input
                    name="first_name"
                    value={inputValueMember.first_name}
                    onChange={handleChangeFormMember}
                  />
                </div>
                <div className='flex-1'>
                  <label>Apellido</label>
                  <Input
                    name="last_name"
                    value={inputValueMember.last_name}
                    onChange={handleChangeFormMember}
                  />
                </div>
              </div>
              <div className='mt-2'>
                <Button
                  className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                  onClick={handleClickAddMember}
                >
                  Agregar
                </Button>
                <Button
                  variant="ghost"
                  className="mx-2"
                  onClick={handleClickCancelMember}
                >
                  Cancelar
                </Button>
              </div>
            </section>:
            <Button
              variant="ghost"
              className="text-guinda underline hover:bg-white hover:text-guinda"
              onClick={handleShowNewForm}
            > 
              Agregar Miembro
            </Button>
          }
        </div>
      </div>
      <div className='mt-2'>
        <h1>
          Link del documento
        </h1>
        <Input
          name="link"
          value={dataDialog.link}
          onChange={handleChangeDialogInput}
        />
      </div>
      <div>
        <h1>Año</h1>
        <Input
          name="year"
          value={dataDialog.year}
          onChange={handleChangeDialogInput}
        />
      </div>
      <DialogFooter className='flex flex-row items-center my-4'>
        <DialogClose asChild>
          <Button
            className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
            onClick={handleClickSave}
          >
            {loadingData ? <Loader2  className="mr-2 h-4 w-4 animate-spin"/> : <><SaveIcon/> <span className='ml-2'>Guardar Registro</span></>}
          </Button>
        </DialogClose>
      </DialogFooter>
    </section>
  )
}
