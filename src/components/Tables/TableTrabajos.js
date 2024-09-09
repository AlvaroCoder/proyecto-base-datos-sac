"use client"
import React, { useMemo, useState } from 'react'
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';

export default function TableTrabajos({dataTrabajos=[]}) {
    const newDataTrabajos = dataTrabajos.map((item)=>({...item, Seleccionado : false}));
    const [trabajosData, setTrabajosData] = useState(newDataTrabajos);

    const TRABAJOS_POR_PAGINA=10;
    const [currentPage, setCurrentPage]=useState(1);
    const [stateData, setstateData] = useState("");
    const [query, setQuery] = useState("");     

    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    } ;

    const filterData = useMemo(()=>{
        return trabajosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    },[trabajosData, query]);

    const indexLast = currentPage * TRABAJOS_POR_PAGINA;
    const indexFirst = indexLast - TRABAJOS_POR_PAGINA;
    const currentData = useMemo(()=>{
        return filterData.slice(indexFirst, indexLast)
    },[filterData, indexFirst, indexLast]);

    const paginate = (pageNumber)=>setCurrentPage(pageNumber);
    const numBooks = trabajosData.length;

  return (
    <div className='w-full'>
        <div className='flex items-center py-4'>
            <Input
                placeholder="Busca un trabajo ..."
                onChange={onChangeInput}
            />
        </div>
        <div className='rounded-sm border mb-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={trabajosData.filter(trabajo=>trabajo.Seleccionado).length == trabajosData.length || (trabajosData.filter(trabajo=>trabajo.Seleccionado).length > 0 && "indeterminate")}
                                onCheckedChange={(_)=>{
                                    const newListTrabajos = trabajosData.map(trabajo=>({...trabajo, Seleccionado : !trabajo.Seleccionado}))
                                    setTrabajosData(newListTrabajos)
                                }}
                            />
                        </TableHead>
                        <TableHead className="w-[400px]">
                            Titulo
                        </TableHead>
                        <TableHead>
                            Curso
                        </TableHead>
                        <TableHead>
                            Año
                        </TableHead>
                        <TableHead>
                            Link
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        currentData.length > 0?
                        (
                            currentData.map((item,key)=>{
                                return(
                                    <TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={item.Seleccionado}
                                                onCheckedChange={(_)=>{
                                                    const newListTrabajos = trabajosData.map((trabajo,idx)=>{
                                                        if (key===idx && trabajo.Seleccionado) {
                                                            return{
                                                                ...trabajo,
                                                                Seleccionado : false
                                                            }
                                                        }
                                                        if (key==idx || trabajo.Seleccionado) {
                                                            return{
                                                                ...trabajo,
                                                                Seleccionado:true
                                                            }
                                                        }
                                                        return{
                                                            ...trabajo,
                                                            Seleccionado:false
                                                        }
                                                    });
                                                    setTrabajosData(newListTrabajos);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item?.title}
                                        </TableCell>
                                        <TableCell>
                                            {item?.course}
                                        </TableCell>
                                        <TableCell>
                                            {item?.year}
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                href={item?.link}
                                                target='_blank'
                                            >
                                                <h1 className='underline text-guinda'>Ver archivo</h1>
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : 
                        (
                            <TableRow className="text-center">
                                <TableCell colSpan={5}><h1 className='py-6'>No se encontraron resultados</h1></TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    </div>
  )
}
