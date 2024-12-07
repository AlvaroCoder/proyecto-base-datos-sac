import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Loader2 } from 'lucide-react';

import SaveIcon from '@mui/icons-material/Save';

export default function DialogEditUi({
    dataDialog,
    dataStatus=[],
    dataLocation=[],
    dataCoordinator=[],
    dataPeopleBorrowTo=[],
    dataType=[],
    dialogTitle="Edición",
    dataOrigin=[],
    handleClickSave,
    handleClickCancel,
    setDataTable,
    DialogBody=React.Component
}) {
    console.log(dataDialog);
    
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [openDialogAlert, setOpenDialogAlert] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const initialData = {
        ...dataDialog,
        authors_added : [],
        authors_deleted : []
    }
    const [dataDialogComponent, setDataDialogComponent] = useState(initialData);
    const handleClickSaveData=async()=>{
        setLoadingData(true);
        await setDataTable(dataDialogComponent);
        setLoadingData(false);
        setOpenDialog(false);
        setHasChanges(false);        
    }
    const handleCliclCancelSave=()=>{
        if (hasChanges) {
            setOpenDialogAlert(true);
            return;
        }
        setOpenDialog(false);
        setHasChanges(false);
    }
    const handleChangeExistChanges=()=>{
        setHasChanges(true)
    }
    const handleChangeNotExistChanges=()=>{
        setHasChanges(false)
    }
    const resetData=()=>{
        setDataDialogComponent(initialData);
    }
    return (
        <>
        <Dialog open={openDialog} onOpenChange={()=>{
            if (hasChanges) {
                setOpenDialogAlert(true);
                return;
            }
            setOpenDialog(!openDialog);
        }}>
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
                <DialogDescription>
                    Ventana para editar los datos del elemento
                </DialogDescription>
                <section>
                    <DialogBody
                        dataDialog={dataDialogComponent}
                        dataStatus={dataStatus}
                        dataLocation={dataLocation}
                        dataCoordinator={dataCoordinator}
                        initialDataDialog={initialData}
                        dataType={dataType}
                        dataOrigin={dataOrigin}
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
        <Dialog open={openDialogAlert} onOpenChange={setOpenDialogAlert} >
            <DialogContent>
                <DialogTitle>Estas seguro de salir sin Guardar</DialogTitle>
                
            <div>
                <p className='mb-8'>Si continuas, no se guardaron los cambios</p>
            <section>
                    <Button
                        onClick={()=>{
                            resetData();
                            setOpenDialogAlert(false);
                            setOpenDialog()
                        }}
                        variant="ghost"
                        className="shadow-sm mr-4"
                    >
                        Continuar 
                    </Button>
                    <Button
                        onClick={()=>setOpenDialogAlert(false)}
                        className="bg-guindaOpaco cursor-pointer p-2 text-white font-bold hover:bg-guindaOpaco"
                    >   
                        Seguir editando
                    </Button>
                </section>
            </div>
            </DialogContent>
        </Dialog>
        </>
  )
};
