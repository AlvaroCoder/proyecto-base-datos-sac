"use client"
import { SkeletonTable, TableEquipos } from '@/components';
import { useFetch } from '@/components/hooks/customHooks';
import React from 'react'

export default function Page() {
  const  URL_EQUIPOS = process.env.NEXT_PUBLIC_URL_EQUIPOS;
  const {loading : loadingDataEquipos, dataResponse : dataEquipos, error : errorDataEquipos, sessionUser : sessionUserEquipos} = useFetch(URL_EQUIPOS);
  console.log(dataEquipos);
  
    const headersEquipos = [
    "Descripcion",
    "Tipo",
    "Origen",
    "Año",
    "Ubicacion",
    "Estado"
  ]

  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Equipos
        </h1>
        {
          loadingDataEquipos ? <SkeletonTable headers={headersEquipos}/> : 
          <TableEquipos
            dataEquipos={dataEquipos}
            
          />
        }

    </div>
  )
}
