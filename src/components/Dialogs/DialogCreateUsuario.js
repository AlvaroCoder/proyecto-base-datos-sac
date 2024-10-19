import React, { useState } from 'react'
import { Input } from '../ui/input'
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import SaveIcon from '@mui/icons-material/Save';

export default function DialogCreateUsuario() {
  const [dataDialog, setDataDialog] = useState({
    user_name : "",
    first_name : "",
    last_name : "",
    email : "",
    category : "Tesista",
    phone : "",
    disabled : false
  });
  const [loadingData, setLoadingData] = useState(false);

  const handleChangeInput=(evt)=>{
    const target = evt.target;
    setDataDialog({
      ...dataDialog,
      [target.name] : target.value
    })
  }
  const handleClickSave=()=>{

  }
  return (
    <section>
     <div className='my-2'>
        <h1 className='font-bold'>Usuario</h1>
        <Input
          name="user_name"
          value={dataDialog.user_name}
          onChange={handleChangeInput}
          required
        />
     </div>
     <div className='grid grid-cols-2 gap-2'>
        <div>
          <h1 className='font-bold'>Nombre</h1>
          <Input
            name="first_name"
            value={dataDialog.first_name}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div>
          <h1 className='font-bold'>Apellido</h1>
          <Input
            name="last_name"
            value={dataDialog.last_name}
            onChange={handleChangeInput}
            required
          />
        </div>
     </div>
     <div>
        <h1 className='font-bold'>Email</h1>
        <Input
          name="email"
          value={dataDialog.email}
          onChange={handleChangeInput}
          type="email"
          required
        />
     </div>
     <div>
        <h1 className='font-bold'>Telefono</h1>
        <Input
          name="phone"
          value={dataDialog.phone}
          onChange={handleChangeInput}
          type="number"
        />
     </div>

     <DialogFooter className='flex flex-row items-center my-4'>
      <DialogClose
          asChild
        >
          <Button
            className="flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4 text-white text-center hover:bg-guindaOpaco hover:font-bold border-2 border-guinda hover:border-guinda"
            onClick={handleClickSave}
          > 
            {loadingData ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <><SaveIcon/><span className='ml-2'>Guardar Registro</span></>}
          </Button>
        </DialogClose>
     </DialogFooter>
    </section>
  )
}
