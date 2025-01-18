"use client"
import { SkeletonTable, TableEquipos } from '@/components';
import { useFetch } from '@/components/hooks/customHooks';
import React from 'react'

export default function Page() {
  const  URL_EQUIPOS = process.env.NEXT_PUBLIC_URL_EQUIPOS;
  const  URL_STATUS_EQUIPOS = process.env.NEXT_PUBLIC_URL_STATUS_EQUIPOS;
  const  URL_LOCATION_EQUIPOS = process.env.NEXT_PUBLIC_URL_LOCATION_EQUIPOS;
  const URL_TYPE_LOCATIONS = process.env.NEXT_PUBLIC_URL_TYPE_EQUIPOS;

  const {loading : loadingDataEquipos, dataResponse : dataEquipos, error : errorDataEquipos} = useFetch(URL_EQUIPOS);  
  const {loading : loadingDataStatusEquipos, dataResponse : dataStatusEquipos} = useFetch(URL_STATUS_EQUIPOS);
  const {loading : loadingDataLocationEquipos, dataResponse : dataLocationEquipos} = useFetch(URL_LOCATION_EQUIPOS);
  const {loading : loadingDataTypeEquipos, dataResponse :dataTypeEquipos} = useFetch(URL_TYPE_LOCATIONS);
  
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
          (loadingDataEquipos || loadingDataStatusEquipos || loadingDataLocationEquipos || loadingDataTypeEquipos) ? 
          <SkeletonTable headers={headersEquipos}/> : 
          <TableEquipos
            dataEquipos={dataEquipos}
            dataLocationEquipos={dataLocationEquipos?.locations}
            dataStatusEquipos={dataStatusEquipos?.status}
            dataTypeEquipos={dataTypeEquipos?.equipment_types}
          />
        }

    </div>
  )
}
