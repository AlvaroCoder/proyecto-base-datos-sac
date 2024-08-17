"use client"
import React,{useState} from 'react'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'

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
export default function TableLibros({dataLibros=[]}) {
    
    const [stateData, setstateData] = useState("");

    const [query, setQuery] = useState("");
    
    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    } ;

    const estadosSinRepetir=obtenerEstadosUnicos(dataLibros);
    // TODO : terminar de hacer las filtraciones por Ubicacion y Prestado a
    const prestadosNombreSinRepetir = obtenerPrestadosUnicos(dataLibros);
    const ubicaionSinRepetir=obtenerUbicacionUnica(dataLibros);
    
    
    const filterData = dataLibros.filter(item=>item.Titulo.toUpperCase().includes(query.toUpperCase()))
    const filterChekButton=filterData.filter(item=>item.Estado.toUpperCase().includes(stateData.toUpperCase()));
    const currentData = filterChekButton;
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
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead> <Checkbox/></TableHead>
                        <TableHead>Titulo</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Ubicacion</TableHead>
                        <TableHead>Prestado a</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((item, key)=>(
                        <TableRow key={key}>
                            <TableHead><Checkbox/></TableHead>
                            <TableCell>{item?.Titulo}</TableCell>
                            <TableCell>{typeof(item?.Autor) == "string" ? item.Autor : item.Autor[0]}</TableCell>
                            <TableCell>{item?.Estado}</TableCell>
                            <TableCell>{item.Ubicacion}</TableCell>
                            <TableCell>{item?.["Prestadoa"]}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertIcon className='h-4 w-4'/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="bottom">
                
                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

