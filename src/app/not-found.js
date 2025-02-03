import React from 'react'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-full bg-white h-screen flex flex-col items-center justify-center'>
        <h2 className='text-orange-500'>Pagina no encontrada</h2>
        <Link href={"/"} className='text-black'>Regresar al inicio</Link>
    </div>
  )
}
