"use client"
import { useFetch } from '@/components/hooks/customHooks';
import React from 'react'
import { PersonalProfileCard } from '@/components';
import RecordsCard from '@/components/Cards/RecordsCard';


export default function Page() {
  const URL_USERS=process.env.NEXT_PUBLIC_URL_USER;
  const URL_CATEGORIES = process.env.NEXT_PUBLIC_URL_CATEGORIES_USER;
  const URL_RECORDS = process.env.NEXT_PUBLIC_URL_RECORDS;

  const{dataResponse : user, error, loading} = useFetch(URL_USERS)
  const {dataResponse : userDataCategores, error : errorDataCategories, loading  : loadingDataCategories} = useFetch(URL_CATEGORIES);
  const {dataResponse : userDataRecords, error : errorDataRecords, loading : loadingDataRecords} = useFetch(URL_RECORDS)
  

  if (loading || loadingDataCategories || loadingDataRecords) {
    return <span>Cargando</span>
  }

  return (
   <section
    className='w-full min-h-screen p-8 overflow-y-auto '
   >
    <h1 className='text-guinda text-3xl font-bold'>Perfil</h1>
    
    <PersonalProfileCard
      {...user}
      dataCategories={userDataCategores?.agreements}
    />
    <RecordsCard
      dataRecords={userDataRecords}
    
    />
   </section>
  );
}
