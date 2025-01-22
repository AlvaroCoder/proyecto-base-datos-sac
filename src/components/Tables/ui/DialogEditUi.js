import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';

export default function DialogEditUi({
    dataDialog,
    dataStatus=[],
    dataLocation=[],
    dataListAgreements=[],
    dataMembers=[],
    dataAutores=[],
    dataCoordinator=[],
    dataPeopleBorrowTo=[],
    dataCourses=[],
    dataType=[],
    dialogTitle="Edición",
    dataOrigin=[],
    handleClickSave,
    handleClickCancel,
    DialogBody=React.Component
}) {    
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

    const handleChangeExistChanges=()=>{
        setHasChanges(true);
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
                        dataMembers={dataMembers}
                        dataAutores={dataAutores}
                        dataLocation={dataLocation}
                        dataListAgreements={dataListAgreements}
                        dataCoordinator={dataCoordinator}
                        initialDataDialog={initialData}
                        dataType={dataType}
                        dataOrigin={dataOrigin}
                        handleClickSaveUpdate={handleClickSave}
                        setDataDialog={setDataDialogComponent}
                        dataPeopleBorrowTo={dataPeopleBorrowTo}
                        handleChangeExistChanges={handleChangeExistChanges}
                        handleChangeNotExistChanges={handleChangeNotExistChanges}
                        dataCourses={dataCourses}
                    />

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
