"use client"
import React, { useRef, useState } from 'react'
import { Input } from '../../ui/input'
import { ButtonCloseDialog, DropdownMenuComponent, ListCardShort, PopoverAddList } from '@/components';
import { useToast } from '@/components/ui/use-toast';
import { UPDATE_BOOKS } from '@/components/commons/apiConnection';

export default function DialogLibros({
  initialDataDialog,
  dataLocation=[],
  dataStatus=[],
  dataMembers=[],
  dataAutores=[],
  handleClickSaveUpdate,
}) {      
  const {toast }= useToast();
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

  // Funcion de eliminar autor de la lista de autores
  const handleClickClearAuthor=(_, data)=>{
    const existeAutorAgregado = dataLibros.authors_added.some(author=>author.id === data.id);
    setDataLibros(prev=>{
      const actualizarAutores =prev.authors.filter(author=>author.id!== data.id);
      const actualizarAutoresAgregados = prev.authors_added.filter(author=>author.id!==data.id);
      const actualizarAutoresEliminar = existeAutorAgregado? prev.authors_deleted : [...prev.authors_deleted, data];
      return {
        ...prev,
        authors : actualizarAutores,
        authors_added : actualizarAutoresAgregados,
        authors_deleted : actualizarAutoresEliminar
      }
    })
  }

  // Funcion de agregar author a la lista de autores
  const handleClickAddAuthor=(data)=>{
    if (!dataLibros.authors.some(author=>author.id === data.id)) {
      setDataLibros(prev=>({
        ...prev,
        authors : [...prev.authors, data],
        authors_added : [...prev.authors_added, data]
      }))
    }else{
      toast({
        variant : "destructive",
        title : "Error",
        description : "No se puede agregar el mismo usuario 2 veces"
      })
    }
  }

  // Funcion que atrapa los cambios en el input de titulo del libro
  const handleChangeTitleDialog=(evt)=>{
    const inputValue = evt.target.value;  
    setDataLibros({
      ...dataLibros,
      title : inputValue
    });
  }
  
  // Funcion de eliminar autor de la lista prestado a 
  const handleClickClearBorrowedTo=(_, data)=>{
    const existePrestadoAgregado = dataLibros.borrowed_to_added.some(prestado=>prestado.id === data.id);
    setDataLibros(prev=>{
      const actualizarPrestado = prev.borrowed_to.filter(prestado=>prestado.id!==data.id);
      const actualizarPrestadoAgregados = prev.borrowed_to_added.filter(prestado=>prestado.id!==data.id);
      const actualizarPrestadoEliminar = existePrestadoAgregado ?  prev.borrowed_to_deleted : [...prev.borrowed_to_deleted, data];
      return {
        ...prev,
        borrowed_to : actualizarPrestado,
        borrowed_to_added : actualizarPrestadoAgregados,
        borrowed_to_deleted : actualizarPrestadoEliminar
      }
    })
  }
  // Funcion de agregar a la lista prestado a
  const handleClickAddBorrowedTo=(data)=>{
    if (!dataLibros.borrowed_to.some(borrow=>borrow.id === data.id)) {
      setDataLibros(prev=>({
        ...prev,
        borrowed_to : [...prev.borrowed_to, data],
        borrowed_to_added : [...prev.borrowed_to_added, data]
      }))
    }else {
      toast({
        variant :"destructive",
        title : "Error",
        description : "No se puede agregar el mimo usuario 2 veces"
      })
    }
  }
  // Funcion de guardar la informacion en el libro
  const handleClickSave=async()=>{
    console.log(dataLibros);
    
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
    handleClickSaveUpdate(dataLibros);
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
          <PopoverAddList
            handleClickAddMember={handleClickAddAuthor}
            textButton='Agregar Autor'
            data={dataAutores}
            dataMembers={false}
          />
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
