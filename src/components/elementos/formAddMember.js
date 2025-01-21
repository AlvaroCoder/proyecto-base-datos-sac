"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import DropdownMenuComponent from './dropdownComponent'
import { Button } from '../ui/button';

export default function formAddMember({
    dataCategoriesUser=[],
    handleClickAddMember,
    hasCategories=true
}) {
    const [inputValue, setInputValue] = useState({
        first_name : "",
        last_name : "",
        cargo : {
            id : 6,
            value : "Alumno"
        }
    })
    const handleChangeData=(currentData)=>{
        setInputValue({
            ...inputValue,
            cargo : currentData
        })
    }
    const handleChangeInput=(evt)=>{
        const target = evt.target;
        setInputValue({
            ...inputValue,
            [target.name] : target.value
        })
    }
    const handleClick=(evt)=>{
        evt.preventDefault();
        handleClickAddMember(inputValue);
        setInputValue({
            first_name : "",
            last_name:"",
            cargo : {
                id : 6,
                value : "Alumno"
            }
        });
    }
  return (
    <div className='grid gap-4 text-sm'>
        <div
            className='space-y-2'
        >
            <h4 className='font-bold leading-none'>Nuevo miembro</h4>
        </div>
        <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
                <label htmlFor='first_name'>Nombre</label>
                <Input
                    id="first_name"
                    name="first_name"
                    className="col-span-2 h-8"
                    value={inputValue?.first_name}
                    onChange={handleChangeInput}
                    required
                />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
                <label htmlFor='last_name'>Apellido</label>
                <Input
                    id="last_name"
                    name="last_name"
                    className="col-span-2 h-8"
                    value={inputValue?.last_name}
                    onChange={handleChangeInput}
                    required
                />
            </div>
            {
                hasCategories && 
                <div className='grid grid-cols-3 items-center gap-4'>
                <label>Cargo</label>
                <div className='col-span-2'>
                <DropdownMenuComponent
                    data={dataCategoriesUser}
                    initialValue={inputValue?.cargo}
                    changeData={handleChangeData}
                />
                </div>
            </div>
            }
            <div className='grid grid-cols-3'>
            <Button
                variant="ghost"
                className="col-span-3 bg-guinda hover:bg-guindaOpaco hover:text-white text-white "
                onClick={handleClick}
            >
                <p>Agregar Miembro</p>
            </Button>
            </div>
        </div>
    </div>
  )
}
