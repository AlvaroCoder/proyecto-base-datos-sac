"use client"
import React, { useMemo, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DialogCreateUsuario } from '../Dialogs';
import { REGISTER_MEMBER } from '../commons/apiConnection';

function CardUser({first_name, last_name, email, phone, role}) {
    return(
        <div className='shadow-sm rounded-sm p-4 flex flex-row border border-slate-50'>
            <div>
                <AccountCircleIcon className='text-5xl text-gray-800 mr-4'/>
            </div>
            <div>
                <h1 className='capitalize font-bold text-xl'>
                    {first_name}, {last_name}
                </h1>
                <h2 className='px-2 py-1 my-2 text-sm rounded-sm bg-guindaOpaco text-white w-fit'>{role?.value}</h2>
                <div>
                    <p className='text-sm cursor-pointer'><EmailIcon/> {email}</p>
                    <p className='text-sm'><PhoneIcon/> {phone}</p>
                </div>
                
            </div>
        </div>
    )
}

export default function TableMiembros({
    dataMiembros=[],
    dataCargosMiembros=[]
}) {
    const newDataMiembros = dataMiembros?.map((item)=>({...item, Seleccionado : false}))
    const [miembrosData, setMiembrosData] = useState(newDataMiembros);

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
        await REGISTER_MEMBER(dataMember);
        setMiembrosData([
            ...miembrosData,
            dataMember
        ])
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
                    <DialogCreateUsuario handleClickAddMember={handleClickAddMember}></DialogCreateUsuario>
                </DialogContent>
            </Dialog>
        </section>
        <section className='w-full grid grid-cols-3 gap-4 px-2'>
            {
                filterData.map(miembro=><CardUser {...miembro} />)
            }
        </section>
    </div>
  )
}
