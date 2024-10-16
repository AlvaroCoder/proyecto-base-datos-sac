import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Loader2 } from 'lucide-react';

import SaveIcon from '@mui/icons-material/Save';
import { CREATE_BOOK } from '../commons/apiConnection';
import { useToast } from '../ui/use-toast';
export default function DialogCreateLibros({
  dataStatus=[],
  dataLocation=[],
  dataPeopleBorrowTo=[],
  handleClickSaveRegister,
  
}) {
  const {toast} = useToast();
  const refAuthorName =useRef(null);
  const [loadingData, setLoadingData] = useState(false);

  const [dataDialog, setDataDialog] = useState({
    author : [],
    title : '',
    location : {
      value : dataLocation[0]?.value,
      id : dataLocation[0]?.id
    },
    status : {
      value : dataStatus[0]?.value,
      id : dataStatus[0]?.id
    }
  });
  const [showFormAuthor, setShowFormAuthor] = useState(false);

  const handleChangeTitle=(evt)=>{
    setDataDialog({
      ...dataDialog,
      title : evt.target.value
    })
  }
  const handleClickClearAuthor=(key)=>{
    const newDataAuthors=[...dataDialog?.author].filter((_, idx)=>idx!==key);
    setDataDialog({
      ...dataDialog,
      author : newDataAuthors
    });

  }
  const handleClickShowFormNewAuthor=()=>{
    setShowFormAuthor(!showFormAuthor);
  }
  const handleChangeCheckedDropdown=(id, keyValue)=>{
    const jsonSelected= keyValue=="location" ? dataLocation?.filter(elem=>elem?.id == id)[0] : dataStatus?.filter(elem=>elem?.id==id)[0];

    setDataDialog({
      ...dataDialog,
      [keyValue] : jsonSelected
    })
  }
  const handleClickAddAuthor=(evt)=>{
    evt.preventDefault();
    if (refAuthorName.current.value === "") {
      alert("Debe ingresar un dato");
      return;
    }
    const authorData = refAuthorName.current.value;
    const newDataAtuhors = [...dataDialog?.author, {name : authorData}]
    setDataDialog({
      ...dataDialog,
      author : newDataAtuhors
    });
    setShowFormAuthor(false );
    refAuthorName.current.value = null;
  }
  const handleClickCancelAuthor=(evt)=>{
    evt.preventDefault();
    setShowFormAuthor(false);
    refAuthorName.current.value=null;
  }
  const handleClickSave=async()=>{
    const adapterSaveData = {
      authors : dataDialog.author,
      title : dataDialog.title,
      location : [
        dataDialog.location
      ],
      status :dataDialog.status,
      borrowed_to : "NO PRESTADO",
      amount : 1
    };
    const adapterSaveToSend={
      title : dataDialog.title,
      authors : dataDialog.author,
      location : dataDialog.location.id,
      status : dataDialog.status.id,
      borrowed_to : null,
      amount : 1
    }
    setLoadingData(true)
    handleClickSaveRegister(adapterSaveData);
    await CREATE_BOOK(adapterSaveToSend);
    setLoadingData(false);
    toast({
      title : "Exito",
      description : "Libro guardado con exito"
    })
  }
  const handleClickCancelSave=()=>{

  }
  return (
   <section>
    <div className='my-2'>
      <h1>Titulo</h1>
      <Input
        name="title"
        value={dataDialog.title}
        onChange={handleChangeTitle}
        required
      />
    </div>
    <div className='my-2'>
      <h1>Autor</h1>
      <div className='w-full rounded-lg flex flex-wrap gap-x-4'>
        {
          dataDialog.author.map((author, key)=>{
            return (
              <p key={key} className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap' >
                {author?.name}
                <ClearIcon
                  className='cursor-pointer'
                  onClick={()=>handleClickClearAuthor(key)}
                />
              </p>
            )
          })
        }
      </div>
      <div className='mt-2'>
        {
          showFormAuthor ? 
          <section className='p-4 rounded-lg bg-slate-50'>
            <h1 className='font-bold'>Nuevo Autor</h1>
            <div className='grid grid-cols-1 gap-2'>
              <div className='flex-1'>
                <label>Nombre</label>
                <Input
                  ref={refAuthorName}
                />
              </div>
            </div>
            <div className='mt-2'>
              <Button
                className="bg-white text-guinda border-2 border-guinda hover:bg-red-50 "
                onClick={handleClickAddAuthor}
              >
                Agregar
              </Button>
              <Button
                variant="ghost"
                className="mx-2"
                onClick={handleClickCancelAuthor}
              >
                Cancelar
              </Button>
            </div>
          </section> : 
          <Button
            variant="ghost"
            className="text-guinda underline hover:bg-white hover:text-guinda"
            onClick={handleClickShowFormNewAuthor}  
          >
            Agregar Autor
          </Button>
        }
      </div>
    </div>
    <div className='my-2 flex flex-row items-center'>
      <div className='w-[300px] flex flex-col'>
        <h1 className='font-bold'>Ubicación</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full border-gray-100 border-[1px] shadow-sm"
            >
              <span>{dataDialog.location.value}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {
              dataLocation?.map(item=>
                <DropdownMenuCheckboxItem
                  className="capitalize"
                  checked={item?.id === dataDialog?.location.id}
                  onCheckedChange={()=>handleChangeCheckedDropdown(item.id, "location")}
                 >
                  {item.value}
                </DropdownMenuCheckboxItem>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex-1 ml-2'>
        <h1>Estado</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-full border-gray-100 border-[1px] shadow-sm"
              variant="ghost"
            >
              <span>{dataDialog.status.value}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {
              dataStatus?.map(item=>
                <DropdownMenuCheckboxItem
                  className="capitalize"
                  checked={item?.id===dataDialog?.status.id}
                  onCheckedChange={()=>handleChangeCheckedDropdown(item?.id, "status")}
                >
                  {item?.value}
                </DropdownMenuCheckboxItem>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <div className='flex-1 border-b-2 border-b-guindaOpaco py-2 my-4'>
      <h1 className='font-bold'>
        Prestado a 
      </h1>
    </div>
    <div className='w-full mb-4'>
            
    </div>
    <div className='flex flex-row items-center my-4'>
      <Button
          className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
          onClick={handleClickSave}
          
      >
          {loadingData ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <><SaveIcon/><span className='ml-2'>Guardar Registro</span></>}
      </Button>
      <Button
          variant="ghost"
          onClick={handleClickCancelSave}
      >
          <p>Cancelar</p>
      </Button>
    </div>
   </section>
  )
};
