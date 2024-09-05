"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState } from 'react'

import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useFetch } from '@/components/hooks/customHooks';
import { DropdownMenuLocation, DropdownMenuStatus } from '@/components';

const URL_STATUS = "http://127.0.0.1:8000/home/status/book"
const URL_LOCATIONS = "http://127.0.0.1:8000/home/locations"
const URL_CREATE_BOOK = "http://127.0.0.1:8000/create/book"
export default function Page() {

  const {dataResponse : dataLocation, loading : loadingDataLocation, error : errorDataLocation} = useFetch(URL_LOCATIONS);
  const {dataResponse : dataStatus, loading : loadingDataStatus, error : errorDataStatus} = useFetch(URL_STATUS);

  console.log(dataStatus);
  
  const [inputAuthor, setInputAuthor] = useState({
    title:"",
    author : [],
    location : 1,
    status : 1,
    borrowed_to : null,
    amount : 1
  });

  const [dataBorrowToPeople, setDataBorrowToPeople] = useState({
    first_name : "",
    last_name : ""
  })
  const [nameAuthor, setNameAuthor] = useState("");

  const handleChangeCheckedLocation=(id)=>{
    setInputAuthor({
      ...inputAuthor,
      location : id
    })
  }
  const handleChangeCheckedStatus=(id)=>{
    setInputAuthor({
      ...inputAuthor,
      status : id
    })
  }
  const handleClickAddAuthor=(evt)=>{
    evt.preventDefault();
    if(nameAuthor=="")return alert("Complete el campo");
    setInputAuthor((prevState)=>({
      ...prevState,
      author : [...prevState.author, {name : nameAuthor}]
    }))
    setNameAuthor("");
  }
  const handleChangeBorrowedToPerson=(evt)=>{
    const target = evt.target;
    setDataBorrowToPeople({
      ...dataBorrowToPeople,
      [target.name] : target.value
    });
    if (target.name === "first_name") {
      setInputAuthor((prevState)=>({
        ...prevState,
        borrowed_to : {...prevState.borrowed_to , first_name : target.value}
      }))
    }
    if (target.name === "last_name") {
      setInputAuthor((prevState)=>({
        ...prevState,
        borrowed_to : {...prevState.borrowed_to, last_name : target.value}
      }))
    }

  }
  const handleDeleteAuthor=(idAuthor)=>{
    const newListAuthor = inputAuthor.author.filter((_, idx)=>idx !== idAuthor);
    setInputAuthor({
      ...inputAuthor,
      author : newListAuthor
    })
  }
  const handleClickSendData=async()=>{
    console.log(inputAuthor);
    const response = await fetch(URL_CREATE_BOOK,{
      method : 'POST',
      body : JSON.stringify(inputAuthor),
        headers : {
          'Content-type':'application/json'
        }
    });
    const responseJson = await response.json();
    console.log(responseJson);
    
    
  }
  return (
    <div className='w-full h-screen overflow-y-auto px-6 py-4 flex flex-row'>
        <section className='rounded-lg shadow-sm p-4 h-fit pb-4 w-full  max-w-[50%] mb-6  '>
          <h1 className='font-bold text-guinda text-2xl mb-4'>Nuevo Libro</h1>    
          <div>
              <h1 className='font-bold'>Titulo</h1>
              <Input
                value={inputAuthor.title}
                onChange={(evt)=>{
                  setInputAuthor({
                    ...inputAuthor,
                    title : evt.target.value
                  })
                }}
              />
          </div>
          <div>
            <h1 className='font-bold'>Autor</h1>
            <div className='flex flex-row items-center'>
              <Input
                value={nameAuthor}
                onChange={(evt)=>setNameAuthor(evt.target.value)}
              />
              {
                nameAuthor && <Button
                onClick={handleClickAddAuthor}
                className="bg-guinda mx-2 h-9 px-4 py-2 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg"
                >Agregar Autor</Button>
              }
            </div>
            <div className='my-4'>
              {
                inputAuthor.author.length > 0 &&
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        Nombre del Autor
                      </TableHead>
                      <TableHead>
                        <ModeIcon/>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      inputAuthor.author.map((author, key)=>
                      <TableRow>
                        <TableCell>
                          {
                            author?.name
                          }
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost"
                            onClick={()=>handleDeleteAuthor(key)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>)
                    }
                  </TableBody>
                </Table>
              }
            </div>
          </div>
            <div className='flex flex-row items-center my-4'>
              <div className=''>
                <h1 className='font-bold'>Ubicación</h1>
                <DropdownMenuLocation
                  data={dataLocation?.locations}
                  isLoading={loadingDataLocation}
                  onChangeData={handleChangeCheckedLocation}
                />
              </div>
              <div className='px-4 ml-4'>
                <h1 className='font-bold'>Estado</h1>
                <DropdownMenuStatus
                  data={dataStatus?.status}
                  isLoading={loadingDataStatus}
                  onChangeData={handleChangeCheckedStatus}
                />
              </div>
            </div>
            <section>
              <h1 className='font-bold'>Prestado a</h1>
              <div className='flex-1 flex flex-row items-center '>
                <div className='flex-1'>
                  <h1>Nombre</h1>
                  <Input
                    name="first_name"
                    value={dataBorrowToPeople.first_name}
                    onChange={handleChangeBorrowedToPerson}
                  />
                </div>
                <div className='flex-1 ml-4'>
                  <h1>Apellido</h1>
                  <Input
                    name="last_name"
                    value={dataBorrowToPeople.last_name}
                    onChange={handleChangeBorrowedToPerson}
                  />
                </div>
              </div>
              
            </section>
            <div className='flex flex-row mt-8'>
              <Button
                className="flex-1 bg-guinda mr-4 h-9  py-2 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg"
                onClick={handleClickSendData}
                >
                Guardar Libro
              </Button>
              <Button>
                Cancelar
              </Button>
            </div>
        </section>
        <section className='flex-1 ml-4 shadow-sm p-4 rounded-lg h-fit'>
          <div className='flex-1 py-4 flex justify-center items-center'>
          <BookIcon className='text-guinda text-6xl'/>
          </div>
          <div className='flex-1 flex flex-col items-center '>
            <h1 className='text-xl font-bold'>"{inputAuthor.title}"</h1>
            <div className='my-6'>
              {
                inputAuthor.author.map(author=>
                  <p><PersonIcon/> {author?.name}</p>
                )
              }
            </div>
            <div className='flex flex-row justify-center '>
              <p className='flex items-center mx-4'><LocationOnIcon/> {dataLocation?.locations?.filter(locat=>locat.id === inputAuthor.location)[0]?.value}</p>
              <p className='flex items-center mx-4'><StarBorderIcon/>{dataStatus?.status?.filter(stat=>stat.id === inputAuthor.status)[0]?.value}</p>
            </div>
            <div className='flex flex-row items-center mt-4'>
             <h1 className='flex items-center'><PersonIcon className='mr-2'/> {inputAuthor.borrowed_to?.first_name}</h1>
             <h1 className='ml-2'>{inputAuthor.borrowed_to?.last_name}</h1>
            </div>
            
          </div>
        </section>
        
    </div>
  )
}
