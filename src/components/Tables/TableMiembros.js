"use client"
import React, { useMemo, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import { Input } from '../ui/input';

function CardUser({first_name, last_name, email, phone, category}) {
    return(
        <div className='shadow-sm rounded-sm p-4 flex flex-row border border-slate-50'>
            <div>
                <AccountCircleIcon className='text-5xl text-gray-800 mr-4'/>
            </div>
            <div>
                <h1 className='capitalize font-bold text-xl'>
                    {first_name}, {last_name}
                </h1>
                <h2 className='px-2 py-1 my-2 text-sm rounded-sm bg-guindaOpaco text-white w-fit'>{category}</h2>
                <div>
                    <p className='text-sm cursor-pointer'><EmailIcon/> {email}</p>
                    <p className='text-sm'><PhoneIcon/> {phone}</p>
                </div>
                
            </div>
        </div>
    )
}

export default function TableMiembros({dataMiembros=[]}) {
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
  return (
    <div className='w-full'>
        <section className='my-4'>
            <Input
                placeholder="Buscar miembro ..."
                onChange={onChangeInput}
            />
        </section>
        <section className='w-full grid grid-cols-3 gap-4 px-2'>
            {
                filterData.map(miembro=><CardUser {...miembro} />)
            }
        </section>
    </div>
  )
}
