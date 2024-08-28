"use client"
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

export default function DropwDownMenuLibros({title, author, location, status, listaEstados, listaUbicacion}) {    
    
    const [openDropwdown, setOpenDropwdown] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [dataLibro, setDataLibro] = useState({
        titulo : title,
        borrow_to : null,
        author,
        location,
        status

    });

    const [showFormPerson, setShowFormPerson] = useState(false);
    const [showFormAuthor, setShowFormAuthor] = useState(false);

    const [dataPeopleBorrowTo, setDataPeopleBorrowTo] = useState([]);
    const [inputsForm, setInputsForm] = useState({
        nombre : "",
        apellido : ""
    });
    const [inputsFormAutor, setInputsFormAutor] = useState({
        nombreAutor : "",
        apellidoAutor : ""
    });

    const handleChangeInputs=(evt)=>{
        const target = evt.target;
        setInputsForm({
            ...inputsForm,
            [target.name] : target.value
        })
    }
    const handleChangeInputsAutor=(evt)=>{
        const target = evt.target;
        setInputsFormAutor({
            ...inputsForm,
            [target.name] : target.value
        })
    }
    return(
        <DropdownMenu onOpenChange={()=>{
            if(!openDialog && !openDialogDelete){
                setOpenDropwdown(false)
            }
        } } open={openDropwdown}>
        <DropdownMenuTrigger asChild >
            <Button variant="ghost" onClick={()=>setOpenDropwdown(true)} className="h-8 w-8 p-0">
                <MoreVertIcon className='h-4 w-4'/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="bottom">

            <DropdownMenuItem  >
                <Dialog open={openDialog} 
                    onOpenChange={()=>{
                        if (openDialog) {
                            setOpenDialog(false);
                            setOpenDropwdown(false);
                        }
                    }}
                >
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
                            <div className='my-2'>
                                <label className='font-bold'>Titulo</label>
                                <Input 
                                    onChange={(evt)=>setDataLibro({
                                        ...dataLibro,
                                        titulo : evt.target.value
                                    })}
                                    value={dataLibro.titulo}
                                />
                            </div>
                            <div className='my-2'>
                                <label className='font-bold'>Autor</label>
                                <div className='w-full  rounded-lg grid grid-cols-auto-fill-100 auto-cols-max gap-2 items-center   ' >
                                    {
                                        dataLibro.author.map((autor)=><p className='p-2 bg-slate-100 rounded-xl w-fit mt-2'><span className='mr-2'>{autor}</span><ClearIcon/></p>)
                                    }
                                </div>
                                <div className='mt-2'>
                                    {
                                        showFormAuthor ? 
                                        <section className='p-4 roudned-lg bg-slate-50' >
                                            <h1 className='font-bold'>Nuevo Autor</h1>
                                            <div className='grid grid-cols-1 gap-2'>
                                                <div className='flex-1'>
                                                    <label>Nombre</label>
                                                    <Input
                                                        name="nombreAutor"
                                                        value={inputsFormAutor.nombreAutor}
                                                        onChange={handleChangeInputsAutor}
                                                    />
                                                </div>
                                            </div>
                                            <div className='mt-2'>
                                                <Button 
                                                    className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                                                    onClick={(evt)=>{
                                                        evt.preventDefault();
                                                        setDataLibro({
                                                            ...dataLibro,
                                                            author :[
                                                                ...dataLibro.author,
                                                                inputsFormAutor.nombreAutor
                                                            ]
                                                        })
                                                        setInputsFormAutor({nombreAutor : "", apellidoAutor : ""});
                                                        setShowFormAuthor(false);
                                                    }}
                                                >
                                                    Agregar
                                                </Button>  
                                                <Button
                                                    variant="ghost"
                                                    className="mx-2"
                                                    onClick={()=>{
                                                        setShowFormAuthor(false);
                                                        setInputsFormAutor({nombreAutor : "", apellidoAutor : ""})
                                                    }}
                                                >
                                                    Cancelar    
                                                </Button>                                   
                                            </div>
                                        </section> : 
                                        <Button 
                                            variant="ghost"
                                            className="text-guinda underline hover:bg-white hover:text-guinda"
                                            onClick={()=>setShowFormAuthor(true)}
                                        >
                                            Agregar autor <AddIcon/>
                                        </Button>
                                    }
                                </div>
                            </div>
                            <div className='my-2 flex flex-row items-center'>
                                <div className='w-[300px] flex flex-col'>
                                    <label className='font-bold '>Ubicacion</label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button  variant="ghost"
                                                className="w-full border-gray-100 border-[1px] shadow-sm"
                                            >
                                                <span>{dataLibro.location?.value}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="bottom">
                                            {
                                                listaUbicacion?.map(item=>(
                                                    <DropdownMenuCheckboxItem
                                                        key={item.id}
                                                        className="capitalize"
                                                        checked={item.id === dataLibro.location?.id}
                                                        onCheckedChange={
                                                            ()=>{
                                                                const jsonSelected = listaUbicacion?.filter(elem=>elem.id === item.id)[0];
                                                                setDataLibro({
                                                                    ...dataLibro,
                                                                    location : jsonSelected
                                                                });                                                          
                                                            }
                                                        }
                                                    >
                                                        {item.value}
                                                    </DropdownMenuCheckboxItem>
                                                ))
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className='flex-1 ml-2'>
                                    <label>Estado</label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost"
                                                className="w-full border-gray-100 border-[1px] shadow-sm"
                                            >
                                                <span>{dataLibro.status?.value}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="bottom">
                                            {
                                                listaEstados?.map(item=>(
                                                    <DropdownMenuCheckboxItem
                                                        key={item.id}
                                                        className="capitalize"
                                                        checked={item.id === dataLibro.status?.id}
                                                        onCheckedChange={
                                                            ()=>{
                                                                const jsonSelected=listaEstados?.filter(elem=>elem.id === item.id)[0];
                                                                setDataLibro({
                                                                    ...dataLibro,
                                                                    status : jsonSelected
                                                                });
                                                            }
                                                        }
                                                    >
                                                        {item.value}
                                                    </DropdownMenuCheckboxItem>
                                                ))
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
                                    dataPeopleBorrowTo.length > 0 && 
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
                                                dataPeopleBorrowTo?.map((people, idx)=>(
                                                    <TableRow key={idx}>
                                                        <TableCell>{people?.nombre}</TableCell>
                                                        <TableCell>{people?.apellido}</TableCell>
                                                        <TableCell><Button 
                                                        onClick={(evt)=>{
                                                            evt.preventDefault();
                                                            const newListPeopleBorrow = dataPeopleBorrowTo.filter((_,indexPeople)=>idx!=indexPeople);
                                                            setDataPeopleBorrowTo(newListPeopleBorrow);
                                                        }}
                                                        className="text-guinda bg-white hover:bg-white border-guinda border-2">
                                                            <DeleteIcon/>
                                                            </Button></TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                }
                            </div>
                            <div>
                                {
                                    showFormPerson ? 
                                    <section className='p-4 rounded-lg bg-slate-50'>
                                        <h1 className='font-bold'>Nueva Persona</h1>
                                        <div className='grid grid-cols-2 gap-2'>
                                        <div className='flex-1'>
                                                <label className='text-sm' htmlFor='nombre'>Nombre</label>
                                                
                                                <Input name="nombre" value={inputsForm.nombre} onChange={handleChangeInputs}/>
                                            </div>
                                            <div className='flex-1 ml-2'>
                                                <label className='text-sm' htmlFor='apellido'>Apellido</label>
                                                <Input name="apellido" value={inputsForm.apellido} onChange={handleChangeInputs}/>
                                            </div>
                                        </div>
                                        <div>
                                            <Button 
                                                className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                                                onClick={(evt)=>{
                                                    evt.preventDefault();
                                                    const newListPeopleBorrow = [...dataPeopleBorrowTo, {
                                                        nombre : inputsForm.nombre,
                                                        apellido : inputsForm.apellido 
                                                    }];
                                                    setDataPeopleBorrowTo(newListPeopleBorrow);
                                                    setInputsForm({nombre:"", apellido:""});
                                                    setShowFormPerson(false);
                                                }}
                                            >
                                                Agregar
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="mx-2"
                                                onClick={()=>{
                                                    setShowFormPerson(false)
                                                    setInputsForm({nombre : "", apellido:""})
                                                }}
                                            >
                                                Cancelar
                                            </Button>
                                        </div>
                                    </section> :
                                    <Button
                                        variant="ghost"
                                        className="text-guinda hover:bg-white underline hover:text-guinda"
                                        onClick={()=>setShowFormPerson(true)}
                                    >
                                        Agregar persona <AddIcon/>
                                    </Button>
                                }
                            </div>
                            <div className='flex flex-row items-center my-4'>
                                 <Button 
                                 className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                                onClick={()=>{
                                    setOpenDialog(false);
                                    setOpenDropwdown(!openDropwdown);
                                    toast({
                                        title : "Exito",
                                        description : "Se actualizo correctamente :)"
                                    })
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
            <DropdownMenuItem >
                <Dialog open={openDialogDelete} onOpenChange={()=>{
                  if (openDialogDelete) {
                    setOpenDialogDelete(false);
                    setOpenDropwdown(false);
                  }
                }}>
                    <DialogTrigger>
                     <Button 
                        variant="ghost" 
                        className="p-2 flex flex-row items-center"
                        onClick={()=>setOpenDialogDelete(!openDialogDelete)}
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
