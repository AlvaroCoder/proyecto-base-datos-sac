"use client"
import { TableMiembros } from '@/components';
import { useFetch } from '@/components/hooks/customHooks';
import React from 'react'

export default function Page() {
  const URL_MIEMBROS = process.env.NEXT_PUBLIC_URL_USUARIOS;
  const {loading : loadingDataMiembros, dataResponse : dataResponseMiembros, error : errorDataMiembros} = useFetch(URL_MIEMBROS)
  
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Miembros
        </h1>
        {
          loadingDataMiembros ? <p>Cargando datos ...</p> :
          <TableMiembros
            dataMiembros={dataResponseMiembros?.users}
          />
        }
    </div>
  )
}
