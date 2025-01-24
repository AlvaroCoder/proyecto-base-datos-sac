"use client"
import { SkeletonTable, TableTrabajos } from '@/components';
import { useFetch, useSession } from '@/components/hooks/customHooks';
import React from 'react'

export default function Page() {
  const URL_TRABAJOS = process.env.NEXT_PUBLIC_URL_TRABAJOS;
  const URL_COURSES = process.env.NEXT_PUBLIC_URL_COURSES;

  const {loading : loadingDataTrabajos, dataResponse : dataTrabajos, error : errorDataTrabajos} = useFetch(URL_TRABAJOS)
  const {loading : loadingDataCourses, dataResponse : dataCourses, error : errorDataCourses} = useFetch(URL_COURSES);
  const {loading : loadingDataSession, dataSession, error : errorDataSession} = useSession();

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
        {(loadingDataTrabajos || loadingDataCourses || loadingDataSession) ? <SkeletonTable headers={headersTrabajos} />:
          <TableTrabajos
            dataTrabajos={dataTrabajos}
            dataCourses={dataCourses.locations}
            dataSession={dataSession}
          />
        }
    </div>
  )
}
