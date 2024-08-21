"use client"
import React,{useState} from 'react'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'

function obtenerEstadosUnicos(listaObjetos) {
    const estadosUnicos = [...new Set(listaObjetos.map(objeto => objeto.Estado))];
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

function DropwDownMenuLibros({Título, Autor, Estado, Ubicación, Prestadoa}) {
    const [openDropwdown, setOpenDropwdown] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dataLibro, setDataLibro] = useState({
        titulo : Título,
        ubicacion : Ubicación,
        autor : Autor,
        prestadoa : Prestadoa
    });
    return(
        <DropdownMenu open={openDropwdown}>
        <DropdownMenuTrigger asChild >
            <Button variant="ghost" onClick={()=>setOpenDropwdown(!openDropwdown)} className="h-8 w-8 p-0">
                <MoreVertIcon className='h-4 w-4'/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="bottom">

            <DropdownMenuItem  >
                <Dialog open={openDialog} >
                    <DialogTrigger  >
                        <Button
                         variant="ghost" 
                         className="p-2 flex flex-row items-center"
                         onClick={()=>setOpenDialog(true)}
                         ><EditIcon className=' mr-2'/>Editar</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className={"font-bold text-guinda text-2xl"}>Editar Libro</DialogHeader>
                        <section>
                            <div>
                                <label>Titulo</label>
                                <Input 
                                    value={dataLibro.titulo}
                                />
                            </div>
                            <div>
                                <label>Autor</label>
                                <Input  
                                    value={dataLibro.autor}
                                />
                            </div>
                            <div className='flex flex-row items-center'>
                                <div className='w-[300px]'>
                                    <label>Ubicacion</label>
                                    <Input  
                                        value={dataLibro.ubicacion}
                                    />
                                </div>
                                <div className='flex-1 ml-2'>
                                    <label>Estado</label>
                                    <Input  />
                                </div>
                            </div>
                            <div className='flex-1 border-b-2 border-b-guindaOpaco py-2 my-4'>
                                <h1>
                                    Datos de la persona que presto
                                </h1>
                            </div>
                            <div>
                                <label>Nombre</label>
                                <Input/>
                            </div>
                            <div>
                                <label>Apellido</label>
                                <Input/>
                            </div>
                            <div className='flex flex-row items-center my-4'>
                                 <Button 
                                 className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                                onClick={()=>{
                                    setOpenDialog(false);
                                    setOpenDropwdown(!openDropwdown)
                                }}
                                 >
                                   <SaveIcon/><span className='ml-2'> Guardar</span>
                                </Button>
                                <Button 
                                variant="ghost"
                                onClick={()=>{
                                    setOpenDialog(false);
                                    setOpenDropwdown(!openDropwdown)
                                }}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </section>
                    </DialogContent>

                </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Dialog>
                    <DialogTrigger>
                     <Button 
                        variant="ghost" 
                        className="p-2 flex flex-row items-center"
                        
                        ><DeleteIcon className='mr-2'/>Eliminar</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className={"font-bold text-guinda text-2xl "}>
                            Eliminar Libro
                        </DialogHeader>
                        <div className='w-full bg-slate-100 h-[1px]'>

                        </div>
                        <section>
                            <h1 className=' mb-2'>Estas seguro de eliminar el libro</h1>
                            <h1 className='text-2xl font-bold  mb-4'>"{dataLibro.titulo}"</h1>
                            <Button className="bg-guinda w-full py-2"
                            onClick={()=>{
                                    setOpenDropwdown(!openDropwdown)
                                }}>Eliminar Libro </Button>
                        </section>
                    </DialogContent>
                </Dialog>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default function TableLibros({dataLibros=[]}) {
    const LIBROS_POR_PAGINA=10;
    const [currentPage, setCurrentPage]=useState(1);
    const [stateData, setstateData] = useState("");
    const [query, setQuery] = useState("");

    const onChangeInput=(e)=>{

        setQuery(e.target.value);
    } ;

    const estadosSinRepetir=obtenerEstadosUnicos(dataLibros);
    // TODO : terminar de hacer las filtraciones por Ubicacion y Prestado a
    const prestadosNombreSinRepetir = obtenerPrestadosUnicos(dataLibros);
    const ubicaionSinRepetir=obtenerUbicacionUnica(dataLibros);
    


    const filterData = dataLibros.filter(item=>item.Título.toUpperCase().includes(query.toUpperCase()))
    const filterChekButton=filterData.filter(item=>item.Estado.toUpperCase().includes(stateData.toUpperCase()));

    // Paginado
    const indexOfLasBook = currentPage * LIBROS_POR_PAGINA;
    const indexOfFirstBook = indexOfLasBook - LIBROS_POR_PAGINA;
    const currentData = filterChekButton.slice(indexOfFirstBook, indexOfLasBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const numBooks = dataLibros.length
    return (
    <div className='w-full '>
        <div className='flex items-center py-4'>
            <Input
                placeholder="Buscar Titulo ..."
                onChange={onChangeInput}        
            />
            <DropdownMenu>
                <DropdownMenuTrigger className='mx-4'>
                    <Button variant="ghost" >
                        <span>Estado</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="bottom">
                    {
                        estadosSinRepetir.map((item, key)=><DropdownMenuCheckboxItem 
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
                        <TableHead> <Checkbox/></TableHead>
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
                    {currentData.map((item, key)=>(
                        <TableRow key={key} className="">
                            <TableHead><Checkbox/></TableHead>
                            <TableCell
                                className=""
                            >{item?.Título}</TableCell>
                            <TableCell
                               className=" grid grid-cols-[repeat( auto-fill, minmax(100px, 1fr) )] grid-flow-col    h-auto"
                            >{typeof(item?.Autor) == "string" ? <span className='p-2 bg-slate-100 rounded-sm mr-2 w-fit'>{item.Autor}</span> 
                            : <>{item.Autor.map((autor,key)=>{
                                if (key<2) {
                                    return <span key={key} className='p-2 bg-slate-100 rounded-sm mr-2 text-center w-fit '>{autor}</span>
                                }
                                return null
                            })}{item.Autor.length>2 && <span className='flex items-center justify-center '>
                                <Dialog>
                                    <DialogTrigger>
                                        <span><MoreHorizIcon/></span>
                                    </DialogTrigger>
                                    <DialogContent className="w-fit p-8">
                                        <DialogHeader className={"font-bold text-guinda text-2xl"}>
                                            Autores
                                        </DialogHeader>
                                        <div className='w-full flex flex-col '>
                                           
                                           {item.Autor.map((autor, key)=><p className='text-xl ' key={key}><PersonIcon className='mr-4'/>{autor}</p>)}
                                           
                                        </div>
                                    </DialogContent>
                                </Dialog></span>}</>}
                            </TableCell>
                            <TableCell>{item?.Estado}</TableCell>
                            <TableCell><p className='text-center w-full '>{item.Ubicación}</p></TableCell>
                            <TableCell><p className='text-center w-full'>{item?.["Prestado a"] && item?.["Prestado a"] == "NO PRESTADO" ? "--" : item["Prestado a"]}</p></TableCell>
                            <TableCell>
                               <DropwDownMenuLibros {...item}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
                currentPage < Math.ceil(numBooks / LIBROS_POR_PAGINA)-4 && <div>
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

