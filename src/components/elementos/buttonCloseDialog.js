import React, { useState } from 'react'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { Loader2, SaveIcon } from 'lucide-react';

export default function buttonCloseDialog({
    handleClickSave
}) {
    
    const [loadingData, setLoadingData] = useState(false);
    const handleClick=async()=>{
        setLoadingData(true);
        await handleClickSave();
        setLoadingData(false)
    }
  return (
    <div>
        <DialogFooter className='flex flex-row items-center my-4'>
            <DialogClose
                asChild
            >
                <Button
                    className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                    onClick={handleClick}
                >
                    {loadingData ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : <><SaveIcon/><span className='ml-2'>Actualizar Registro</span></>}
                </Button>
            </DialogClose>
        </DialogFooter>
    </div>
  )
}