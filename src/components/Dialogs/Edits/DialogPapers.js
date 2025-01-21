import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { ButtonCloseDialog,  ListCardShort,  PopoverAddList } from '@/components';
import { useToast } from '@/components/ui/use-toast';
import { UPDATE_PAPER } from '@/components/commons/apiConnection';
export default function DialogPapers({
    initialDataDialog,
    dataDialog,
    setDataDialog : setDataDialogPaper,
    handleChangeExistChanges,
    dataMembers=[]
}) {
    const {toast} = useToast();
    const [dataPapers, setDataPapers] = useState({
        id : initialDataDialog?.id,
        title : initialDataDialog?.title,
        course : initialDataDialog?.course,
        members : initialDataDialog?.members,
        members_added : [],
        members_deleted : [],
        year : initialDataDialog?.year,
        link : initialDataDialog?.link
    })
    const handleClickAddMember=(data)=>{
        const existeMiembro = dataPapers.members_added.some(item=>JSON.stringify(data) === JSON.stringify(item)) || dataPapers.members?.some(item=>JSON.stringify(data) === JSON.stringify(item));
        if (!existeMiembro) {
            setDataPapers({
                ...dataPapers,
                members : [...dataPapers.members, data],
                members_added : [...dataPapers.members_added, data]
            })
        }else {
            toast({
                variant : "destructive",
                title : "Error de agregar",
                description : "No se puede agregar la misma persona 2 veces"
            })
        }
    }
    const handleClickClearMember=(id, data)=>{
        const existeMiembroAgregado = dataPapers.members_added.some(obj=>JSON.stringify(data) === obj);
        console.log(existeMiembroAgregado, dataPapers.members_added);
        
        const nuevaDataMiembrosAgregado = !existeMiembroAgregado ? [...dataPapers.members_added].filter((obj)=>JSON.stringify(obj)!==JSON.stringify(data)) : [...dataPapers.members_added];
        console.log(nuevaDataMiembrosAgregado);
        
        setDataPapers(prev=>({
            ...dataPapers,
            members : [...prev.members].filter((_,idx)=>idx!==id),
            members_added : nuevaDataMiembrosAgregado,
            members_deleted : [...prev.members_deleted, data]
        }))
    }
    const handleClickSave=async()=>{
        const newJSONPapers={
            ...dataPapers
        }
        delete newJSONPapers.members
        console.log(newJSONPapers);
        
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
        console.log(responseJSON);
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
                />
            </div>
            <div className='my-2 w-[100px] ml-2'>
                <h1 className='font-semibold'>Año</h1>
                <Input
                    type="number"
                    name="year"
                    value={dataPapers?.year}
                />
            </div>
        </section>
        <ButtonCloseDialog
            handleClickSave={handleClickSave}
        />
    </section>
  )
}
