import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button';

import ClearIcon from '@mui/icons-material/Clear';


export default function DialogPapers({
    dataDialog,
    setDataDialog : setDataDialogPaper,
    handleChangeExistChanges
}) {
    const [showFormNewMember, setShowFormNewMember] = useState(false);
    const [inputValueMember, setInputValueMember] = useState({
        first_name : "",
        last_name : ""
    })
    const handleChangeFormMember=(evt)=>{
        const target = evt.target;
        setInputValueMember({
            ...inputValueMember,
            [target.name] : target.value
        })
    }
    const handleChangeTitleDialog=(evt)=>{
        const inputValue = evt.target.value;
        if (inputValue !== dataDialog.title) {
            handleChangeExistChanges();
        }
        setDataDialogPaper({
            ...dataDialog,
            title : inputValue
        })
    }
    const handleClickShowFormNewMember=()=>{
        setShowFormNewMember(!showFormNewMember);
    }
    const handleClickDeleteMember=()=>{
        
    }
    const handleClickAddMember=()=>{

    }
    const handleClickCancelMember=()=>{

    }
  return (
    <section>
        <div className='my-2'>
            <h1>Titulo</h1>
            <Input
                name="title"
                value={dataDialog?.title}
                onChange={handleChangeTitleDialog}
            />
        </div>
        <div className='my-2'>
            <h1>Miembros</h1>
            <div className='w-full rounded-lg flex flex-wrap gap-x-4 gap-y-2 items-center'>
                {
                    dataDialog?.members?.map((member,key)=>{
                        return(
                            <p key={key} className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'>
                                <span className='mr-2'>
                                    {member?.first_name}, {member?.last_name}
                                    <ClearIcon
                                        className='cursor-pointer'
                                        onClick={handleClickDeleteMember}
                                    />
                                </span>
                            </p>
                        )
                    })
                }
            </div>
            <div className='mt-2'>
                {
                    showFormNewMember ?
                    <section className='p-4 rounded-lg bg-slate-50'>
                        <h1>Nuevo Miembro</h1>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex-1'>
                                <label>Nombre</label>
                                <Input
                                    name="first_name"
                                    value={inputValueMember.first_name}
                                    onChange={handleChangeFormMember}
                                />
                            </div>
                            <div className='flex-1'>
                                <label>Apellido</label>
                                <Input
                                    name="last_name"
                                    value={inputValueMember?.last_name}
                                    onChange={handleChangeFormMember}
                                />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <Button
                                className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                                onClick={handleClickAddMember}
                            >
                                Agregar
                            </Button>
                            <Button
                                variant="ghost"
                                className="mx-2"
                                onClick={handleClickCancelMember}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </section> :
                    <Button
                    variant="ghost"
                    className="text-guinda underline hover:bg-white hover:text-guinda"
                    onClick={handleClickDeleteMember}
                    >
                        Agregar Miembro
                    </Button>
                }
            </div>
        </div>
    </section>
  )
}
