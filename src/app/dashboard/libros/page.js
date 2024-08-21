"use client"
import { TableLibros } from '@/components';
import { SkeletonTableLibros } from '@/components/elementos/loading';
import { useFetch } from '@/components/hooks/customHooks';
import React, { useState } from 'react'

const URL_LIBROS = "http://127.0.0.1:8000/home/libros"

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
