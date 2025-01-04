"use client"
import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Checkbox } from '../../ui/checkbox'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { DialogCreateUi, DialogDeleteUi, DialogEditUi, DropdownUiTable } from '../ui'

{/** Iconos */}
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogDeleteMultiplesElements } from '@/components/Dialogs'




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
    numData,
    filtersComponents=[],
    hrefCreateButton="/",
    DialogEditComponent=React.Component,
    DialogDeleteComponent=React.Component,
    DialogCreateComponent=React.Component,
    dialogTitleEdit="Editar",
    dialogTitleCreate="Crear registro",
    dataLocationDialog=[],
    dataOriginDialog=[],
    dataPeopleBorrowTo=[],
    dataTypeDialog=[],
    dataCourse=[],
    dataCoordinator=[],
    setDataTable,
    deleteElementFunction,
    handleClickSaveRegister,
    dataStatusDialog,
    dataListAgreements=[]
}) 
{   
    const elementsSelected = currentData?.filter(data=>data.Seleccionado);
  return (
    <div className='w-full'>
        <div className='flex items-center py-4'>
            <Input
                placeholder="Buscar ..."
                onChange={handleChangeInput}
            />

            <DialogCreateUi
                dialogTitle={dialogTitleCreate}
                DialogBody={
                <DialogCreateComponent
                    dataStatus={dataStatusDialog}
                    dataLocation={dataLocationDialog}
                    dataCourse={dataCourse}
                    dataListAgreements={dataListAgreements}
                    dataPeopleBorrowTo={dataPeopleBorrowTo}
                    handleClickSaveRegister={handleClickSaveRegister}
                />}  
            />
            {
                elementsSelected.length > 0 && 
                <DialogDeleteMultiplesElements elements={elementsSelected} />
            }
            {
                filtersComponents.length > 0 &&
                <div className='flex flex-row items-center px-4'>
                    {
                        filtersComponents.map((item, idx)=>(
                            <React.Fragment key={idx}>{item}</React.Fragment>
                        ))
                    }
                </div>
            }
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
                        <TableHead></TableHead>
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
                                                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                                                {
                                                                    currentValue.map((val, idx)=>{
                                                                        return idx < 3 && <p key={idx} className='px-4 py-2 bg-slate-100 rounded-sm w-fit shadow-sm'>{ Object.values(val).filter(i=>!Number.isInteger(i)).map((v, idx)=><span key={idx}>{v}</span>)}</p>
                                                                    })
                                                                }
                                                                {
                                                                    currentValue?.length > 3 &&
                                                                    <MoreHorizIcon/>
                                                                }
                                                            </div>
                                                        </TableCell>
                                                    )
                                                }
                                                if (currentValue !== null && typeof currentValue === 'object' && !Array.isArray(currentValue)) {
                                                    return <TableCell key={idx}><p >{currentValue?.value}</p></TableCell>
                                                }
                                                if (keysData[idx] == "link") {
                                                    return <TableCell key={idx}>
                                                        <a
                                                            href={currentValue}
                                                            target='_blank'
                                                        >
                                                            <h1 className='cursor-pointer underline text-guinda'>Ver archivo</h1>
                                                        </a>
                                                    </TableCell>
                                                }
                                                return (
                                                    <TableCell key={idx}>
                                                        <p className='text-justify'> {currentValue}</p>
                                                    </TableCell>
                                                )
                                            })
                                        }
                                        <TableCell>
                                            <DropdownUiTable
                                                DialogEditComponent={
                                                <DialogEditUi
                                                    dataDialog={item}
                                                    dataCoordinator={dataCoordinator}
                                                    dataStatus={dataStatusDialog}
                                                    dataLocation={dataLocationDialog}
                                                    dataPeopleBorrowTo={dataPeopleBorrowTo}
                                                    dataType={dataTypeDialog}
                                                    dataOrigin={dataOriginDialog}
                                                    dialogTitle={dialogTitleEdit}
                                                    DialogBody={DialogEditComponent}
                                                    setDataTable={setDataTable}
                                                />}
                                                DialogDeleteComponente={
                                                <DialogDeleteUi
                                                    idDeleteData={item?.id}
                                                    handleClickDelete={deleteElementFunction}
                                                >
                                                  <DialogDeleteComponent {...item} />
                                                </DialogDeleteUi>}
                                            />

                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) :
                        (
                            <TableRow className="text-center">
                                <TableCell colSpan={titlesData.length   }><h1 className='py-6'>No se encontraron resultados</h1></TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
        <div className='flex justify-center my-8'>
            {
                currentData.length > 9 &&
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