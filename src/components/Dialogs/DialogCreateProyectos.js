import React, { useRef, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ClearIcon from '@mui/icons-material/Clear';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Loader2 } from 'lucide-react';
import SaveIcon from '@mui/icons-material/Save';

export default function DialogCreateProyectos({
  dataStatus=[],
  dataListAgreements=[]
}) {

  const updateDataStatus = dataStatus.map((item, idx)=>{
    if (idx == 0) {
      return {
        status : item,
        selected : true
      }
    }
    return {
      status : item,
      selected : false
    }
  });
  
  const  {toast} = useToast();
  const refFirstNameCoordinator=useRef(null);
  const refLastNameCoordinator=useRef(null);
  const refFirstNameResearcher=useRef(null);
  const refLasNameResearcher=useRef(null);
  const refYearStart=useRef(null);
  const refYearEnd=useRef(null);

  
  const [newDataStatus, setNewDataStatus] = useState(updateDataStatus);
  const [loadingData, setLoadingData] = useState(false);
  const [showFormResearchers, setShowFormResearchers] = useState(false);
  const [showFormAgreements, setShowFormAgreements] = useState(false);
  const [nameAgreement, setNameAgreement] = useState("");
  const [dataDialog, setDataDialog] = useState({
    name : "",
    coordinator : {
      first_name : "",
      last_name : ""
    },
    researchers : [],
    agreements :[],
    status : 1,
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
  const handleClickAddResearcher=()=>{
    if (refFirstNameResearcher.current.value === "" || refLasNameResearcher.current.value === "") {
      alert("Debe completar el formulario");
      return;
    }
    const newDataResearcher = [...dataDialog?.researchers, {first_name : refFirstNameResearcher.current.value, last_name: refLasNameResearcher.current.value}]
    setDataDialog({
      ...dataDialog,
      researchers : newDataResearcher
    });
    setShowFormResearchers(false);
    refFirstNameResearcher.current.value=null;
    refLasNameResearcher.current.value=null;
  }
  const handleClickCancelResearcher=()=>{

  }
  const handleClickShowFormNewResearcher=()=>{
    setShowFormResearchers(!showFormResearchers);
  }
  const handleClickCrearResearcher=(key)=>{
    const newDataResearcher=[...dataDialog?.researchers].filter((_,idx)=>idx!==key);
    setDataDialog(prev=>({
      ...dataDialog,
      researchers : [...prev.researchers].filter((_, idx)=>idx!==key)
    }))
  }
  // Funcion de cambiar de estado a "status"
  const handleChangeChecked =(idx)=>{
    const newData = newDataStatus.map((item,index)=>{
      if (index == idx) {
        return {
          ...item,
          selected : true
        }
      }
      return{
        ...item,
        selected : false
      }
    })
    setNewDataStatus(newData)
  }
  // Mostrar o replegar el formulario de agregar convenio
  const handleChangeFormAgreement=()=>{
    setShowFormAgreements(!showFormAgreements)
  }
  // Funcion de agregar un convenio a la lista de "agreements"
  const handleAddAgreement=()=>{
    const dataAgreement = nameAgreement;
    if (dataAgreement === "") {
      alert("Llene el formulario");
      return
    }
    setDataDialog({
      ...dataDialog,
      agreements : [...dataDialog.agreements, dataAgreement]
    });
    setShowFormAgreements(false)
    setNameAgreement("");
  }
  // Funcion de atrapar los cambios del INPUT del nombre de convenios
  const handelChangeInputAgreement=(evt)=>{
    setNameAgreement(evt.target.value);
  }
  // Funcion de guardar el nuevo proyecto
  const handleClickSave=async()=>{
    setLoadingData(true);
    console.log(dataDialog);
    
    const adapterSaveData={
      
    }
    const adapterSaveToSend={

    }
    setLoadingData(false);
  }
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
        <h1 className='font-bold'>Coordinador</h1>
        <section className='flex flex-row items-center w-full'>
        <div className='flex-1'>
          <h2>Nombre</h2>
          <Input
            value={dataDialog?.coordinator?.first_name}
            onChange={(evt)=>{
              const value = evt.target.value;
              setDataDialog({
                ...dataDialog,
                coordinator : {
                  first_name : value,
                  last_name : dataDialog.coordinator.last_name
                }
              })
            }}
          />
        </div>
        <div className='flex-1 ml-4'>
          <h2>Apellido</h2>
          <Input
            value={dataDialog?.coordinator?.last_name}
            onChange={(evt)=>{
              const value = evt.target.value;
              setDataDialog({
                ...dataDialog,
                coordinator : {
                  last_name : value,
                  first_name : dataDialog.coordinator.first_name
                }
              })
            }}
          />
        </div>
        </section>
      </div>
      <div >
        <h1 className='font-bold'>Convenios</h1>
        <div className='w-ful rounded-lg flex flex-wrap gap-x-4'>
          {
            dataDialog?.agreements.map((item,key)=>(
              <p key={key} className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'>
                <span>{item}</span>
              </p>
            ))
          }
        </div>
        <div className='mt-2'>
          {
            showFormAgreements ? 
            <section
              className='p-4 rounded-lg bg-slate-50'
            >
              <div className='relative'>
                <label>Convenio</label>
                <Input  
                  className="relative" 
                  value={nameAgreement}
                  onChange={handelChangeInputAgreement}
                  />
                {
                  (nameAgreement !== "" && dataListAgreements.length > 0)  &&
                  <div className='absolute top-16 w-full shadow-md rounded-md bg-white z-10 p-4'>
                    {
                      dataListAgreements?.map(item=>(<p className='w-full p-2 border-b-gray-200 border-b-2'>
                        <span>{item}</span>
                      </p>))
                    }
                  </div>
                }
              </div>
              <div className='mt-2'>
                <Button
                  className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                  onClick={handleAddAgreement}
                >
                  Agregar
                </Button>
                <Button
                  variant="ghost"
                  className="mx-2"
                  onClick={handleChangeFormAgreement}
                >
                  Cancelar
                </Button>
              </div>
            </section> : 
            <Button
              variant="ghost"
              className="text-guinda underline hover:bg-white hover:text-guinda"
              onClick={handleChangeFormAgreement}
            >
              Nuevo Convenio
            </Button>
          }
        </div>
      </div>
      <div className='my-2'>
        <h1 className='font-bold'>Investigador</h1>
        <div className='w-ful rounded-lg flex flex-wrap gap-x-4'>
          {
            dataDialog.researchers.map((item, key)=>(
              <p key={key} className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'>
                <span>{item.first_name}, {item.last_name}</span>
                <ClearIcon
                  className='cursor-pointer'
                  onClick={()=>handleClickCrearResearcher(key)}
                />
              </p>
            ))
          }
        </div>
      </div>
      <div className='mt-2'>
        {
          showFormResearchers?
          <section className='p-4 rounded-lg bg-slate-50'>
            <h1 className='font-bold'>Nuevo Investigador</h1>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label>Nombre</label>
                <Input
                  ref={refFirstNameResearcher}
                />
              </div>
              <div>
                <label>Apellido</label>
                <Input
                  ref={refLasNameResearcher}
                />
              </div>
            </div>
            <div className='mt-2'>
              <Button
                className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                onClick={handleClickAddResearcher}
              >
                Agregar
              </Button>
              <Button
                variant="ghost"
                className="mx-2"
                onClick={handleClickCancelResearcher}
              >
                Cancelar
              </Button>
            </div>
          </section>:
          <Button
            variant="ghost"
            className="text-guinda underline hover:bg-white hover:text-guinda"
            onClick={handleClickShowFormNewResearcher}
            >
            Agregar Investigador
          </Button>
        }
      </div>
      <div className='my-2 flex flex-row items-center'>
        <div className='w-full'>
          <h1 className='font-bold'>Estado</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full border-gray-100 border-[1px] shadow-sm"
                >
                <span>{newDataStatus.filter(item=>item.selected)[0].status}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                newDataStatus?.map((item, key)=>
                  <DropdownMenuCheckboxItem key={key}
                    className="capitalize"
                    checked={item.selected}
                    onCheckedChange={()=>handleChangeChecked(key)}
                  >
                    {item.status}
                  </DropdownMenuCheckboxItem>
                )
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <h1 className='font-bold'> Periodo</h1>
        <section className='grid grid-cols-2 gap-4'>
          <div>
            <h1 >Fecha Inicio</h1>
            <Input
              type="number"
              ref={refYearStart}
            />
          </div>
          <div>
            <h1>Fecha Fin</h1>
            <Input
              type="number"
              ref={refYearEnd}
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
