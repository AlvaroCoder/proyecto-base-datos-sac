"use client"
import { TableLibros } from '@/components';
import { SkeletonTableLibros } from '@/components/elementos/loading';
import { useFetch } from '@/components/hooks/customHooks';
import React, { useState } from 'react'

const URL_LIBROS = "https://66c0fc73ba6f27ca9a5811d4.mockapi.io/libros/libros"
const data = [
  {
    "Autor": ["IEEE Robotics and automation society", "Johannes Kepler University Linz"],
    "Estado": "Disponible",
    "Titulo": "10th World Congress on Automatic Control Volume 6",
    "Ubicacion": "Oficina Ing. Soto",
    "Prestadoa": "Lavern",
    "id": "1"
},
]

export default function Page() {
  
  const {loading : loadingData, dataResponse, error} = useFetch(URL_LIBROS);
 
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Libros
        </h1>
        {loadingData ? <SkeletonTableLibros/> : <TableLibros dataLibros={dataResponse}/>}
    </div>
  )
}
