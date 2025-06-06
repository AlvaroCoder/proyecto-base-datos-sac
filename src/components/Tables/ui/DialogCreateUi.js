import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

export default function DialogCreateUi({
    dialogTitle="Crear Registro",
    textButtonCreate="Agregar Registro",
    DialogBody=React.Component,
    dataDialog,

}) {
    const [openDialog, setOpenDialog] = useState(false);
    
  return (
    <>
        <Dialog
            open={openDialog}
            onOpenChange={setOpenDialog}
        >
            <DialogTrigger>
                <Button
                    variant="ghost"
                    className="bg-guinda mx-2 h-9 px-4 py-2 hover:bg-red-800 hover:text-white w-fit flex flex-row items-center text-white rounded-lg text-sm "
                >
                    <AddIcon/> <span>{textButtonCreate}</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <section>
                    {DialogBody}
                </section>
            </DialogContent>
        </Dialog>
    </>
  )
}