import React, { useRef, useState } from 'react'
import { Input } from '../../ui/input'
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '../../ui/button';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { CREATE_BOOK } from '../../commons/apiConnection';
import { useToast } from '../../ui/use-toast';
import DropdownMenuComponent from '@/components/elementos/dropdownComponent';
import { ButtonCloseDialog, ListCardShort, PopoverAddList } from '@/components';
export default function DialogCreateLibros({
  dataStatus=[],
  dataLocation=[],
  handleClickSaveRegister,
  dataMembers=[]
}) {
  const {toast} = useToast();
  const refAuthorName =useRef(null);
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
    borrowed_to : [],
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
    if (dataDialog.authors.length <= 0) {
      toast({
        variant : "destructive",
        title :"Error",
        description :"Debe asignarle un autor al libro"
      });
      return;
    }
    const response = await CREATE_BOOK(dataDialog);
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON);
      
      toast({
        title : "Exito",
        description : `Se guardo el libro ${dataDialog.title}`
      });
      return
    }

    toast({
      variant : "destructive",
      title : "Error",
      description : "Ocurrio un error"
    })
  }
  const handleClickAddMember=(data)=>{
    setDataDialog(prev=>({
      ...dataDialog,
      borrowed_to : [...prev.borrowed_to, data]
    }))
  }
  const handleClickClearMember=(id)=>{
    setDataDialog(prev=>({
      ...dataDialog,
      borrowed_to : [...prev.borrowed_to].filter((_, idx)=>id!==idx)
    }))
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
    <div className='my-2'>
      <h1 className='font-bold'>Prestado a</h1>
      <ListCardShort
        data={dataDialog?.borrowed_to}
        handleClickClear={handleClickClearMember}
      />
      <div className='mt-2'>
        <PopoverAddList
          data={dataMembers}
          textButton='Agregar Usuario'
          handleClickAddMember={handleClickAddMember}
        />
      </div>
    </div>
    <ButtonCloseDialog
      handleClickSave={handleClickSave}
      textButton='Guardar Registro'
    />
   </section>
  )
};
