import React from 'react'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

export default function DialogCreateEquipos({
  dataDialog,
  
}) {
  return (
    <div className='max-h-[400px] h-full overflow-auto py-2 px-2'>
      <div className='my-2'>
        <h1>Nombre Equipo</h1>
        <Input
          name="equipment"
          required
        />
      </div>
      <div className='my-2 relative'  >
        <h1>Tipo</h1>
        <Input
          name="type"
          required/>
      </div>
      <div className='my-2 relative'>
        <h1>Origen</h1>
        <Input
          name='origin'
          
        />
      </div>
      <div className='my-2 relative'>
        <h1>Año de adquisición</h1>
        <Input
          name="year"
        />
      </div>
      <div className='w-full flex flex-row items-center justify-center my-2'>
        <section>
          <h1>Ubicacion</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full "
              >
                
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </section>
      </div>
    </div>
  )
};