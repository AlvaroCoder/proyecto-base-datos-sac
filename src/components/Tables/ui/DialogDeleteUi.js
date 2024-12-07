import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import { Loader2 } from 'lucide-react';

export default function DialogDeleteUi({
    idDeleteData,
    handleClickDelete,
    handleClickCancel,
    children
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingData, setloadingData] = useState(false)
    const clickDeleteButton=async()=>{
        setloadingData(true);
        await handleClickDelete(idDeleteData);
        setloadingData(false);
    }
  return (
    <Dialog 
        open={openDialog} onOpenChange={setOpenDialog}
        className=""
    >
        <DialogTrigger >
            <Button
                
                variant="ghost"
            >
                <DeleteIcon className='mr-2'/> <span>Eliminar</span>
            </Button>
        </DialogTrigger>
        <DialogContent
            className=""
        >
            <DialogTitle>
                Estas seguro de eliminar este elemento?
            </DialogTitle>
            <DialogDescription>
                Ten en cuenta que no se podrán recuperar los datos una vez eliminados
            </DialogDescription>
            <section className=''>
                <div className='shadow-lg rounded-sm p-4 mb-4'>
                {children}
                </div>
                <div className='flex flex-row w-full py-2'>
                    <Button
                        disabled={loadingData}
                        onClick={clickDeleteButton}
                        className="bg-guinda mx-2 h-9 flex-1 py-2 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg text-sm "
                    >
                        {loadingData ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <p><DeleteIcon className='mr-2' />  Eliminar</p>}
                    </Button>
                    <Button
                        onClick={handleClickCancel}
                        variant="ghost"
                    >
                        Cancelar
                    </Button>
                </div>
            </section>
    </DialogContent>
</Dialog>
  )
};