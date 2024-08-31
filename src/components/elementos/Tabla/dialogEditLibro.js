"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';


import React,{useState} from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function dialogEditLibro({
    openDialogEditLibro=false, 
    onOpenChangeEditLibro,
    dataLibro,
    dataUbicacion=[],
    dataStatus=[]
}) {    
    const [dataDaialog, setDataDaialog] = useState(null);
    
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

    return (
    <Dialog
        open={openDialogEditLibro}
        onOpenChange={onOpenChangeEditLibro}
    >
        <DialogContent>
            <DialogTitle className={"font-bold text-guinda text-2xl"}>Editar Libro</DialogTitle>
            <section>
                <div className='my-2'>
                    <label className='font-bold'>Titulo</label>
                    <Input
                        onChange={(evt)=>setDataDaialog({...dataDaialog, title : evt.target.value})}
                        value={dataDaialog?.title || dataLibro?.title}
                    />
                </div>
                <div className='my-2'>
                    <label className='font-bold'>Autor</label>
                    <div className='w-full  rounded-lg grid grid-cols-auto-fill-100 auto-cols-max gap-2 items-center   ' >
                        {
                            dataLibro?.author.map(autor=><p className='p-2 bg-slate-100 rounded-xl w-fit mt-2'><span className='mr-2'>{autor}</span><ClearIcon/></p>)
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
                                            setDataDaialog({
                                                ...dataDaialog,
                                                author :[
                                                    ...dataDaialog.author,
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
                    <div className='my-2 flex flex-row items-center'>
                        <div className='w-[300px] flex flex-col'>
                            <label className='font-bold '>Ubicacion</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-full border-gray-100 border-[1px] shadow-sm"
                                        >
                                            <span>{dataDaialog?.location?.value || dataLibro?.location?.value}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="bottom">
                                    {
                                        dataUbicacion?.map(item=>(
                                            <DropdownMenuCheckboxItem
                                                key={item?.id}
                                                className="capitalize"
                                                checked={item.id === (dataDaialog?.location?.id || dataLibro?.location?.id)}
                                                
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
                                    <Button
                                        variant="ghost"
                                        className="w-full border-gray-100 border-[1px] shadow-sm"
                                        >
                                        <span>{dataDaialog?.status?.value || dataLibro?.status?.value}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </section>
        </DialogContent>
    </Dialog>
  )
}
