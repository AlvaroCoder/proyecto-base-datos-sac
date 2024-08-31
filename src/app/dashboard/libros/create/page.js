"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState } from 'react'

import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import {Loader2} from "lucide-react"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFetch } from '@/components/hooks/customHooks';
import { DropdownMenuLocation } from '@/components';

const URL_STATUS = "http://127.0.0.1:8000/home/status"
const URL_LOCATIONS = "http://127.0.0.1:8000/home/locations"
export default function Page() {

  const {dataResponse : dataLocation, loading : loadingDataLocation, error : errorDataLocation} = useFetch(URL_LOCATIONS);
  const {dataResponse : dataStatus, loading : loadingDataStatus, error : errorDataStatus} = useFetch(URL_STATUS);

  const [listAuthors, setListAuthors] = useState([]);
  const [inputAuthor, setInputAuthor] = useState({
    title:"",
    author : [],
    location : 1,
    status : 1,
    borrow_to : null,
    amount : 1
  });

  const [nameLocation, setNameLocation] = useState();
  const [nameAuthor, setNameAuthor] = useState("");
  const [nameStatus, setNameStatus] = useState();

  const handleClickAddAuthor=(evt)=>{
    evt.preventDefault();
    if(nameAuthor=="")return alert("Complete el campo");
    setInputAuthor((prevState)=>({
      ...prevState,
      author : [...prevState.author, {name : nameAuthor}]
    }))
    setNameAuthor("");
  }
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <section>
          <h1 className='font-bold text-guinda text-2xl'>Nuevo Libro</h1>    
          <div>
              <h1>Titulo</h1>
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
            <h1>Autor</h1>
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
                      inputAuthor.author.map(author=>
                      <TableRow>
                        <TableCell>
                          {
                            author?.name
                          }
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost">
                            <DeleteIcon/>
                          </Button>
                        </TableCell>
                      </TableRow>)
                    }
                  </TableBody>
                </Table>
              }
            </div>
          </div>
          <div>
            <h1>Ubicación</h1>
            <DropdownMenuLocation
              data={dataLocation?.locations}
              isLoading={loadingDataLocation}
            />
          </div>
          <div>
            <h1>Status</h1>

          </div>
        </section>
    </div>
  )
}
