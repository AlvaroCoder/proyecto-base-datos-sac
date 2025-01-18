"use client"
import React, { useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { Input } from '../ui/input';
import PersonIcon from '@mui/icons-material/Person';

export default function popOverAddButton({
    data=[],
    componentAdd=null,
    changeValue
}) {
    const [valueButton, setValueButton] = useState(null);
    const [queryInput, setQueryInput] = useState("");
    const filterData = useMemo(()=>{
        return data.filter(item=>(item?.first_name.toUpperCase().includes(queryInput.toUpperCase()) || item?.last_name?.toUpperCase().includes(queryInput.toUpperCase())))
    },[queryInput]);
    const handleClickAddMember=(item)=>{
        setValueButton(item);
        changeValue(item)
    }
    const handleChangeInput=(evt)=>{
        setQueryInput(evt.target.value);
    }
  return (
    <Popover>
        <PopoverTrigger
            asChild
        >  
            <Button
                variant="ghost"
                className="w-full border border-gray-200 shadow-sm"
            >
                {valueButton ? <p className='flex flex-row items-center'><PersonIcon/>{valueButton?.first_name} {valueButton?.last_name}</p> : <p>Agregar Coordinador</p>}
                <ChevronsUpDown
                    className='opacity-50'
                />
            </Button>
        </PopoverTrigger>
        <PopoverContent
            className="w-80"
        >
            <section>
                <Input
                    placeholder="Buscar miembro"
                    onChange={handleChangeInput}
                />
                <div className='mt-2'>
                    {
                        filterData.length > 0?
                        filterData?.map((item, idx)=>(idx<5 &&
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={()=>handleClickAddMember(item)}
                            >
                                <p>{item?.first_name} {item?.last_name}</p>
                            </Button>
                        )):
                        (componentAdd ? <>{componentAdd}</> : <p className='p-4 w-full text-center text-sm hover:bg-gray-100 rounded-sm'>No hay resultados</p>)
                    }
                </div>
            </section>
        </PopoverContent>
    </Popover>
  )
};