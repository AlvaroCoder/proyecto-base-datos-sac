"use client"
import React,{useState} from 'react'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'

import DropwDownMenuLibros from '@/components/elementos/Tabla/dropDownMenuLibros'
import DropDownTablaLibros from '@/components/elementos/Tabla/dropdownTablaLibros'
import DialogEditLibro from "@/components/elementos/Tabla/dialogEditLibro";

import Link from 'next/link'

function obtenerEstadosUnicos(listaObjetos) {
    const estadosUnicos = [...new Set(listaObjetos.map(objeto => objeto.status.value))];
    return estadosUnicos;
}

function obtenerPrestadosUnicos(listaObjetos) {
    const estadosUnicos = [...new Set(listaObjetos.map(objeto => objeto.Prestadoa))];
    return estadosUnicos;
}

function obtenerUbicacionUnica(listaObjetos) {
    const estadosUnicos = [...new Set(listaObjetos.map(objeto => objeto.Ubicacion))];
    return estadosUnicos;
}


export default function TableLibros({dataLibros=[], dataStatus=[], dataLocations=[]}) {
    const newDataLibros = dataLibros.map((item,key)=>({...item, Seleccionado : false, Id : key}));
    const [librosData, setLibrosData] = useState(newDataLibros);

    const LIBROS_POR_PAGINA=10;
    const [currentPage, setCurrentPage]=useState(1);
    const [stateData, setstateData] = useState("");
    const [query, setQuery] = useState("");

    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [dataDialogEdit, setDataDialogEdit] = useState(null);

    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    } ;

    const estadosSinRepetir=obtenerEstadosUnicos(librosData);
    // TODO : terminar de hacer las filtraciones por Ubicacion y Prestado a
    const prestadosNombreSinRepetir = obtenerPrestadosUnicos(librosData);
    const ubicaionSinRepetir=obtenerUbicacionUnica(librosData);


    const filterData = librosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    const filterChekButton=filterData.filter(item=>item?.status?.value.toUpperCase().includes(stateData.toUpperCase()));

    // Paginado
    const indexOfLasBook = currentPage * LIBROS_POR_PAGINA;
    const indexOfFirstBook = indexOfLasBook - LIBROS_POR_PAGINA;
    const currentData = filterChekButton.slice(indexOfFirstBook, indexOfLasBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const numBooks = librosData.length

    const handleChangeEditLibro=(data)=>{        
        setOpenDialogEdit(true);
        setDataDialogEdit(data);
    }

    return (
    <div className='w-full '>
        <div className='flex items-center py-4'>
            <Input
                placeholder="Buscar Titulo ..."
                onChange={onChangeInput}        
            />
            <Link
                className="bg-guinda mx-2 h-9 px-4 py-2 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg text-sm "
                href={"/dashboard/libros/create"}
            >
                <AddIcon/> <span className='ml-2 flex-1 whitespace-nowrap' >Nuevo Libro</span>           
             </Link>
            {
                librosData.filter(libro=>libro.Seleccionado).length > 0 && <Button className="border-2 mx-2 border-guinda bg-white hover:bg-red-50 text-guinda">
                    <p className='flex flex-row items-center'><DeleteIcon/> <span>Eliminar libro</span></p>
                </Button>
            }
            <DropdownMenu>
                <DropdownMenuTrigger >
                    <Button variant="ghost" >
                        <span>Estado</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="bottom">
                    {
                        estadosSinRepetir.map((item, key)=>
                        <DropdownMenuCheckboxItem 
                        key={key} 
                        className="capitalize" 
                        checked={item==stateData}
                        onCheckedChange={()=>{
                            setQuery("");
                            if(item==stateData){
                                setstateData("")
                                return;
                            }
                            setstateData(item)
                        }}
                        >{item}</DropdownMenuCheckboxItem>)
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className='rounded-md border mb-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead> 
                            <Checkbox
                            checked={librosData.filter(libro=>libro.Seleccionado).length == librosData.length || (librosData.filter(libro=>libro.Seleccionado).length > 0 && "indeterminate")}
                            onCheckedChange={(_)=>{
                                const newListLibros = librosData.map(libro=>({...libro, Seleccionado : !libro.Seleccionado}))
                                setLibrosData(newListLibros);
                            }}
                        /></TableHead>
                        <TableHead className="w-[400px]">Titulo</TableHead>
                        <TableHead
                        className="w-[350px]"
                        >Autor</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className=" w-[170px]  "><LocationOnIcon/>Ubicacion</TableHead>
                        <TableHead>Prestado a</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((item, key)=>{
                        return(
                            <TableRow key={key} className={`${item?.Seleccionado && "bg-slate-200 hover:bg-slate-200"}  `}>
                            <TableCell>
                                <Checkbox
                                    checked={item.Seleccionado}
                                    onCheckedChange={(_)=>{
                                        const newListLibros = librosData.map((libro, idx)=>{
                                            if (key==idx && libro.Seleccionado) {
                                                return{
                                                    ...libro,
                                                    Seleccionado : false
                                                }
                                            }
                                            if(key==idx || libro.Seleccionado){
                                                return{
                                                    ...libro,
                                                    Seleccionado : true
                                                }
                                            }
                                            return{
                                                ...libro,
                                                Seleccionado : false
                                            }
                                        });
                                        setLibrosData(newListLibros);
                                    }}
                                />
                            </TableCell>
                            <TableCell
                                className=""
                            >{item?.title}</TableCell>
                            <TableCell
                               className=" grid grid-cols-[repeat( auto-fill, minmax(100px, 1fr) )] grid-flow-col    h-auto"
                            ><>{item?.author && item.author.map((autor,key)=>{
                                if (key<2) {
                                    return <span key={key} className='p-2 bg-slate-100 rounded-sm mr-2 text-center w-fit '>{autor}</span>
                                }
                                return null
                            })}{item.author.length>2 && <span className='flex items-center justify-center cursor-pointer '>
                                <Dialog>
                                    <DialogTrigger>
                                        <span><MoreHorizIcon/></span>
                                    </DialogTrigger>
                                    <DialogContent className="w-fit p-8">
                                        <DialogHeader className={"font-bold text-guinda text-2xl"}>
                                            Autores
                                        </DialogHeader>
                                        <div className='w-full flex flex-col '>
                                           {item?.author.map((autor, key)=><p className='text-xl ' key={key}><PersonIcon className='mr-4'/>{autor}</p>)}
                                        </div>
                                    </DialogContent>
                                </Dialog></span>}</>
                            </TableCell>
                            <TableCell>{item?.status?.value}</TableCell>
                            <TableCell><p className='text-center w-full '>{item?.location?.value}</p></TableCell>
                            <TableCell><p className='text-center w-full'>{item?.borrow_to == "NO PRESTADO" ? "--" : item?.borrowed_to}</p></TableCell>
                            <TableCell>
                               <DropDownTablaLibros 
                                onOpenChangeDialogEdit={()=>handleChangeEditLibro(item)} />
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </div>
        <div>
            <DialogEditLibro 
                openDialogEditLibro={openDialogEdit} 
                onOpenChangeEditLibro={setOpenDialogEdit}
                dataLibro={dataDialogEdit}
                dataUbicacion={dataLocations}
                dataStatus={dataStatus}
                />
        </div>
        <div className="flex justify-center my-8">
          <nav className="relative z-0 inline-flex rounded-md  -space-x-px" aria-label="Pagination">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              variant="ghost"
            >
              <span>Anterior</span>
            </Button>
            <div className='mx-4  px-4 flex flex-row'>
            {currentPage > 3 && <div>
                    <Button
                        variant="ghost"
                        className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium  text-gray-700 hover:bg-gray-50 `}
                        onClick={()=>paginate(1 )}
                    >
                        1
                    </Button>
                    <MoreHorizIcon/>
                </div>}
            {Array.from({ length: Math.ceil(numBooks / LIBROS_POR_PAGINA) }).map((_, index) => {

                if (index<currentPage+3) {
                    return (
                        <Button
                        key={index + 1}
                        variant="ghost"
                        onClick={() =>{
                            paginate(index + 1)
                        }}
                        className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium ${
                            currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'
                        } text-gray-700 hover:bg-gray-50 ${currentPage-3 > index && 'hidden'}`}
                        >
                        {index + 1}
                        </Button>
                    )
                }
                return null
            })}
            {
                currentPage < Math.ceil(numBooks / LIBROS_POR_PAGINA)-4 && 
                <div>
                    <MoreHorizIcon/>
                    <Button
                        variant="ghost"
                        className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium  text-gray-700 hover:bg-gray-50 `}
                        onClick={()=>paginate(1 )}
                    >
                        {Math.ceil(numBooks / LIBROS_POR_PAGINA)}
                    </Button>
                </div>
            }
            </div>
            <Button
              onClick={() => paginate(currentPage + 1)}
              variant="ghost"
              disabled={currentPage === Math.ceil(numBooks / LIBROS_POR_PAGINA)}
            >
              <span>Siguiente</span>
            </Button>
          </nav>
        </div>
    </div>
  )
}

