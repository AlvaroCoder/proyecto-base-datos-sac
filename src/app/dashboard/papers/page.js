"use client"
import { SkeletonTable, TablePapers } from '@/components';
import { useFetch } from '@/components/hooks/customHooks'
import React from 'react'

export default function Page() {
  const URL_PAPERS = process.env.NEXT_PUBLIC_URL_PAPERS; 

  const {loading : loadingDataPapers, dataResponse : dataPapers, error : errorDataPapers, sessionUser : sessionUserPapers} = useFetch(URL_PAPERS);
  const headerPapers = [
    "Titulo",
    "Miembros",
    "Año",
    "Link"
  ]
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Papers
        </h1>
        {
          loadingDataPapers ? <SkeletonTable headers={headerPapers} /> :
          <TablePapers
            dataPapers={dataPapers}
          />
        }
    </div>
  )
}
