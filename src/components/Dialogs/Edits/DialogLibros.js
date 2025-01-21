"use client"
import React, { useRef, useState } from 'react'
import { Input } from '../../ui/input'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ButtonCloseDialog, DropdownMenuComponent, ListCardShort, PopoverAddList } from '@/components';
import { useToast } from '@/components/ui/use-toast';
import { UPDATE_BOOKS } from '@/components/commons/apiConnection';

export default function DialogLibros({
  initialDataDialog,
  dataDialog,
  dataLocation=[],
  dataStatus=[],
  dataMembers=[],
  dataPeopleBorrowTo=[],
  handleChangeExistChanges,
  setDataDialog : setDataDialogLibros,
}) {  
  console.log(initialDataDialog);
  
  const {toast }= useToast();
  const refInputNameAuthor=useRef(null);
  const [dataLibros, setDataLibros] = useState({
    id : initialDataDialog?.id,
    title : initialDataDialog?.title,
    authors_added : [],
    authors_deleted : [],
    authors : initialDataDialog.authors,
    location : initialDataDialog.location,
    status : initialDataDialog.status,
    borrowed_to : initialDataDialog.borrowed_to === "No prestado" ? [] : initialDataDialog.borrowed_to,
    borrowed_to_added : [],
    borrowed_to_deleted : [],
    amount : initialDataDialog.amount
  });

  const [showFormNewAuthor, setShowFormNewAuthor] = useState(false);

  const handleClickClearAuthor=(key)=>{
    const newDataAuthors = [...dataDialog?.authors].filter((_, idx)=>idx!==key);
    const newDataLibros = {
      ...dataDialog,
      authors : newDataAuthors,
      authors_deleted : [...dataDialog?.authors_deleted, dataDialog?.authors.filter((_,idx)=>idx==key)[0]]
    }
    setDataDialogLibros(newDataLibros);
    handleChangeExistChanges()    
  }
  const handleClickShowFormNewAuthor=()=>{
    setShowFormNewAuthor(!showFormNewAuthor);
  }

  const handleClickAddAuthor=(evt)=>{
    evt.preventDefault();
    if (refInputNameAuthor.current.value === "") {
      alert("Debe ingresar un dato");
      return;
    }
    const authorData = refInputNameAuthor.current.value;
    const newDataAuthors = [...dataDialog?.authors, {value : authorData}]
    const newDataAdded = [...dataDialog?.authors_added, {name : authorData}]
    setDataDialogLibros({
      ...dataDialog,
      authors : newDataAuthors,
      authors_added : newDataAdded
    });
    handleChangeExistChanges()
    setShowFormNewAuthor(false)
    refInputNameAuthor.current.value = null;
  }

  const handleClickCancelAuthor=(evt)=>{
    evt.preventDefault();
    setShowFormNewAuthor(false);
    refInputNameAuthor.current.value=null;
  }

  const handleChangeTitleDialog=(evt)=>{
    const inputValue = evt.target.value;  
    setDataLibros({
      ...dataLibros,
      title : inputValue
    });
  }
  const handleClickClearBorrowedTo=(id, item)=>{
    const existeMiembroAgregado = dataLibros.borrowed_to_added.some(obj=>JSON.stringify(obj) === JSON.stringify(item));
    const nuevaDataMiembrosAgregado = existeMiembroAgregado?[...dataLibros.borrowed_to_added].filter((obj)=>JSON.stringify(obj)!== JSON.stringify(item)) : [...dataLibros.borrowed_to_added];
    setDataLibros(prev=>({
      ...dataLibros,
      borrowed_to : [...prev.borrowed_to].filter((_,idx)=>idx!==id),
      borrowed_to_added : nuevaDataMiembrosAgregado,
      borrowed_to_deleted : existeMiembroAgregado ? [...prev.borrowed_to_deleted, item] : [...prev.borrowed_to_deleted]
    }));
  }
  const handleClickAddBorrowedTo=(data)=>{
    const existeMiembro = dataLibros.borrowed_to_added.some(item=>JSON.stringify(data) === JSON.stringify(item)) || dataLibros.borrowed_to?.some(item=>JSON.stringify(item) === JSON.stringify(data)) 
    if (existeMiembro) {
      toast({
        variant : "destructive",
        title : "Error",
        description : "No se puede agregar a la misma persona 2 veces"
      });
      return;
    }
    setDataLibros({
      ...dataLibros,
      borrowed_to : [...dataLibros.borrowed_to, data],
      borrowed_to_added : [...dataLibros.borrowed_to_added, data]
    });
  }
  const handleClickSave=async()=>{
    const response = await UPDATE_BOOKS(dataLibros);
    if (!response.ok) {
      toast({
        variant :"destructive",
        title : "Error",
        description : "Ocurrio un error con el servidor"
      });
      return;
    }
    const responseJSON = await response.json();
    console.log(responseJSON);
    
    toast({
      title : "Exito",
      description : "Se actualizo con exito el libro"
    })    
  }
  return (
    <section>
      <div className='my-2'>
        <h1 className='font-semibold'>Titulo</h1>
        <Input
          name="title"
          value={dataLibros.title}
          onChange={handleChangeTitleDialog}
        />
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Autor</h1>
        <ListCardShort
          data={dataLibros.authors}
          handleClickClear={handleClickClearAuthor}
        />
        <div className='mt-2'>
          {
            showFormNewAuthor ?
            <section className='p-4 rounded-lg bg-slate-50'>
              <h1 className='font-bold'>Nuevo Autor</h1>
              <div className='grid grid-cols-1 gap-2'>
                <div className='flex-1'>
                  <label>Nombre</label>
                  <Input
                    name="nombreAutor"
                    ref={refInputNameAuthor}
                  />
                </div>
              </div>
              <div className='mt-2'>
                <Button
                  className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"                                    
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
              Agregar autor
            </Button>
          }
        </div>
      </div>
      <div className='my-2 flex flex-row items-center'>
        <div className='w-[300px] flex flex-col'>
          <h1 className='font-semibold'>Ubicacion</h1>
          <DropdownMenuComponent
            data={dataLocation}
            initialValue={dataLibros.location}
            changeData={(item)=>setDataLibros({
              ...dataLibros,
              location : item
            })}
          />
        </div>
        <div className='flex-1 ml-2'>
          <h1 className='font-semibold'>Estado</h1>
          <DropdownMenuComponent
            data={dataStatus}
            initialValue={dataLibros.status}
            changeData={(item)=>setDataLibros({
              ...dataLibros,
              status : item
            })}
          />
        </div>
      </div>
      <div className='flex-1 border-b-2 border-b-guindaOpaco py-2 my-4'>
        <h1 className='font-semibold'>
          Prestado a
        </h1>
      </div>
      <ListCardShort
        data={dataLibros.borrowed_to}
        handleClickClear={handleClickClearBorrowedTo}
      />
      <div className='mt-2'>
        <PopoverAddList
          textButton='Agregar persona'
          data={dataMembers}
          handleClickAddMember={handleClickAddBorrowedTo}
        />
      </div>
      <ButtonCloseDialog
        handleClickSave={handleClickSave}
        textButton='Actualizar libros'
      />
    </section>
  )
}
