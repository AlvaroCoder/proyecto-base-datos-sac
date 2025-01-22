import React, { useRef, useState } from 'react'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea';
import _ from "lodash"
import { ButtonCloseDialog, DropdownMenuComponent, ListCardShort, PopOverAddButton, PopoverAddList } from '@/components';
import { useToast } from '@/components/ui/use-toast';
import { UPDATE_PROYECTS } from '@/components/commons/apiConnection';

// Dialog de editar proyectos
export default function DialogProyectos({
  initialDataDialog,
  setDataDialog : setDataDialogProyectos,
  dataCoordinator=[],
  dataStatus=[],
  dataListAgreements=[],
  handleClickSaveUpdate
}) 
{  
  const {toast} = useToast();
  const [dataProjects, setDataProjects] = useState({
    id : initialDataDialog?.id,
    name : initialDataDialog?.project,
    coordinator : initialDataDialog?.coordinator,
    researchers_added :[],
    researchers : initialDataDialog?.researchers,
    researchers_deleted :[],
    agreements_added : [],
    agreements_deleted : [],
    status : initialDataDialog?.status,
    agreement : initialDataDialog?.agreement,
    period : initialDataDialog?.period
  });

  // Funcion de agregar investigador a la lista
  const handleClickAddResearcher=(data)=>{
    if (!dataProjects.researchers.some(researcher=>researcher.id === data.id)) {
      setDataProjects(prev=>({
        ...prev,
        researchers : [...prev.researchers,data],
        researchers_added : [...prev.researchers_added, data]
      }))
    }else{
      toast({
        variant :"destructive",
        title : "Error",
        description : "No se puede agregar el mismo usuario 2 veces"
      })
    }
  }
  // Funcion de eliminar investigador de la lista
  const handleClickResearcherClear=(_, data)=>{
    const existeResearcherAgregado = dataProjects.researchers_added.some(researcher=>researcher.id === data.id);
    setDataProjects(prev=>{
      const actualizarResearcher = prev.researchers.filter(research=>research.id!==data.id);
      const actualizarResearcherAgregado = prev.researchers_added.filter(research=>research.id!==data.id);
      const actualizarResearchEliminar = existeResearcherAgregado ? prev.researchers_deleted : [...prev.researchers_deleted, data];
      return {
        ...prev,
        researchers : actualizarResearcher,
        researchers_added : actualizarResearcherAgregado,
        researchers_deleted : actualizarResearchEliminar
      }
    })
  }
  // Funcion de eliminar Convenio de la lista en el JSON de actualizar
  const handleClickClearAgreement=(_,data)=>{
    const existeConvenioAgregado = dataProjects.agreements_added.some(agreemnt => agreemnt.id === data.id);
    setDataProjects(prev=>{
      const actualizarAgreement = prev.agreement.filter(agremnt => agremnt.id !== data.id);
      const actualizarAgreementAgregados= prev.agreements_added.filter(agremnt => agremnt.id !== data.id);
      const actualizarAgreementEliminar = existeConvenioAgregado ? prev.agreements_deleted : [...prev.agreements_deleted, data];
      return {
        ...prev,
        agreement : actualizarAgreement,
        agreements_added : actualizarAgreementAgregados,
        agreements_deleted : actualizarAgreementEliminar
      }
    })
  }
  // Funcion de agregar convenio al JSON de actualizar
  const handleClickAddAgreement=(data)=>{
    if (!dataProjects.agreement.some(agreemnt => agreemnt.id === data.id)) {
      setDataProjects(prev=>({
        ...prev,
        agreement : [...prev.agreement, data],
        agreements_added : [...prev.agreements_added, data]
      }));
      
    }else {
      toast({
        variant : "destructive",
        title : "Error",
        description : "No se puede agregar el mismo convenio 2 veces"
      })
    }
  }
  const handleChangeInput=(evt)=>{
    const target = evt.target;
    setDataProjects({
      ...dataProjects,
      [target.name] : target.value
    })
  }

  const handleClickSave=async()=>{
    const response = await UPDATE_PROYECTS(dataProjects);
    if (!response.ok) {
      toast({
        variant : "destructive",
        title : "Error",
        description : "Sucedio un error al guardar los datos"
      });
      return;
    }
    const responseJSON = await response.json();
    handleClickSaveUpdate(dataProjects);
    toast({
      title : "Exito",
      description : `${responseJSON?.response}`
    });
  }
  return (
    <section className='h-[450px] overflow-auto py-2 px-2'>
      <div className='my-2'>
        <h1 className='font-semibold'>Proyecto</h1>
        <Textarea
          name="name"
          className="text-wrap py-2 h-fit"
          value={dataProjects?.name}
          onChange={handleChangeInput}
        />
      </div>
      <div className='my-2 relative'>
        <h1 className='font-semibold'>Coordinador</h1>
        <PopOverAddButton
          initialValue={dataProjects?.coordinator}
          data={dataCoordinator}
          textButton='Agregar Coordinador'
          changeValue={(data)=>setDataProjects({
            ...dataProjects,
            coordinator : data
          })}
        />
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Investigadores</h1>
        <ListCardShort
          data={dataProjects?.researchers}
          handleClickClear={handleClickResearcherClear}
        />
        <div className='mt-2'>
          <PopoverAddList
            data={dataCoordinator}
            handleClickAddMember={handleClickAddResearcher}
            textButton='Agregar Investigador'
          />
        </div>
      </div>
      <div className='my-2'>
          <h1 className='font-bold'>Convenios</h1>
          <ListCardShort
            data={dataProjects.agreement}
            handleClickClear={handleClickClearAgreement}
          />
          <div className='mt-2'>
            <PopoverAddList
              data={dataListAgreements}
              handleClickAddMember={handleClickAddAgreement}
              dataMembers={false}
              textButton='Agregar Convenio'
            />
          </div>
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Estado</h1>
        <DropdownMenuComponent
          data={dataStatus}
          initialValue={dataProjects?.status}
          changeData={(data)=>setDataProjects({
            ...dataProjects,
            status : data
          })}
        />
      </div>
      <div className='my-2 flex flex-row items-center'>
          <div className='flex-1 my-1 mr-2'>
            <h1 className='font-semibold'>Fecha de Inicio</h1>
            <Input
              value={dataProjects?.period?.year_start}
              onChange={(evt)=>{
                const target = evt.target;
                setDataProjects({
                  ...dataProjects,
                  period : {
                    ...dataProjects,
                    year_start : target.value
                  }
                })
              }}
              type="number"
            />
          </div>
          <div className='flex-1 my-1'>
            <h1 className='font-semibold'>Fecha de Fin</h1>
            <Input
              value={dataProjects?.period?.year_end}
              onChange={(evt)=>{
                const target = evt.target;
                setDataProjects({
                  ...dataProjects,
                  period : {
                    ...dataProjects,
                    year_end : target.value
                  }
                })
              }}
              type="number"
            />
          </div>
      </div>
      <ButtonCloseDialog
        handleClickSave={handleClickSave}
      />
    </section>
  )
}
