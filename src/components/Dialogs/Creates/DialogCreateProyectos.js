import React, { useState } from 'react'
import { useToast } from '../../ui/use-toast'
import { Input } from '../../ui/input';
import { CREATE_PROYECTS } from '../../commons/apiConnection';
import { ButtonCloseDialog, DropdownMenuComponent, FormAddMember, ListCardShort, ListCardsShortPerson, PopOverAddButton, PopoverAddList } from '@/components';

export default function DialogCreateProyectos({
  dataStatus=[],
  handleClickSaveRegister,
  dataMembers=[],
  dataCategoriesUser=[],
  dataListAgreements=[]
}) {

  const  {toast} = useToast();
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
    const existeMiembro = dataDialog.researchers.some(item=>JSON.stringify(item) === JSON.stringify(jsonResearcher));
    if (existeMiembro) {
      toast({
        variant : "destructive",
        title : "Error",
        description : "No se puede agregar la misma persona 2 veces."
      });
      return;
    }
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
    const existeConvenio = dataDialog.agreements.some(item=>JSON.stringify(item) === JSON.stringify(jsonAgreement));
    if (existeConvenio) {
      toast({
        variant : "destructive",
        title : "Error",
        description : "No se puede agregar el mismo convenio 2 veces"
      })
      return;
    }
    setDataDialog(prev=>({
      ...dataDialog,
      agreements : [...prev.agreements, jsonAgreement]
    }))
  }
  // Funcion de guardar el nuevo proyecto
  const handleClickSave=async()=>{    
    const response = await CREATE_PROYECTS(dataDialog);        
    if (!response.ok) {
      const responsJSON = await response.json();
      toast({
        variant : "destructive",
        title : "Error",
        description : `Ocurrio un error : ${responsJSON?.detail}`
      });
      return;
    }
    const responseJSON = await response.json();   
    handleClickSaveRegister(dataDialog); 
    toast({
      title : "Exito",
      description : `${responseJSON?.message}`
    })
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
          componentAdd={
          <FormAddMember
            handleClickAddMember={(item)=>setDataDialog({...dataDialog, coordinator : item})}
          />}
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
              placeholder="yyyy"
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
              placeholder="yyyy"
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
      <ButtonCloseDialog
        textButton='Guardar Registro'
        handleClickSave={handleClickSave}
      />
    </section>
  )
}
