import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';

/**
 * 
 *               <Button
                variant="ghost"
                onClick={handleClickDelete}
              >
                <DeleteIcon className='mr-2'/> <span>Eliminar</span>
              </Button>
 */

export default function DialogDeleteUi({
    
    handleClickDelete,
    handleClickCancel,
    children
}) {
    const [openDialog, setOpenDialog] = useState(false);
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
            <section>
                {children}
                <div className='flex flex-row w-full py-2'>
                    <Button
                        onClick={handleClickDelete}
                        className="bg-guinda mx-2 h-9 px-4 py-2 hover:bg-red-800 w-fit flex flex-row items-center text-white rounded-lg text-sm "
                    >
                        Eliminar
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