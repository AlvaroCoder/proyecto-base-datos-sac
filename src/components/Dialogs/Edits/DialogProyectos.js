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
  dataDialog : dataDialogProyectos, 
  handleChangeExistChanges,
  handleChangeNotExistChanges,
  setDataDialog : setDataDialogProyectos,
  dataCoordinator=[],
  dataStatus=[]
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


  const handleClickAddResearcher=(data)=>{
    const existeMiembro = dataProjects.researchers_added.some(item=>JSON.stringify(item) === JSON.stringify(data)) || dataProjects.researchers?.some(item=>JSON.stringify(item) === JSON.stringify(data))
    if (!existeMiembro) {
      setDataProjects({
        ...dataProjects,
        researchers : [...dataProjects.researchers, data ],
        researchers_added : [...dataProjects.researchers_added, data]
      })
    }else{
      toast({
        variant:"destructive",
        title : "Error de agregar",
        description :"No se puede agregar la misma persona 2 veces"
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
  const handleClickResearcherClear=(id, item)=>{
    const existeMiembroAgregado=dataProjects.researchers_added.some(obj=>JSON.stringify(obj)===JSON.stringify(item));
    console.log(existeMiembroAgregado);
    
    const nuevaDataMiembrosAgregado=existeMiembroAgregado ? [...dataProjects.researchers_added].filter((obj)=>JSON.stringify(obj)!== JSON.stringify(item)) : [...dataProjects.researchers_added];
    setDataProjects(prev=>({
      ...dataProjects,
      researchers : [...prev.researchers].filter((_,idx)=>idx!==id),
      researchers_added : nuevaDataMiembrosAgregado,
      researchers_deleted : [...prev.researchers_deleted, item]
    }));
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
    console.log(responseJSON);
    
    console.log(dataProjects); 
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
          <Input 
            value={dataProjects?.agreement}
            disabled={true}
          />
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
