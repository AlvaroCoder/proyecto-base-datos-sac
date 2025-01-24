import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function PersonalProfileCard({
    id,
    first_name,
    last_name,
    email,
    phone,
    role,
    user_name,
    dataCategories
}) {
    const URL_IMG_ACCOUNT = "https://www.svgrepo.com/show/345418/account-circle.svg"
  return (
    <section 
        className='w-full  shadow-lg rounded-lg p-4 mt-4'
    >
        <div className='flex flex-row items-center gap-4' >
            <div>
                <Image
                    src={URL_IMG_ACCOUNT}
                    alt='Imagen de perfil'
                    width={100} 
                    height={100}
                />
 
            </div>
            <div className=''>
                <div className='flex flex-row items-center justify-center gap-4 mb-4'>
                    <h1 className='text-2xl font-bold'>Hola {user_name}</h1>
                    <h2 className='p-2 bg-guinda rounded-lg text-white'>{role?.value}</h2>
                </div>
                <Button
                    variant="ghost"
                    className="text-guinda border border-guinda"
                >
                    Cambiar foto
                </Button>
            </div>
        </div>
        <article className=' border border-gray-100 rounded-lg p-4 mt-4' >
            <div
                className='flex flex-row justify-between items-center'
            >
                <h1 className='font-bold'>Información Personal</h1>
                <Button
                    variant="ghost"
                    className="border border-gray-100"
                >
                    <EditIcon/> Editar Información
                </Button>
            </div>
            <section className='flex flex-row justify-between items-center p-4 mt-4'>
                <div>
                    <h2 className='text-gray-500'>Nombre Completo</h2>
                    <p className='font-bold'>{first_name} {last_name}</p>
                </div>
                <div>
                    <h2 className='text-gray-500' >Email</h2>
                    <p className='font-bold'>{email}</p>
                </div>
                <div>
                    <h2 className='text-gray-500'>Telefono</h2>
                    <p className='font-bold'>{phone}</p>
                </div>
            </section>
        </article>
    </section>
  )
}