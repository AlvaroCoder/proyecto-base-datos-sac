"use client"
import React, { useMemo, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DialogCreateUsuario } from '../Dialogs';
import { GET_LINK_FORM } from '../commons/apiConnection';
import DropdownMenuComponent from '../elementos/dropdownComponent';
import { Loader2, SaveIcon } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { CardUserMiembro } from '@/components';

export default function TableMiembros({
    dataMiembros=[],
    dataCargosMiembros=[],
    dataSession =null,
}) {
    const restrictedIds=[5,6,7];
    const userID = dataSession?.role;

    const {toast} = useToast();
    const router = useRouter();
    const newDataMiembros = dataMiembros?.map((item)=>({...item, Seleccionado : false}))
    const [miembrosData, setMiembrosData] = useState(newDataMiembros);
    const [loadingDataSaveCategories, setLoadingDataSaveCategories] = useState(false);
    const [categorieSelected, setCategorieSelected] = useState({
        id : 5,
        value : "Tesista"
    })
    const [query, setQuery] = useState("");
    const filterData = useMemo(()=>{
        return miembrosData.filter(item=>{
            const nameCompleted = item?.first_name.trim() + " " + item?.last_name.trim();
            return nameCompleted.toUpperCase().includes(query.toUpperCase())
        })
    },[miembrosData, query]);

    
    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    }
    const handleClickAddMember=async(dataMember)=>{        
        setMiembrosData([
            dataMember,
            ...miembrosData
        ])
    }
    const handleClickSaveCategorieLink=async()=>{
        setLoadingDataSaveCategories(true);
        const dataSend={role : categorieSelected}
        const response= await GET_LINK_FORM(dataSend);
        if (!response.ok) {
            toast({
                variant : "destructive",
                title : "Error",
                description : "Sucedio un error"
            });
            return;
        }        
        const responseJSON = await response.json();
        console.log(responseJSON);
        router.push(`/dashboard/miembros/link?link=${responseJSON?.link}`)
        setLoadingDataSaveCategories(false);
    }
    const handleClickUpdate=(data)=>{
        const newDataUser = dataMiembros.map(item=>item?.id === data.id);
        setMiembrosData(newDataUser)
        }
  return (
    <div className='w-full'>
        <section className='my-4 flex flex-row justify-center'>
            <Input
                placeholder="Buscar miembro ..."
                onChange={onChangeInput}
            />
            <Dialog>
                <DialogTrigger asChild>
                        <Button
                        className="mx-4 w-fit px-4 cursor-pointer bg-guinda rounded-lg  text-white text-center hover:bg-guindaOpaco  border-2 border-guinda hover:border-guinda'"
                        >
                        <span>Agregar Usuario</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        <h1 className='font-bold'>Nuevo Miembro</h1>
                    </DialogTitle>
                    <DialogCreateUsuario 
                    dataCategoriesUser={dataCargosMiembros}
                    handleClickAddMember={handleClickAddMember}></DialogCreateUsuario>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant="ghost"
                        className=" w-fit px-4 cursor-pointer rounded-lg  text-guinda text-center hover:text-guindaOpaco border-2 border-guinda hover:bg-gray-50"
                    >
                        <span>Generar Link</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Seleccione la categoria</DialogTitle>
                    <DialogDescription>
                        Categoria de los nuevos usuarios ingresados
                    </DialogDescription>
                    <div>
                        <DropdownMenuComponent
                            data={dataCargosMiembros}
                            initialValue={categorieSelected}
                            changeData={(data)=>setCategorieSelected(data)}
                        />
                        <DialogFooter className='flex flex-row items-center my-4 '>
                            <DialogClose asChild>
                                <Button
                                    className="flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4 text-white text-center hover:bg-guindaOpaco hover:font-bold border-2 border-guinda hover:border-guinda"
                                    onClick={handleClickSaveCategorieLink}
                                >
                                    {loadingDataSaveCategories ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>: <><SaveIcon/><span className='ml-2'>Generar link</span></>}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
        <section className='w-full grid grid-cols-3 gap-4 px-2'>
            {
                filterData.map(miembro=><CardUserMiembro handleClickUpdate={handleClickUpdate} dataUser={miembro} dataCategories={dataCargosMiembros} />)
            }
        </section>
    </div>
  )
}
