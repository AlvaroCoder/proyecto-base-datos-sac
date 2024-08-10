import Link from 'next/link'
import React from 'react'

export default function SideBarDashboard() {
    const routes=[
        {
            routeName : "Libros",
            routePath : "/dashboard/libros",
            
        },
        {
            routeName : "Equipos",
            routePath : "/dashboard/equipos",
            
        },
        {
            routeName : "Miembros",
            routePath : "/dashboard/miembros",
            
        },
        {
            routeName : "Proyectos",
            routePath : "/dashboard/proyectos",
            
        }
    ]
  return (
    <div  className='max-w-[150px] w-full bg-guinda h-screen flex flex-col'>
        <div>
            <ul className='block mt-6'>
                {
                    routes.map((item,idx)=><Link key={idx} href={item.routePath}>
                    <li className='list-none text-white cursor-pointer py-4 hover:bg-guindaOpaco w-full' >
                        <p>{item.routeName}</p>
                    </li>
                    </Link>)
                }
            </ul>
        </div>
    </div>
  )
}
