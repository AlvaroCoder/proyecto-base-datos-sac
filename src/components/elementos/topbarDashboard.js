"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { getSession, logout } from '@/authentication/lib';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const URL_IMG_UDEP = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png";
const URL_IMG_LABSAC = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319348/logo_lab_sac_guinda_xefpo1.png";
const URL_RECORDS = process.env.NEXT_PUBLIC_URL_RECORDS

export default function TopBarDashboard({historial}) {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    useEffect(()=>{
        async function fetchCookie() {
            const session = await getSession();
            const values = session?.user;
            setUserData(values);
        }
        fetchCookie();
    },[]);
    const handleClickLogout=async()=>{
        await logout();
    }
    const handleClickPerfil=async()=>{
        router.push("/dashboard/user")
    }

  return (
    <div className='h-24 w-full bg-white shadow-sm flex flex-row items-center py-4 justify-between z-10'>
        <div className='ml-4 flex flex-row px-4'>
             <Image
                src={URL_IMG_UDEP}
                alt='Imagen Logo UDEP'
                width={200}
                height={100}
                
            />
            <Image 
                className='ml-10'
                src={URL_IMG_LABSAC}
                alt='Imagen Logo UDEP'
                width={200}
                height={100}
            />
        </div>
        <div className='flex flex-row items-center px-4 mr-8'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button 
                    className=' flex flex-row items-center py-6 rounded-2xl text-white bg-guindaOpaco mr-4 hover:text-guinda border hover:border-guinda'
                    variant="ghost"
                    >
                    <AccountCircleIcon />
                    <p className=' ml-4 hidden lg:block'>{userData&& userData.username}</p>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        Mi cuenta
                    </DropdownMenuLabel>
                   
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem >
                        <Button
                            variant="ghost"
                            className="flex items-center justify-center"
                            onClick={handleClickPerfil}
                        >
                            <p><PersonIcon/><span className='ml-2'>Ver perfil</span></p>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button 
                            className="flex items-center justify-center"

                            variant="ghost"
                            onClick={handleClickLogout}
                        >
                            <p><PowerSettingsNewIcon/><span className='ml-2'>Cerrar Sesion</span></p>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div>
                <NotificationsIcon
                    className='text-guinda'
                />
            </div>
        </div>
    </div>
  )
};


export async function getServerSideProps() {
    const res = await fetch(URL_RECORDS,{
        headers : {
            'Content-Type' : 'application/json',

        }
    });
    const historial = await res.json();
    return {
        props : {
            historial
        }
    }
}