import React, { useRef, useState } from 'react'
import { Input } from '../../ui/input'
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '../../ui/button';
import { ChevronsUpDown, Loader2 } from 'lucide-react';

import SaveIcon from '@mui/icons-material/Save';
import { CREATE_BOOK } from '../../commons/apiConnection';
import { useToast } from '../../ui/use-toast';
import { DialogClose, DialogFooter } from '../../ui/dialog';
import DropdownMenuComponent from '@/components/elementos/dropdownComponent';
export default function DialogCreateLibros({
  dataStatus=[],
  dataLocation=[],
  handleClickSaveRegister,
  
}) {
  const {toast} = useToast();
  const refAuthorName =useRef(null);

  const [loadingData, setLoadingData] = useState(false);

  const [dataDialog, setDataDialog] = useState({
    authors : [],
    title : '',
    location : {
      value : dataLocation[0]?.value,
      id : dataLocation[0]?.id
    },
    status : {
      value : dataStatus[0]?.value,
      id : dataStatus[0]?.id
    },
    borrowed_to : {
      first_name : "",
      last_name : ""
    },
    amount : 1
  });
  const [showFormAuthor, setShowFormAuthor] = useState(false);

  const handleChangeTitle=(evt)=>{
    setDataDialog({
      ...dataDialog,
      title : evt.target.value
    })
  }
  const handleClickClearAuthor=(key)=>{
    const newDataAuthors=[...dataDialog?.authors].filter((_, idx)=>idx!==key);
    setDataDialog({
      ...dataDialog,
      authors : newDataAuthors
    });

  }
  const handleClickShowFormNewAuthor=()=>{
    setShowFormAuthor(!showFormAuthor);
  }

  const handleClickAddAuthor=(evt)=>{
    evt.preventDefault();
    if (refAuthorName.current.value === "") {
      alert("Debe ingresar un dato");
      return;
    }
    const authorData = refAuthorName.current.value;
    const newDataAtuhors = [...dataDialog?.authors, {value : authorData}]
    setDataDialog({
      ...dataDialog,
      authors : newDataAtuhors
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
    console.log(dataDialog);
  }
  const handleClickCancelSave=()=>{

  }
  return (
   <section>
    <div className='my-2'>
      <h1 className='font-bold'>Titulo</h1>
      <Input
        name="title"
        value={dataDialog.title}
        onChange={handleChangeTitle}
        required
      />
    </div>
    <div className='my-2'>
      <h1 className='font-bold'>Autor</h1>
      <div className='w-full rounded-lg flex flex-wrap gap-x-4'>
        {
          dataDialog.authors.map((author, key)=>{
            return (
              <p key={key} className='p-2 hover:bg-gray-200 border border-gray-100 rounded-lg w-fit mt-2 text-nowrap' >
                {author?.value}
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
            className="w-full shadow-sm border border-gray-100"
            onClick={handleClickShowFormNewAuthor}  
          >
            <p>Agregar autor</p>
            <ChevronsUpDown
              className='opacity-50'
            />
          </Button>
        }
      </div>
    </div>
    <div className='my-2 flex flex-row items-center'>
      <div className='w-[300px] flex flex-col'>
        <h1 className='font-bold'>Ubicación</h1>
        <DropdownMenuComponent
          data={dataLocation}
          initialValue={dataDialog?.location}
          changeData={(data)=>setDataDialog({
            ...dataDialog,
            location : data
          })}
        />
      </div>
      <div className='flex-1 ml-2'>
        <h1 className='font-bold'>Estado</h1>
        <DropdownMenuComponent
          data={dataStatus}
          initialValue={dataDialog?.status}
          changeData={(data)=>setDataDialog({
            ...dataDialog,
            status : data
          })}
        />
      </div>
    </div>
    <div className='flex-1  py-2 mt-2'>
      <h1 className='font-bold'>
        Prestado a 
      </h1>
    </div>
    <section className='w-full mb-4 flex flex-row items-center'>
      <div className='flex-1 mr-2'>
        <h1 className=''>Nombre</h1>
        <Input  
          name="first_name"
          value={dataDialog?.borrowed_to?.first_name}
          onChange={(evt)=>setDataDialog({
            ...dataDialog,
            borrowed_to : {
              first_name : evt.target.value,
              last_name : dataDialog?.borrowed_to.last_name
            }
          })}
        />
      </div>
      <div className='flex-1'>
        <h1>Apellido</h1>
        <Input
          name="last_name"
          value={dataDialog?.borrowed_to?.last_name}
          onChange={(evt)=>setDataDialog({
            ...dataDialog,
            borrowed_to : {
              first_name : dataDialog?.borrowed_to.first_name,
              last_name : evt.target.value
            }
          })}
        />
      </div>
    </section>
    <DialogFooter className='flex flex-row items-center my-4'>
      <DialogClose asChild>
      <Button
          className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
          onClick={handleClickSave}
      >
          {loadingData ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <><SaveIcon/><span className='ml-2'>Guardar Registro</span></>}
      </Button>

      </DialogClose>
    </DialogFooter>
   </section>
  )
};
