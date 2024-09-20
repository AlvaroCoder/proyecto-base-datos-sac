
"use client"
import React, { useMemo, useState } from 'react'
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Button } from '../ui/button';

export default function TableEquipos({dataEquipos=[], dataStatus=[], dataLocation=[]}) {
    console.log("Data equipos ", dataEquipos);
    
    const newDataEquipos = dataEquipos?.map((item)=>({...item, Seleccionado : false}));
    const [equiposData, setEquiposData] = useState(newDataEquipos);

    const EQUIPOS_POR_PAGINA=10;
    const [currentPage, setCurrentPage]=useState(1);
    const [stateData, setstateData] = useState("");
    const [query, setQuery] = useState("");       

    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    }

    const filterData = useMemo(()=>{
        return equiposData.filter(item=>item?.equipment?.toUpperCase().includes(query.toUpperCase()))
    },[equiposData, query]);

    const indexLast = currentPage * EQUIPOS_POR_PAGINA;
    const indexFirst = indexLast - EQUIPOS_POR_PAGINA;
    const currentData = useMemo(()=>{
        return filterData.slice(indexFirst, indexLast)
    },[filterData, indexFirst, indexLast]);

    const paginate=(pageNumber) => setCurrentPage(pageNumber);
    const numEquipos = equiposData.length;
  return (
    <div className='w-full'>
        <div className='flex items-center py-4'>
            <Input
                placeholder="Buscar un equipo ..."
                onChange={onChangeInput}
            />
        </div>
        <div className='rounded-md border mb-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={equiposData.filter(equipo=>equipo.Seleccionado).length === equiposData.length || (equiposData.filter(equipo=>equipo.Seleccionado).length > 0 && "indeterminate")}
                                onCheckedChange={(_)=>{
                                    const newListEquipos = equiposData.map(equipo=>({...equipo, Seleccionado : !equipo.Seleccionado }));
                                    setEquiposData(newListEquipos)
                                }}
                            />
                        </TableHead>
                        <TableHead className="w-[400px]">Equipo</TableHead>
                        <TableHead>Comentarios</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Origen</TableHead>
                        <TableHead>Año de Adquisición</TableHead>
                        <TableHead>Ubicacion</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        currentData.length > 0?
                        (
                            currentData.map((item, key)=>{
                                return(
                                    <TableRow key={key} className={`${item?.Seleccionado && "bg-slate-200 hover:bg-slate-200"}  `}>
                                        <TableCell>
                                            <Checkbox
                                                checked={item.Seleccionado}
                                                onCheckedChange={(_)=>{
                                                    const newListEquipos = equiposData.map((equipo, idx)=>{
                                                        if (key==idx && equipo.Seleccionado) {
                                                            return {
                                                                ...equipo,
                                                                Seleccionado : false
                                                            }
                                                        }
                                                        if(key==idx || equipo.Seleccionado){
                                                            return {
                                                                ...equipo,
                                                                Seleccionado : true
                                                            }
                                                        }
                                                        return {
                                                            ...equipo,
                                                            Seleccionado : false
                                                        }
                                                    });
                                                    setEquiposData(newListEquipos)
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item?.equipment}
                                        </TableCell>
                                        <TableCell>
                                            {item?.description}
                                        </TableCell>
                                        <TableCell>
                                            {item?.type}
                                        </TableCell>
                                        <TableCell>
                                            {item?.origin}
                                        </TableCell>
                                        <TableCell>
                                            {item?.year}
                                        </TableCell>
                                        <TableCell>
                                            {item?.location?.value}
                                        </TableCell>
                                        <TableCell>
                                            {item?.status?.value}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ):
                        (
                            <TableRow className="text-center">
                                <TableCell colSpan={8}><h1>No se encontraron resultados</h1></TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
        <div className='flex justify-center my-8'>
            {
                currentData.length > 0 &&
                <nav className="relative z-0 inline-flex rounded-md  -space-x-px" aria-label="Pagination">
                    <Button
                        onClick={()=>paginate(currentData - 1)}
                        disabled={currentPage === 1}
                        variant="ghost"
                    >
                        <span>Anterior</span>
                    </Button>
                    <div className='mx-4 px-4 flex flex-row'>
                        {
                            currentPage > 3 && <div>
                            <Button
                                variant="ghost"
                                className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium  text-gray-700 hover:bg-gray-50 `}
                                onClick={()=>paginate(1 )}
                            >
                                1
                            </Button>
                            <MoreHorizIcon/>
                            </div>
                        }
                        {
                            Array.from({length : Math.ceil(numEquipos / EQUIPOS_POR_PAGINA)}).map((_,index)=>{
                                if (index < currentPage + 3) {
                                    return (
                                        <Button
                                            key={index+1}
                                            variant="ghost"
                                            onClick={()=>{
                                                paginate(index+1)
                                            }}
                                            className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium ${
                                                currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'
                                            } text-gray-700 hover:bg-gray-50 ${currentPage-3 > index && 'hidden'}`}
                                        >
                                            {index+1}
                                        </Button>
                                    )
                                }
                                return null
                            })
                        }
                        {
                            currentPage < Math.ceil(numEquipos / EQUIPOS_POR_PAGINA)-4 && 
                            <div>
                                <MoreHorizIcon/>
                                <Button
                                    variant="ghost"
                                    className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium  text-gray-700 hover:bg-gray-50 `}
                                    onClick={()=>paginate(Math.ceil(numEquipos / EQUIPOS_POR_PAGINA))}
                                >
                                    {Math.ceil(numEquipos/ EQUIPOS_POR_PAGINA)}
                                </Button>
                            </div>
                        }
                    </div>
                    <Button
                        onClick={()=>paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(numEquipos / EQUIPOS_POR_PAGINA)}
                        variant="ghost"
                    >
                        <span>Siguiente</span>
                    </Button>
                </nav>
            }
        </div>
    </div>
  )
}
