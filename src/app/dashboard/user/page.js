"use client"
import { getSession } from '@/authentication/lib';
import { useFetch } from '@/components/hooks/customHooks';
import React, { useEffect, useState } from 'react'
import { PersonalProfileCard } from '@/components';


export default function Page() {
  const URL_USERS=process.env.NEXT_PUBLIC_URL_USER;

  const{dataResponse : user, error, loading} = useFetch(URL_USERS)
  
  if (loading || loadingDataCategories) {
    return <span>Cargando</span>
  }

  return (
   <section
    className='w-full min-h-screen p-8 '
   >
    <h1 className='text-guinda text-3xl font-bold'>Perfil</h1>
    
    <PersonalProfileCard
      {...user}
    />
   </section>
  );
}
