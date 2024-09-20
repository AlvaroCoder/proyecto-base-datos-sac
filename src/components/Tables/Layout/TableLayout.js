"use client"
import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Checkbox } from '../../ui/checkbox'
import { Button } from '@/components/ui/button'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


export default function TableLayout({
    currentData=[],
    titlesData=[],
    handleChangeInput,
    handleChangeChecked,
    handleCheckedRow,
    keysData=[],
    currentPage=1,
    handlePaginate,
    dataPerPage=10,
    numData
}) 
{   
  return (
    <div className='w-full'>
        <div className='flex items-center py-4'>
            <Input
                placeholder="Buscar ..."
                onChange={handleChangeInput}
            />
        </div>
        <div className='rounded-md border mb-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={currentData?.filter(data=>data.Seleccionado).length == currentData.length || (currentData?.filter(data=>data.Seleccionado).length > 0 && "indeterminate")}
                                onCheckedChange={handleChangeChecked}
                            />
                        </TableHead>
                        {
                            titlesData?.map((item,key)=>{
                                return(
                                    <TableHead key={key} className={item?.className}>{item?.name}</TableHead>
                                )
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        currentData.length > 0 ?
                        (
                            currentData.map((item, key)=>{
                                return(
                                    <TableRow key={key} className={`${item?.Seleccionado && "bg-slate-200 hover:bg-slate-200"}  `}>
                                        <TableCell>
                                            <Checkbox
                                                checked={item.Seleccionado}
                                                onCheckedChange={(_)=>handleCheckedRow(key)}
                                            />
                                        </TableCell>
                                        {
                                            Array.from({length : keysData.length}).map((_, idx)=>{
                                                const currentValue = item[keysData[idx]]
                                                if (Array.isArray(currentValue)) {
                                                    return (
                                                        <TableCell key={idx}>
                                                            {
                                                                currentValue.map((val)=>{
                                                                    return <p className='p-2 bg-slate-100 rounded-sm w-fit'>{ Object.values(val).filter(i=>!Number.isInteger(i)).map(v=><span>{v}</span>)}</p>
                                                                })
                                                            }
                                                        </TableCell>
                                                    )
                                                }
                                                if (currentValue !== null && typeof currentValue === 'object' && !Array.isArray(currentValue)) {
                                                    return <TableCell><p>{currentValue?.value}</p></TableCell>
                                                }
                                                return (
                                                    <TableCell key={idx}>
                                                        {currentValue}
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        ) :
                        (
                            <TableRow className="text-center">
                                <TableCell colSpan={Object.keys(currentData[0]).length}><h1 className='py-6'>No se encontraron resultados</h1></TableCell>
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
                        onClick={()=>handlePaginate(currentPage-1)}
                        disabled={currentPage == 1}
                        variant="ghost"
                    >
                        <span>Anterior</span>
                    </Button>
                    <div className='mx-4 px-4 flex flex-row'>
                        {
                            currentPage > 3 &&
                            <div>
                                <Button
                                    className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium  text-gray-700 hover:bg-gray-50 `}
                                    variant="ghost"
                                    onClick={()=>handlePaginate(1)}
                                >
                                    1
                                </Button>
                                <MoreHorizIcon/>
                            </div>
                        }
                        {
                            Array.from({length : Math.ceil(numData / dataPerPage)}).map((_, idx)=>{
                                if (idx < currentPage + 3) {
                                    return (
                                        <Button
                                            key={idx + 1}
                                            variant="ghost"
                                            onClick={()=>handlePaginate(idx + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium ${
                                                currentPage === idx + 1 ? 'bg-gray-300' : 'bg-white'
                                            } text-gray-700 hover:bg-gray-50 ${currentPage-3 > idx && 'hidden'}`}
                                        >
                                            <span>{idx + 1}</span>
                                        </Button>
                                    )
                                }
                                return null;
                            })
                        }
                        {
                            currentPage < Math.ceil(numData / dataPerPage)-4 &&
                            <div>
                                <MoreHorizIcon/>
                                <Button
                                    variant="ghost"
                                    className={`relative inline-flex items-center px-4 py-2 border rounded-sm border-gray-300 text-sm font-medium  text-gray-700 hover:bg-gray-50 `}
                                    onClick={()=>handlePaginate(Math.ceil(numData/dataPerPage))}
                                >
                                    {Math.ceil(numData/dataPerPage)}
                                </Button>
                            </div>
                        }
                    </div>
                    <Button
                        onClick={()=>handlePaginate(currentPage + 1)}
                        disabled={currentPage == Math.ceil(numData / dataPerPage)}
                        variant="ghost"
                    >
                        <span>Siguiente</span>
                    </Button>
                </nav>
            }
        </div>
    </div>
  )
};