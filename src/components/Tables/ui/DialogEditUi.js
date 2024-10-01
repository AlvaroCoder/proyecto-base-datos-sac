import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Loader2 } from 'lucide-react';

import SaveIcon from '@mui/icons-material/Save';

export default function DialogEditUi({
    dataDialog,
    dataStatus=[],
    dataLocation=[],
    dataPeopleBorrowTo=[],
    dialogTitle="Edición",
    handleClickSave,
    handleClickCancel,
    DialogBody=React.Component
}) {
    
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [dataDialogComponent, setDataDialogComponent] = useState({
        ...dataDialog,
        authors_added : [],
        authors_deleted : []
    });
    const handleClickSaveData=()=>{
        setOpenDialog(false);
        console.log(dataDialogComponent);
        
    }
    const handleCliclCancelSave=()=>{
        setOpenDialog(false);

    }
    const handleChangeExistChanges=()=>{
        setHasChanges(true)
    }
    const handleChangeNotExistChanges=()=>{
        setHasChanges(false)
    }
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger >
                <Button 
                    className="w-full"
                    variant="ghost"
                >
                    <EditIcon className='mr-2' /> <span>Editar</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <section>
                    <DialogBody
                        dataDialog={dataDialogComponent}
                        dataStatus={dataStatus}
                        dataLocation={dataLocation}
                        setDataDialog={setDataDialogComponent}
                        dataPeopleBorrowTo={dataPeopleBorrowTo}
                        handleChangeExistChanges={handleChangeExistChanges}
                        handleChangeNotExistChanges={handleChangeNotExistChanges}
                    />
                    <div className='flex flex-row items-center my-4'>
                        <Button
                            className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                            disabled={!hasChanges || loadingData}
                            onClick={handleClickSaveData}
                        >
                           {loadingData ?  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <><SaveIcon/><span className='ml-2'>Guardar Cambios</span></>}
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleCliclCancelSave}
                        >
                            <p>Cancelar</p>
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
  )
};
