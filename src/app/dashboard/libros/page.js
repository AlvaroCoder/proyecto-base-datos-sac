"use client"
import { TableLibros, SkeletonTable } from '@/components';
import { useFetch } from '@/components/hooks/customHooks';
import React from 'react'


export default function Page() {

  const URL_LIBROS = process.env.NEXT_PUBLIC_URL_LIBROS
  const URL_STATUS = process.env.NEXT_PUBLIC_URL_STATUS
  const URL_LOCATIONS = process.env.NEXT_PUBLIC_URL_LOCATIONS
  const URL_USUARIOS = process.env.NEXT_PUBLIC_URL_USUARIOS;

  const {loading : loadingDataLibros, dataResponse : dataLibros, error : errorDataLibros, sessionUser : sessionUserLibros} = useFetch(URL_LIBROS);
  const {loading : loadingDataStatus, dataResponse : dataStatus, error:errorDataStatus} = useFetch(URL_STATUS);
  const {loading : loadingDataLocations, dataResponse : dataLocations, error : errorDataLocations} = useFetch(URL_LOCATIONS);
  const {loading : loadingDataUsuarios, dataResponse : dataUsuarios, error : errorDataUsuarios} = useFetch(URL_USUARIOS)
    
  const headersLibros = [
    "#",
    "Titulo",
    "Autor",
    "Ubicacion",
    "Estado",
    "Prestado a"
  ]
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Libros
        </h1>
        {(loadingDataLibros || loadingDataStatus || loadingDataLocations || loadingDataUsuarios)? <SkeletonTable headers={headersLibros}/> : <TableLibros 
        dataLibros={dataLibros} 
        dataLocations={dataLocations?.locations} 
        dataStatus={dataStatus?.status}
        dataUsers={dataUsuarios?.users}
        />}
    </div>
  )
}
