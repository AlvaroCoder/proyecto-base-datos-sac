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
  dataStatus=[]
}) {
  const  {toast} = useToast();
  const refFirstNameCoordinator=useRef(null);
  const refLastNameCoordinator=useRef(null);
  const refFirstNameResearcher=useRef(null);
  const refLasNameResearcher=useRef(null);
  const refYearStart=useRef(null);
  const refYearEnd=useRef(null);

  const [loadingData, setLoadingData] = useState(false);
  const [showFormResearchers, setShowFormResearchers] = useState(false);
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
  const handleClickSave=async()=>{
    const adapterSaveData={

    }
    const adapterSaveToSend={

    }
    setLoadingData(true);
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
            ref={refFirstNameCoordinator}
          />
        </div>
        <div className='flex-1 ml-4'>
          <h2>Apellido</h2>
          <Input
            ref={refLastNameCoordinator}
          />
        </div>
        </section>
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
        <div >
          <h1 className='font-bold'>Estado</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full border-gray-100 border-[1px] shadow-sm"
                >
                <span>Hola</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                dataStatus?.map((item, key)=>
                  <DropdownMenuCheckboxItem key={key}
                    className="capitalize"
                  >
                    {item}
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
