import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { ButtonCloseDialog,  ListCardShort,  PopoverAddList } from '@/components';
import { useToast } from '@/components/ui/use-toast';
import { UPDATE_PAPER } from '@/components/commons/apiConnection';
export default function DialogPapers({
    initialDataDialog,
    dataMembers=[],
    handleClickSaveUpdate
}) {
    const {toast} = useToast();
    const [dataPapers, setDataPapers] = useState({
        id : initialDataDialog?.id,
        title : initialDataDialog?.title,
        members : initialDataDialog?.members,
        members_added : [],
        members_deleted : [],
        year : initialDataDialog?.year,
        link : initialDataDialog?.link
    });
    // Funcion de agregar miembro a la lista de miembros
    const handleClickAddMember=(data)=>{
        if (!dataPapers.members.some(member=>member.id === data.id)) {
            setDataPapers(prev=>({
                ...prev,
                members : [...prev.members, data],
                members_added : [...prev.members_added, data]
            }))
        }else {
            toast({
                variant : "destructive",
                title : "Error",
                description : "No se puede agregar el mismo usuario 2 veces"
            })
        }
    }
    // Funcion eliminar miembrod de la lista de miembros
    const handleClickClearMember=(_, data)=>{
        const existeMiembroAgregado = dataPapers.members_added.some(member=>member.id === data.id);
        setDataPapers(prev=>{
            const actualizarMiembros = prev.members.filter(member=>member.id!==data.id);
            const actualizarMiembroAgregado = prev.members_added.filter(member=>member.id!==data.id);
            const actualizatrMiembrosEliminar = existeMiembroAgregado ? prev.members_deleted : [...prev.members_deleted, data];
            return {
                ...prev,
                members : actualizarMiembros,
                members_added : actualizarMiembroAgregado,
                members_deleted : actualizatrMiembrosEliminar
            }
        })
    }
    const handleChangeInput=(evt)=>{
        const target= evt.target;
        setDataPapers({
            ...dataPapers,
            [target.name] : target.value
        })
    }
    const handleClickSave=async()=>{
        const newJSONPapers={
            ...dataPapers
        }
        delete newJSONPapers.members
        
        const response = await UPDATE_PAPER(newJSONPapers);
        if (!response.ok) {
            toast({
                variant : "destructive",
                title : "Error",
                description : "Sucedio un error en guardar el paper"
            });
            return;
        }
        const responseJSON = await response.json();
        handleClickSaveUpdate(dataPapers);
        toast({
            title : "Exito",
            description : "Se actualizo correctamente"
        });
    }
  return (
    <section>
        <div className='my-2'>
            <h1 className='font-bold'>Titulo</h1>
            <Input
                name="title"
                value={dataPapers?.title}
                onChange={handleChangeInput}
            />
        </div>
        <div className='my-2'>
            <h1 className='font-bold'>Miembros</h1>
            <ListCardShort
                data={dataPapers?.members}
                handleClickClear={handleClickClearMember}
            />
            <div className='mt-2'>
                <PopoverAddList
                    data={dataMembers}
                    textButton='Agregar Miembros'
                    handleClickAddMember={handleClickAddMember} 
                />
            </div>
            
        </div>
        <section className='flex flex-row items-center'>
            <div className='my-2 flex-1'>
                <h1 className='font-semibold'>Link</h1>
                <Input
                    type="text"
                    name="link"
                    value={dataPapers?.link}
                    onChange={handleChangeInput}
                />
            </div>
            <div className='my-2 w-[100px] ml-2'>
                <h1 className='font-semibold'>Año</h1>
                <Input
                    type="number"
                    name="year"
                    value={dataPapers?.year}
                    onChange={handleChangeInput}
                />
            </div>
        </section>
        <ButtonCloseDialog
            handleClickSave={handleClickSave}
        />
    </section>
  )
}
