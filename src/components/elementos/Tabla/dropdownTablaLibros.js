"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import React,{useState} from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from "lucide-react"


export default function dropdownTablaLibros({dataDialog, dataStatus=[], dataLocation=[],handleChangeInput, resetDataDialog}) {
    const URL_UPDATE_BOOKS = process.env.NEXT_PUBLIC_URL_EDIT_BOOK

    const initialData={
        id : dataDialog?.id,
        title : dataDialog?.title,
        authors_added : [],
        authors_deleted : [],
        location : 1,
        status : 1,
        borrowed_to : null,
        amount : 1
    }
    const {toast} = useToast();
    
    const [loadingData, setLoadingData] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [showFormNewAuthor, setShowFormNewAuthor] = useState(false);
    const [showFormNewPerson, setShowFormNewPerson] = useState(false);
    const [showAlertExit, setShowAlertExit] = useState(false);

    const [inputsFormPerson, setInputsFormPerson] = useState({
        nombrePersona : "",
        apellidoPersona : ""
    });
    const [inputsFormAuthor, setInputsFormAuthor] = useState("");
    const [dataPeopleBorrowTo, setDataPeopleBorrowTo] = useState([]);

    const handleChangeInputPerson=(evt)=>{
        const target = evt.target;
        setInputsFormPerson({
            ...inputsFormPerson,
            [target.name] : target.value
        })
    };

    const [dataToSend, setDataToSend] = useState(initialData);
    const saveDataToSend=async()=>{

        setLoadingData(true);
        console.log(dataToSend);
        
        const response = await fetch(URL_UPDATE_BOOKS,{
            method : "PUT",
            headers : {
                "Content-type":"application/json"
            },
            body : JSON.stringify(dataToSend)
        })
        if (response.ok) {
            toast({
                title :"Cambios guardados",
                description : `Se actualizaron los cambios con éxito, del libro ${dataToSend.title}!`
            })
        }
        if (!response.ok) {
            toast({
                variant : "destructive",
                title : "Algo paso",
                description :"Hubo un problema al momento de actualizar los datos!"
            })
        }
        setLoadingData(false);
        setOpenDialog(!openDialog);        
    }
  return (
    <>
        <DropdownMenuPrimitive.Root open={openDropdown} onOpenChange={setOpenDropdown} >
        <DropdownMenuPrimitive.Trigger asChild>
         <Button
                variant="ghost"
            >
                <MoreVertIcon/>
            </Button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                sideOffset={4}
                className={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",

                )}
            >
                <DropdownMenuPrimitive.Item
                    className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    )}
                >
                    <Button
                        variant="ghost"
                        onClick={()=>setOpenDialog(true)}
                    ><EditIcon className='mr-2'/> Editar</Button>
                </DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Item
                    className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    )}
                >
                    <Button
                        variant="ghost"
                    ><DeleteIcon className='mr-2' /> Eliminar</Button>
                </DropdownMenuPrimitive.Item>
            </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
    <Dialog open={openDialog} onOpenChange={()=>{
        if(hasChanges){
            setShowAlertExit(true);
            return;
        }
        setOpenDialog(false);
    }}>
        <DialogContent>
            <DialogTitle>Edicion de Libros</DialogTitle>
            <section>
                <div className='my-2'>
                    <h1>Titulo</h1>
                    <Input 
                        name="title"
                        value={dataDialog?.title}
                        onChange={(evt)=>{
                            setDataToSend({
                                ...dataToSend,
                                title : evt.target.value
                            });
                            setHasChanges(true);
                            handleChangeInput(dataDialog?.id, "title", evt.target.value)
                        }}
                    />
                </div>
                <div className='my-2'>
                    <h1>Autor</h1>
                    <div className='w-full rounded-lg grid grid-cols-auto-fill-100 auto-cols-max gap-2 items-center'>
                        {
                            dataDialog?.authors?.map((author, key)=>
                            <p key={key} className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'>
                                <span className='mr-2'>{author?.value}
                                    <ClearIcon 
                                    className='cursor-pointer'
                                    onClick={()=>{
                                        const updateData = [...dataDialog?.authors].filter((_, idx)=>idx!==key);
                                        const existAuthorInAdded = [...dataToSend.authors_added].some(autor=>autor.name ==  author?.value) 
                                        
                                        if (author.id) {
                                            setDataToSend({
                                                ...dataToSend,
                                                authors_deleted : [...dataToSend.authors_deleted, {
                                                    id : author?.id,
                                                    name : author?.value
                                                }]
                                            });
                                        }
                                        if (existAuthorInAdded) {                                            
                                            setDataToSend({
                                                ...dataToSend,
                                                authors_added : [...dataToSend.authors_added].filter(item=>!item.name.toUpperCase().includes(author.value.toUpperCase()))
                                            })
                                        }
                                        
                                        handleChangeInput(dataDialog?.id,"authors", updateData);     

                                        setHasChanges(true);          
                                    }}/></span>
                            </p>)
                        }
                    </div>
                    <div className='mt-2'>
                        {
                            showFormNewAuthor ? 
                            <section className='p-4 rounded-lg bg-slate-50'>
                                <h1 className='font-bold'>Nuevo Autor</h1>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div className='flex-1'>
                                        <label>Nombre</label>
                                        <Input
                                            name="nombreAutor"
                                            onChange={(evt=>setInputsFormAuthor(evt.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <Button
                                        className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"                                    
                                        onClick={(evt)=>{
                                            evt.preventDefault();
                                            handleChangeInput(dataDialog?.id, "authors", [...dataDialog?.authors, {
                                                value : inputsFormAuthor
                                            }]);
                                            setDataToSend({
                                                ...dataToSend,
                                                authors_added : [...dataToSend.authors_added, {name : inputsFormAuthor}] 
                                            });
                                            // Reseteamos el valor del form author
                                            setInputsFormAuthor("");
                                            setShowFormNewAuthor(false);
                                            setHasChanges(true);
                                        }}
                                    >  
                                        Agregar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="mx-2"
                                        onClick={(evt)=>{
                                            evt.preventDefault();
                                            setInputsFormAuthor("");
                                            setShowFormNewAuthor(false);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </section> :
                            <Button
                                variant="ghost"
                                className="text-guinda underline hover:bg-white hover:text-guinda"
                                onClick={()=>setShowFormNewAuthor(true)}
                            >
                                Agregar autor <AddIcon/>
                            </Button>
                        }
                    </div>
                </div>
                <div className='my-2 flex flex-row items-center'>
                    <div className='w-[300px] flex flex-col'>
                        <h1 className='font-bold'>Ubicación</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full border-gray-100 border-[1px] shadow-sm"
                                >
                                    <span>{dataDialog?.location?.value}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    dataLocation.map(item=>
                                    <DropdownMenuCheckboxItem
                                        checked={item.id === dataDialog?.location?.id}
                                        className="capitalize"
                                        onCheckedChange={()=>{
                                            const jsonSelected = dataLocation?.filter(elem=>elem.id ===  item.id)[0];
                                            handleChangeInput(dataDialog?.id, "location" , jsonSelected);
                                            setDataToSend({
                                                ...dataToSend,
                                                location : jsonSelected.id
                                            });
                                            setHasChanges(true);
                                        }}
                                    >
                                        {item.value}
                                    </DropdownMenuCheckboxItem>)
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='flex-1 ml-2'>
                        <h1>Estado</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full border-gray-100 border-[1px] shadow-sm"
                                >
                                    <span>{dataDialog?.status?.value}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    dataStatus.map(item=>
                                        <DropdownMenuCheckboxItem
                                            className="capitalize"
                                            checked={item.id === dataDialog?.status?.id}
                                            onCheckedChange={()=>{
                                                const jsonSelected=dataStatus?.filter(elem=> elem.id === item.id)[0];
                                                handleChangeInput(dataDialog?.id, "status", jsonSelected);
                                                setDataToSend({
                                                    ...dataToSend,
                                                    status : jsonSelected.id
                                                });
                                                setHasChanges(true);
                                            }}
                                        >
                                            {item.value}
                                        </DropdownMenuCheckboxItem>
                                    )
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
                                            <TableCell>
                                                <Button
                                                    onClick={
                                                        (evt)=>{
                                                            evt.preventDefault();
                                                            const newListPeopleBorrow = dataPeopleBorrowTo.filter((_,indexpeople)=>idx!==indexpeople);
                                                            setDataPeopleBorrowTo(newListPeopleBorrow);
                                                        }
                                                    }
                                                        className="text-guinda bg-white hover:bg-white border-guinda border-2"
                                                    >
                                                        <DeleteIcon/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    }
                </div>
                <div>
                    {
                        showFormNewPerson ?
                        <section className='p-4 rounded-lg bg-slate-50'>
                            <h1 className='font-bold'>Nueva Persona</h1>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex-1'>
                                    <label className='text-sm' htmlFor='nombrePersona' >Nombre</label>
                                    <Input
                                        name="nombrePersona"
                                        value={inputsFormPerson.nombrePersona}
                                        onChange={handleChangeInputPerson}
                                    />
                                </div>
                                <div className='flex-1 ml-2'>
                                    <label className='text-sm' htmlFor='apellidoPersona'>Apellido</label>
                                    <Input
                                        name="apellidoPersona"
                                        value={inputsFormPerson.apellidoPersona}
                                        onChange={handleChangeInputPerson}
                                    />
                                </div>
                                <div>
                                    <Button
                                        className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                                        onClick={(evt)=>{
                                            evt.preventDefault();
                                            const newListPeopleBorrow=[...dataPeopleBorrowTo, {
                                                nombre : inputsFormPerson.nombrePersona,
                                                apellido : inputsFormPerson.apellidoPersona
                                            }];
                                            setShowFormNewPerson(false)
                                        }}
                                    >
                                        Agregar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="mx-2"
                                        onClick={(evt)=>{
                                            evt.preventDefault();
                                            setShowFormNewPerson(false);
                                            setInputsFormPerson({
                                                nombrePersona : "",
                                                apellidoPersona : ""
                                            })
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </section> :
                        <Button
                            variant="ghost"
                            className="text-guinda hover:bg-white underline hover:text-guinda"
                            onClick={()=>setShowFormNewPerson(true)}
                        >
                            Agregar Persona <AddIcon/>
                        </Button>
                    }
                </div>
                <div className='flex flex-row items-center my-4'>
                    <Button
                        className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                        disabled={!hasChanges || loadingData}
                        onClick={saveDataToSend}
                    >
                        {loadingData ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> :<> <SaveIcon/><span className='ml-2'>Guardar cambios</span></>}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={()=>{
                            setOpenDialog(false);
                            resetDataDialog();
                            setDataToSend(initialData);
                        }}
                    >
                        Cancelar
                    </Button>
                </div>
            </section>
        </DialogContent>
    </Dialog>
    <Dialog open={showAlertExit} onOpenChange={setShowAlertExit}>
        <DialogContent>
            <DialogTitle>
                Estás seguro de salir de la pantalla de edición?
            </DialogTitle>
            <section className='w-full flex flex-row my-4'>
                <Button
                    onClick={()=>{
                        setShowAlertExit(false);
                    }}
                    className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                >
                    Quiero seguir editando
                </Button>
                <Button
                    variant="ghost"
                    onClick={()=>{
                        resetDataDialog();
                        setShowAlertExit(false);
                        setOpenDialog(false);
                        setDataToSend(initialData)
                    }}
                >
                    Salir sin guardar cambios
                </Button>
            </section>
        </DialogContent>
    </Dialog>
    </>
  )
}
;