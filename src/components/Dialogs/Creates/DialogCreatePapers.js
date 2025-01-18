import React, {  useState } from 'react'
import { Input } from '../../ui/input'
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '../../ui/button';
import { DialogClose, DialogFooter } from '../../ui/dialog';
import {  Loader2 } from 'lucide-react';
import { CREATE_PAPER } from '../../commons/apiConnection';
import { useToast } from '../../ui/use-toast';
import { ListCardsShortPerson, PopoverAddList } from '@/components';

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
  const [loadingData, setLoadingData] = useState(false);

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
      /*setLoadingData(true);
      await CREATE_PAPER(dataDialog);
      toast({
        title :"Exito",
        description : "Exito en guardar el paper!"
      });
      handleClickSaveRegister(dataDialog)
      setLoadingData(false);*/
      console.log(dataDialog);
      
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
