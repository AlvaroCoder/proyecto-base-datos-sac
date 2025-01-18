import React, { useState } from 'react'
import { useToast } from '../../ui/use-toast'
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { DialogClose, DialogFooter } from '../../ui/dialog';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import SaveIcon from '@mui/icons-material/Save';
import { CREATE_PROYECTS } from '../../commons/apiConnection';
import { DropdownMenuComponent, FormAddMember, ListCardShort, ListCardsShortPerson, PopOverAddButton, PopoverAddList } from '@/components';

export default function DialogCreateProyectos({
  dataStatus=[],
  handleClickSaveRegister,
  dataMembers=[],
  dataCategoriesUser=[],
  dataListAgreements=[]
}) {

  const  {toast} = useToast();
  const [loadingData, setLoadingData] = useState(false);
  const [dataDialog, setDataDialog] = useState({
    name : "",
    coordinator : null,
    researchers : [],
    agreements :[],
    status : {
      id : dataStatus[0]?.id,
      value : dataStatus[0]?.value
    },
    period : {
      year_start : "",
      year_end : ""
    }
  });
  const handleChangeInput=(evt)=>{
    const target = evt.target;
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }
  // Funcion de agregar investigador (nuevo o existente) al JSON de guardar información
  const handleClickAddResearcher=(jsonResearcher)=>{
    setDataDialog(prev=>({
      ...dataDialog,
      researchers : [...prev.researchers, jsonResearcher]
    }))
  }

  const handleClickClearResearcher=(key)=>{
    setDataDialog(prev=>({
      ...dataDialog,
      researchers : [...prev.researchers].filter((_, idx)=>idx!==key)
    }))
  }

  // Funcion de agregar un convenio a la lista de "agreements"
  const handleClickClearAgreements=(key)=>{
    setDataDialog(prev=>({
      ...dataDialog,
      agreements : [...prev.agreements].filter((_,idx)=>idx!==key)
    }))
  }
  const handleClickAddAgreement=(jsonAgreement)=>{
    setDataDialog(prev=>({
      ...dataDialog,
      agreements : [...prev.agreements, jsonAgreement]
    }))
  }
  // Funcion de guardar el nuevo proyecto
  const handleClickSave=async()=>{
    console.log(dataDialog);
        
  }
  // Funcion de agregar miembro nuevo o antiguo a la 
  return (
    <section>
      <div className='my-2'>
        <h1 className='font-bold'>Nombre</h1>
        <Input
          name="name"
          value={dataDialog.name}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <h1 className='font-bold mb-2'>Coordinador</h1>
        <PopOverAddButton
          data={dataMembers}
          changeValue={(item)=>setDataDialog({...dataDialog,coordinator:item})}
        />
      </div>
      <div >
        <h1 className='font-bold'>Convenios</h1>
        <ListCardShort
          data={dataDialog?.agreements}
          handleClickClear={handleClickClearAgreements}
        />
        <div className='mt-2'>
          <PopoverAddList
            data={dataListAgreements}
            dataMembers={false}
            handleClickAddMember={handleClickAddAgreement}
          />
        </div>
      </div>
      <div className='my-2'>
        <h1 className='font-bold '>Investigador</h1>
        <ListCardsShortPerson
          data={dataDialog?.researchers}
          handleClickClearMember={handleClickClearResearcher}
        />
      </div>
      <div className='mt-2 w-full'>
        <PopoverAddList
          data={dataMembers}
          handleClickAddMember={handleClickAddResearcher}
          componentAdd={
            <FormAddMember
              dataCategoriesUser={dataCategoriesUser}
              handleClickAddMember={handleClickAddResearcher}
            />
          }
        />
      </div>
      <div className='my-2 flex flex-row items-center'>
        <div className='w-full'>
          <h1 className='font-bold'>Estado</h1>
          <DropdownMenuComponent
            data={dataStatus}
            initialValue={dataDialog?.status}
            changeData={
              (data)=>setDataDialog({
                ...dataDialog,
                status : data
              })
            }
          />
        </div>
      </div>
      <div>
        <h1 className='font-bold'> Periodo</h1>
        <section className='grid grid-cols-2 gap-4'>
          <div>
            <h1 >Fecha Inicio</h1>
            <Input
              type="number"
              value={dataDialog?.period?.year_start}
              onChange={(evt)=>{
                const target = evt.target;
                setDataDialog({
                  ...dataDialog,
                  period:{
                    year_start : target.value,
                    year_end : dataDialog.period.year_end
                  }
                })
              }}
            />
          </div>
          <div>
            <h1>Fecha Fin</h1>
            <Input
              type="number"
              value={dataDialog?.period?.year_end}
              onChange={(evt)=>{
                const target= evt.target;
                setDataDialog({
                  ...dataDialog,
                  period : { 
                    year_end : target.value,
                    year_start : dataDialog.period.year_start
                  }
                })
              }}
            />
          </div>
        </section>
      </div>
      <DialogFooter className='flex flex-row items-center my-4'>
        <DialogClose asChild>
          <Button
            className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
            onClick={handleClickSave}
          >
            {loadingData ? <Loader2 className='mr-2 h-4 w-4 animate-spin' />: <><SaveIcon/><span className='ml-2'>Guardar Registro</span></>}
          </Button>
        </DialogClose>
      </DialogFooter>
    </section>
  )
}
