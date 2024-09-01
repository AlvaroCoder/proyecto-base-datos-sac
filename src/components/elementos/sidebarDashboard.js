'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function SideBarDashboard() {
    const [openSidebar, setOpenSidebar] = useState(true);
    const routes=[
        {
            routeName : "Libros",
            routePath : "/dashboard/libros",
            routeIcon : BookIcon
        },
        {
            routeName : "Equipos",
            routePath : "/dashboard/equipos",
            routeIcon : LaptopChromebookIcon
        },
        {
            routeName : "Miembros",
            routePath : "/dashboard/miembros",
            routeIcon : GroupIcon
        },
        {
            routeName : "Proyectos",
            routePath : "/dashboard/proyectos",
            routeIcon : LightbulbIcon
        },
        {
            routeName : "Trabajos",
            routePath : "/dashboard/trabajos",
            routeIcon :  MenuBookIcon
        },
        {
            routeName : "Papers",
            routePath : "/dashboard/papers",
            routeIcon : InsertDriveFileIcon
        }
    ]
  return (
    <div  className={`${openSidebar ? 'w-48' : 'w-20'} bg-guinda h-screen flex flex-col justify-between relative z-50 duration-300`}>
       {
        openSidebar ?  <KeyboardDoubleArrowLeftIcon
        onClick={()=>setOpenSidebar(false)}
        className='absolute bg-white text-guinda text-3xl rounded-full top-9 border border-guinda -right-3 cursor-pointer z-50'    
        />  :
        <KeyboardDoubleArrowRightIcon
        className='absolute bg-white text-guinda text-3xl rounded-full top-9 border border-guinda -right-3 cursor-pointer z-50'    
        onClick={()=>setOpenSidebar(true)}
        /> 
       }
        <div className='mt-12'>
            <ul className='block mt-6'>
                {
                    routes.map((item,idx)=>{
                        const Icon = item.routeIcon;
                        return (
                            <Link 
                            key={idx} 
                            href={item.routePath}>
                            <li className={`list-none text-white cursor-pointer p-4 hover:bg-guindaOpaco w-full flex flex-row items-center ${!openSidebar && 'justify-center'}`} >
                                <Icon/>
                               {
                                openSidebar &&  <p className='ml-2'>{item.routeName}</p> 
                               }
                            </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
        <div className='w-full h-12 py-8 flex items-center justify-center text-white'>
            <PowerSettingsNewIcon/>
            {
                openSidebar && <p className='ml-2'>Cerrar Sesión</p>
            }
        </div>
    </div>
  )
}
