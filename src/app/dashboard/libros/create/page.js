import { Input } from '@/components/ui/input'
import React from 'react'

export default function Page() {
  return (
    <div className='w-full max-h-screen overflow-y-auto px-6 py-4 '>
        <h1 className='font-bold text-guinda text-2xl'>Nuevo Libro</h1>    
        <div>
            <h1>Titulo</h1>
            <Input/>
        </div>
    </div>
  )
}
