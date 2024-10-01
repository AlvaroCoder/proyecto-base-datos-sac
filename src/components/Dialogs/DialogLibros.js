"use client"
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export default function DialogLibros({
  dataDialog,
  dataLocation=[],
  dataStatus=[],
  dataPeopleBorrowTo=[],
  handleChangeExistChanges,
  setDataDialog : setDataDialogLibros,
  handleChangeNotExistChanges
}) {

  const refInputNameAuthor=useRef(null);

  const [showFormNewAuthor, setShowFormNewAuthor] = useState(false);
  const [showFormNewPerson, setShowFormNewPerson] = useState(false);
  const [inputDataNewPersona, setInputDataNewPersona] = useState({
    nombrePersona : "",
    apellidoPersona : ""
  })

  const handleClickClearData=()=>{
    const updateData=[...dataDialog?.authors].filter((_,idx)=>idx!==key);
    const existAuthorInAdded = []
  }
  const handleClickShowFormNewAuthor=()=>{
    setShowFormNewAuthor(!showFormNewAuthor);
  }
  const handleClickShowFormNewPerson=()=>{
    setShowFormNewPerson(!showFormNewPerson);
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
  const handleClickAddPerson=(evt)=>{
    evt.preventDefault();

  }
  const handleClickCancelPerson=(evt)=>{
    evt.preventDefault();
    setShowFormNewPerson(false);

  }
  const handleClickCancelAuthor=(evt)=>{
    evt.preventDefault();
    setShowFormNewAuthor(false);
    refInputNameAuthor.current.value=null;
  }
  const handleChangeCheckedDopdown=(id, keyValue)=>{
    const jsonSelected = keyValue == "location" ? dataLocation?.filter(elem=>elem?.id === id) : dataStatus?.filter(elem=>elem?.id === id)[0];
    setDataDialogLibros({
      ...dataDialog,
      [keyValue] : jsonSelected
    });
    handleChangeExistChanges(); 
  }
  const handleChangeNewPersona=(evt)=>{
    const target = evt.target;
    setInputDataNewPersona({
      ...inputDataNewPersona,
      [target.name] : target.value
    });
  }
  const handleClickDeletePeopleTable=(index)=>{
    const newListPeopleBorrow=dataPeopleBorrowTo?.filter((_,indexpeople)=>indexpeople !== index)
  }
  const handleChangeTitleDialog=(evt)=>{
    const inputValue = evt.target.value;
    if (inputValue !== dataDialog.title) {
      handleChangeExistChanges()
    }
    setDataDialogLibros({
      ...dataDialog,
      title : inputValue
    });
  }
  return (
    <section>
      <div className='my-2'>
        <h1>Titulo</h1>
        <Input
          name="title"
          value={dataDialog.title}
          onChange={handleChangeTitleDialog}
        />
      </div>
      <div className='my-2'>
        <h1>Autor</h1>
        <div className='w-full rounded-lg flex flex-wrap gap-x-4 gap-y-2 items-center'>
          {
            dataDialog?.authors?.map((author, key)=>{
              return (
                <p key={key} className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'>
                  <span className='mr-2'>
                    {author?.value}
                    <ClearIcon
                      className='cursor-pointer'
                      onClick={handleClickClearData}
                    />
                  </span>
                </p>
              )
            })
          }
        </div>
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
          <h1 className='font-bold'>Ubicacion</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghot"
                className="w-full border-gray-100 border-[1px] shadow-sm"
              >
                <span>{dataDialog?.location[0]?.value}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                dataLocation?.map(item=>
                  <DropdownMenuCheckboxItem
                    checked={item?.id === dataDialog?.location[0]?.id}
                    className="capitalize"
                    onCheckedChange={()=>handleChangeCheckedDopdown(item.id, "location")}
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
                variant="ghost"
                className="w-full border-gray-100 border-[1px] shadow-sm"
              >
                <span>{dataDialog?.status?.value}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                dataStatus?.map(item=>
                  <DropdownMenuCheckboxItem
                    checked={item.id === dataDialog?.status?.id}
                    onCheckedChange={()=>handleChangeCheckedDopdown(item.id,"status")}
                  >
                    {item.value}
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
        {
          dataPeopleBorrowTo?.length > 0 &&
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead><DeleteIcon/></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                dataPeopleBorrowTo?.map((people,idx)=>(
                  <TableRow key={idx}>
                    <TableCell>{people?.nombre}</TableCell>
                    <TableCell>{people?.apellido}</TableCell>
                    <TableCell>
                      <Button
                        onClick={()=>handleClickDeletePeopleTable(idx)}
                      >
                        <DeleteIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        }
      </div>
      <div>
        {
          showFormNewPerson ?
          <section className='p-4 rounded-lg bg-slate-50'>
            <h1 className='font-bold'>Nueva Persona</h1>
            <div className='' >
              <div className='flex flex-row items-center mb-2'>
                <div className='flex-1'>
                  <label className='text-sm' htmlFor='nombrePersona'>Nombre</label>
                  <Input
                    name="nombrePersona"
                    value={inputDataNewPersona?.nombrePersona}
                    onChange={handleChangeNewPersona}
                  />
                </div>
                <div className='flex-1 ml-2'>
                  <label className='text-sm' htmlFor='apellidoPersona'>Apellido</label>
                  <Input
                    name="apellidoPersona"
                    value={inputDataNewPersona?.apellidoPersona}
                    onChange={handleChangeNewPersona}
                  />
                </div>
              </div>
              <div>
                <Button
                  className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                  onClick={handleClickAddPerson}
                >
                  Agregar
                </Button>
                <Button
                  variant="ghost"
                  className="mx-2"
                  onClick={handleClickCancelPerson}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </section> :
          <Button
            variant="ghost"
            className="text-guinda hover:bg-white underline hover:text-guinda"
            onClick={handleClickShowFormNewPerson}
          >
            Agregar Persona
          </Button>
        }
      </div>

    </section>
  )
}
