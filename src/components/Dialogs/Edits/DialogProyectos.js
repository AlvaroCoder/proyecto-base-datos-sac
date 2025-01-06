import React, { useRef, useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import ClearIcon from '@mui/icons-material/Clear';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import _ from "lodash"

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
  const refInputNameResearcher=useRef(null);
  const refInputLasNameResearcher=useRef(null);
  
  const [mostrarDropdownCoordinador, setMostrarDropdownCoordinador] = useState(false);
  const [showFormNewAuthor, setShowFormNewAuthor] = useState(false);
  const [filterSearchCoordinator, setFilterSearchCoordinator] = useState(dataCoordinator);
  const [researchersDeleted, setResearchersDeleted] = useState([]);

  const handleClickAddResearcher=(evt)=>{
    evt.preventDefault();
    if (refInputNameResearcher.current.value === "" || refInputLasNameResearcher.current.value === "") {
      alert("Complete los campos vacíos")
      return;
    }
    const nameResearcher = refInputNameResearcher.current.value;
    const lastNameResearcher = refInputLasNameResearcher.current.value;

    const newDataResearcher = [
      ...dataDialogProyectos?.researchers, 
      {first_name : nameResearcher, last_name : lastNameResearcher}]
    const newDataAdded = [
      ...dataDialogProyectos?.authors_added,
      {first_name : nameResearcher, last_name : lastNameResearcher}
    ]
    setDataDialogProyectos({
      ...dataDialogProyectos,
      researchers : newDataResearcher,
      authors_added : newDataAdded
    });
    setShowFormNewAuthor(false);
    refInputNameResearcher.current.value = null;
    refInputLasNameResearcher.current.value = null;

    handleChangeExistChanges();
  }
  const handleClickCancelAuthor=()=>{

  }
  const handleChangeInput=(evt, keyValue)=>{
    const inputValue = evt.target.value;
    
    const newObjDataInput = {
      ...dataDialogProyectos,
      [keyValue] : inputValue
    }
    const existChanges = _.isEqual(initialDataDialog, newObjDataInput);
        
    if (!existChanges) {
      handleChangeExistChanges();
    }else{
      handleChangeNotExistChanges();
    }
    
    setDataDialogProyectos(newObjDataInput);
  }
  const handleClickClearResearcher=(idResearcher, objResearcher)=>{
    const newDataResearcher=[...dataDialogProyectos?.researchers].filter(researcher=>researcher?.id !== idResearcher);
    const newDataResearchersAdded = [...dataDialogProyectos?.authors_added].filter(item=>JSON.stringify(item)!== JSON.stringify(objResearcher))

    const newDataProyects = {
      ...dataDialogProyectos,
      authors_added : newDataResearchersAdded,
      authors_deleted : [...dataDialogProyectos?.authors_deleted, dataDialogProyectos?.researchers?.filter(r=>r?.id === idResearcher)[0]],
      researchers : newDataResearcher
    }
    
    setDataDialogProyectos(newDataProyects);
    handleChangeExistChanges();
  }

  const handleClickShowFormNewAuthor=()=>{
    setShowFormNewAuthor(!showFormNewAuthor)
  }

  const handleChangeChecked=(name_status)=>{
    setDataDialogProyectos({
      ...dataDialogProyectos,
      status : name_status
    });
    if (initialDataDialog?.status === name_status) {
      handleChangeNotExistChanges();
      return;
    }
    handleChangeExistChanges();
  }
  return (
    <section className='h-[450px] overflow-auto py-2 px-2'>
      <div className='my-2'>
        <h1 className='font-semibold'>Proyectos</h1>
        <Textarea
          name="project"
          className="text-wrap py-2 h-fit"
          value={dataDialogProyectos?.project}
          onChange={evt=>handleChangeInput(evt, "project")}
        />
      </div>
      <div className='my-2 relative'>
        <h1 className='font-semibold'>Coordinador</h1>
        <div className='flex flex-row items-center'>
          <div className='flex-1 mr-2'>
            <h1>Nombre</h1>
            <Input 
              value={dataDialogProyectos?.coordinator?.first_name}
              onChange={(evt)=>{
                // Funcion de cambiar el nombre del coordinador
                const value = evt.target.value;
                setDataDialogProyectos({
                  ...dataDialogProyectos,
                  coordinator : {
                    ...dataDialogProyectos?.coordinator,
                    first_name : value
                  }
                });
                handleChangeExistChanges();
              }}
            />
          </div>
          <div className='flex-1'>
            <h1>Apellido</h1>
            <Input 
              value={dataDialogProyectos?.coordinator?.last_name}
              onChange={(evt)=>{
                // Funcion de cambiar el apellido del coordinador
                const value = evt.target.value;
                setDataDialogProyectos({
                  ...dataDialogProyectos,
                  coordinator : {
                    ...dataDialogProyectos?.coordinator,
                    last_name : value
                  }
                });
                handleChangeExistChanges();
              }}
            />
          </div>
        </div>
        {
          (mostrarDropdownCoordinador && filterSearchCoordinator.length > 0) &&
          <div className='absolute mt-2 z-10 shadow-lg rounded-lg p-2 bg-white w-full'>
            {
              filterSearchCoordinator.map((item,key)=>{
                if (key < 4) {
                    return (
                      <Button
                        key={key}
                        className="w-full"
                        variant="ghost"
                        onClick={(evt)=>{
                          evt.preventDefault();
                          setDataDialogProyectos({
                            ...dataDialogProyectos,
                            coordinator : item
                          });
                          setMostrarDropdownCoordinador(false);
                        }}
                      >
                        {item}
                      </Button>
                    )
                }
                return null;
              })
            }
          </div>
        }
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Investigadores</h1>
        <div
          className='w-full rounded-lg flex flex-wrap gap-x-4 gap-y-2 items-center'
        >
          {
            dataDialogProyectos?.researchers?.map((researcher, key)=>{
              const {first_name, last_name} = researcher;
              return (
                <p 
                key={key}
                className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'
                >
                  <span className='mr-2'>
                    {first_name}
                  </span>
                  <span>
                    {last_name}
                  </span>
                  <ClearIcon
                    className='cursor-pointer'
                    onClick={()=>handleClickClearResearcher(researcher?.id, {first_name, last_name})}
                  />
                </p>
              )
            })
          }
        </div>
        <div className='mt-2'>
          {
            showFormNewAuthor ? 
            <section className='p-4 rounded-lg bg-slate-50'>
              <h1 className='font-semibold'>Nuevo Investigador</h1>
              <div className='grid grid-cols-2 gap-2'>
                <div className='flex-1'>
                  <label>Nombre</label>
                  <Input
                    name="first_name"
                    ref={refInputNameResearcher}
                  />
                </div>
                <div className='flex-1'>
                  <label>Apellido</label>
                  <Input
                    name="last_name"
                    ref={refInputLasNameResearcher}
                  />
                </div>
              </div>
              <div className='mt-2'>
                <Button
                  className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                  onClick={handleClickAddResearcher}
                >
                  <span>Agregar</span>
                </Button>
                <Button
                  className="mx-2"
                  variant="ghost"
                  onClick={handleClickCancelAuthor}
                >
                  <span>Cancelar</span>
                </Button>
              </div>
            </section> : 
            <Button
              variant="ghost"
              className="text-guinda underline hover:bg-white hover:text-guinda"
              onClick={handleClickShowFormNewAuthor}
            >
              Agregar Investigador
            </Button>
          }
        </div>
      </div>
      <div className='my-2'>
          <h1 className='font-bold'>Convenios</h1>
          <Input 
            value={dataDialogProyectos?.agreement}
            disabled={true}
          />
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Estado</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full border-gray-100 border-[1px] shadow-sm"
            >
              <span>{dataDialogProyectos?.status}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {
              dataStatus?.map((item,key)=><DropdownMenuCheckboxItem 
              key={key} 
              checked={dataDialogProyectos?.status === item}
              onCheckedChange={()=>handleChangeChecked(item)}
              >{item}</DropdownMenuCheckboxItem>)
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='my-2 flex flex-row items-center'>
          <div className='flex-1 my-1 mr-2'>
            <h1 className='font-semibold'>Fecha de Inicio</h1>
            <Input
              name="year_start"
              value={dataDialogProyectos?.year_start}
              type="number"
              onChange={(evt)=>{
                handleChangeInput(evt, "year_start");
              }}
            />
          </div>
          <div className='flex-1 my-1'>
            <h1 className='font-semibold'>Fecha de Fin</h1>
            <Input
              name="year_end"
              value={dataDialogProyectos?.year_end}
              type="number"
              onChange={(evt)=>{
                handleChangeInput(evt, "year_end")
              }}
            />
          </div>
      </div>
    </section>
  )
}
