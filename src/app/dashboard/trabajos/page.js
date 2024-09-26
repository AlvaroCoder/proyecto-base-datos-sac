"use client"
import { SkeletonTable, TableTrabajos } from '@/components';
import { useFetch } from '@/components/hooks/customHooks';
import React from 'react'

export default function Page() {
  const URL_TRABAJOS = process.env.NEXT_PUBLIC_URL_TRABAJOS;

  const {loading : loadingDataTrabajos, dataResponse : dataTrabajos, error : errorDataTrabajos, sessionUser : sessionUserTrabajos} = useFetch(URL_TRABAJOS)
  const headersTrabajos=[
    "Titulo",
    "Curso",
    "Año",
    "Link"
  ]

  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Trabajos
        </h1>
        {loadingDataTrabajos ? <SkeletonTable headers={headersTrabajos} />:
          <TableTrabajos
            dataTrabajos={dataTrabajos}
          />
        }
    </div>
  )
}
