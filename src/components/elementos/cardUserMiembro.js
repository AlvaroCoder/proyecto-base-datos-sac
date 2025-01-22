"use client"
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DropdownUiTable } from '../Tables/ui';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { UPDATE_MEMBER } from '../commons/apiConnection';
import { useToast } from '../ui/use-toast';
import { Input } from '../ui/input';
import DropdownMenuComponent from './dropdownComponent';

function DialogEditMiembro({
    id,
    first_name="",
    last_name="",
    email="",
    role,
    phone,
    dataCategories=[],
    handleClickUpdate : handleClickUpdateUserDialog,
}) {
    const {toast} = useToast();
    const [dataUser, setDataUser] = useState({
        id, 
        user_name : null,
        first_name,
        last_name,
        email,
        role,
        phone,
        disabled:null
    })
    const [loading, setLoading] = useState(false);
    const handleChangeInput=(evt)=>{
        const target = evt.target;
        setDataUser({
            ...dataUser,
            [target.name] : target.value
        })
    }
    const handleClickUpdate=async()=>{
        setLoading(true);
        const response = await UPDATE_MEMBER(dataUser);
        if (!response.ok) {
            toast({
                variant :"destructive",
                title : "Error",
                description :"Sucedio un error al momento de actualizar"
            });
            return;
        }
        toast({
            title :"Exito",
            description :"Se actualizo con exito el usuario"
        });
        setLoading(false);
    }
    return(<>
        <Dialog>
            <DialogTrigger>
                <Button
                    className="w-full"
                    variant="ghost"
                >
                    <EditIcon className='mr-2'/> <span>Editar</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Actualizar Datos de Usuario
                </DialogTitle>
                <DialogDescription>
                    Ventana de editar los datos del usuario
                </DialogDescription>
                <section>
                    <section className='w-full'>
                        <section className='flex flex-row items-center mt-2'>
                        <div className='flex-1'>
                            <h1 className='font-semibold'>Nombre</h1>
                            <Input
                                name="first_name"
                                value={dataUser.first_name}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='flex-1 ml-2'>
                            <h1 className='font-semibold'>Apellido</h1>
                            <Input
                                name="last_name"
                                value={dataUser.last_name}
                                onChange={handleChangeInput}
                            />
                        </div>
                        </section>
                        <div className='mt-2'>
                            <h1 className='font-semibold'>Email</h1>
                            <Input
                                type="email"
                                onChange={handleChangeInput}
                                value={dataUser.email}
                                name="email"
                            />
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold'>Categoria</h1>
                            <DropdownMenuComponent
                                initialValue={dataUser.role}
                                data={dataCategories}
                                changeData={(data)=>setDataUser({
                                    ...dataUser,
                                    role : data
                                })}
                            />
                        </div>
                    </section>
                    <div className='flex flex-row w-full py-2'>
                        <Button
                            disabled={loading}
                            onClick={handleClickUpdate}
                            className="bg-guinda mx-2 h-9 flex-1 py-2 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg text-sm "
                        >
                            {loading ? <Loader2/> : <p>Editar usuario</p>}
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    </>)
}
function DialogDeleteMiembro({handleClickDeleteUser}) {
    const [loading, setLoading] = useState(false);
    const handleClickDelete=async()=>{
        setLoading(true);
        handleClickDeleteUser();
        setLoading(false);
    }
    return(<>
        <Dialog>
            <DialogTrigger>
                <Button
                    variant="ghost"
                >
                    <DeleteIcon className='mr-2' /> <span>Eliminar</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Estas seguro de eliminar este usuario</DialogTitle>
                <DialogDescription>
                    Ten en cuenta que no se podra recuperar la información del usuario eliminado
                </DialogDescription>
                <section className=''>
                    <div className='flex flex-row w-full py-2'>
                        <Button
                            disabled={loading}
                            onClick={handleClickDelete}
                            className="bg-guinda mx-2 h-9 flex-1 py-2 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg text-sm "
                            >
                            {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <p><DeleteIcon className='mr-2' />Eliminar el usuario</p>}
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    </>)
}
export default function cardUserMiembro({dataUser, dataCategories=[], handleClickUpdate}) {
    const {first_name, last_name, email, phone, role} = dataUser;
    const handleClickDeleteUser=async()=>{
        
    }
    const handleClickUpdateUser=async(data)=>{

    }
    const roleValue = role?.value;
    let backgroundColor="bg-guinda";
    switch (roleValue) {
        case "Administrador":
            backgroundColor = "bg-administrador";
            break;
        case "Técnico":
            backgroundColor = "bg-tecnico";
            break;
        case "Asistente":
            backgroundColor = "bg-asistente";
            break;
        case "Alumno":
            backgroundColor = "bg-estudiante";
            break;
        case "Tesista":
            backgroundColor = "bg-tesista";
            break;
        case "Externo":
            backgroundColor = "bg-externo";
            break;
    }
  return (
    <div className='shadow-sm rounded-lg p-4 flex flex-row border border-slate-50'>
            <div>
                <AccountCircleIcon className='text-5xl text-gray-800 mr-4'/>
            </div>
            <div className='w-full'>
                <div className='flex flex-row w-full justify-between'>
                    <h1 className='capitalize font-bold text-xl'>
                        {first_name}, {last_name}
                    </h1>
                    <DropdownUiTable
                        DialogEditComponent={
                            <DialogEditMiembro
                                {...dataUser}
                                dataCategories={dataCategories}
                                handleClickUpdate={handleClickUpdate}
                            />
                        }
                        
                    />
                </div>
                <h2 className={`px-2 py-1 my-2 text-sm rounded-sm ${backgroundColor} text-white w-fit`}>{role?.value}</h2>
                <div>
                    <p className='text-sm cursor-pointer'><EmailIcon/> {email}</p>
                    <p className='text-sm'><PhoneIcon/> {phone}</p>
                </div>
                
            </div>
        </div>
  )
}
