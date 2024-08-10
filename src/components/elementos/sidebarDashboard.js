import Link from 'next/link'
import React from 'react'

import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function SideBarDashboard() {
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
        }
    ]
  return (
    <div  className='max-w-[150px] w-full bg-guinda h-screen flex flex-col justify-between'>
        <div className='mt-12'>
            <ul className='block mt-6'>
                {
                    routes.map((item,idx)=>{
                        const Icon = item.routeIcon;
                        return (
                            <Link 
                            key={idx} 
                            href={item.routePath}>
                            <li className='list-none text-white cursor-pointer p-4 hover:bg-guindaOpaco w-full flex flex-row items-center' >
                                <Icon/>
                                <p className='ml-2'>{item.routeName}</p>
                            </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
        <div className='w-full h-12 py-8 flex items-center justify-center'>
            <p className='text-white'>Cerrar Sesión</p>
        </div>
    </div>
  )
}
