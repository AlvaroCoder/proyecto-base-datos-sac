"use client"
import { SkeletonTable, TableProyectos } from '@/components';
import { useFetch, useSession } from '@/components/hooks/customHooks';
import React from 'react'

export default function Page() {
  const URL_PROYECTOS = process.env.NEXT_PUBLIC_URL_PROYECTOS;
  const URL_MIEMBROS = process.env.NEXT_PUBLIC_URL_MIEMBROS;
  const URL_CARGOS_USUARIO = process.env.NEXT_PUBLIC_URL_CATEGORIES_USER;
  const URL_STATUS_PROYECTS = process.env.NEXT_PUBLIC_URL_STATUS_PROYECTS;
  const URL_AGREEMENTS=process.env.NEXT_PUBLIC_URL_AGREEMENTS;

  const {loading : loadingDataProyectos, dataResponse : dataProyectos, error : errorProyectos} = useFetch(URL_PROYECTOS)  
  const {loading : loadingDataMiembros, dataResponse : dataMiembros, error : errorMiembros} = useFetch(URL_MIEMBROS);
  const {loading : loadingDataCategoriesUser, dataResponse : dataCategoriesUser} = useFetch(URL_CARGOS_USUARIO);
  const {loading : loadingDataStatusProyects, dataResponse: dataStatusProyects} = useFetch(URL_STATUS_PROYECTS);
  const {loading : loadingDataAgreements, dataResponse : dataAgreements} = useFetch(URL_AGREEMENTS);
  const {loading : loadingDataSession , dataSession, error : errorDataSession} = useSession();
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='text-guinda font-bold text-2xl'>
            Proyectos
        </h1>
        {
          (loadingDataProyectos || loadingDataMiembros || loadingDataCategoriesUser || loadingDataStatusProyects || loadingDataAgreements || loadingDataSession) ? 
          <SkeletonTable  /> :
          <TableProyectos
            dataProyectos={dataProyectos}
            dataMiembros={dataMiembros}
            dataCargosUsuarios={dataCategoriesUser?.agreements}
            dataStatus={dataStatusProyects?.status}
            dataAgreements={dataAgreements?.agreements}
            dataSession={dataSession}
          />
        }
    </div>
  )
}
