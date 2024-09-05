"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { handleGetCookie } from '../serverComp/addCookie';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const URL_IMG_UDEP = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png";
const URL_IMG_LABSAC = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319348/logo_lab_sac_guinda_xefpo1.png";

export default function TopBarDashboard() {
    const [userData, setUserData] = useState(null);
    useEffect(()=>{
        async function fetchCookie() {
            const user = await handleGetCookie();
            const values = JSON.parse(user.value)
            setUserData(values)
        }
        fetchCookie();
    },[])
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
            <div className=' flex flex-row items-center p-4 rounded-2xl bg-guindaOpaco mr-4'>
                <AccountCircleIcon className='text-white'/>
                <p className='text-white ml-4'>{userData&& userData.username}</p>
            </div>
            <div>
                <NotificationsIcon
                    className='text-guinda'
                />
            </div>
        </div>
    </div>
  )
};
