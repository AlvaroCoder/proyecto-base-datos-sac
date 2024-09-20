"use client"
import { SkeletonTable, TableProyectos } from '@/components';
import { useFetch } from '@/components/hooks/customHooks';
import React from 'react'

export default function Page() {
  const URL_PROYECTOS = process.env.NEXT_PUBLIC_URL_PROYECTOS;
  const {loading : loadingDataProyectos, dataResponse : dataProyectos, error : errorProyectos} = useFetch(URL_PROYECTOS)  
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Proyectos
        </h1>
        {
          loadingDataProyectos ? 
          <SkeletonTable  /> :
          <TableProyectos
            dataProyectos={dataProyectos}
          />
        }
    </div>
  )
}
