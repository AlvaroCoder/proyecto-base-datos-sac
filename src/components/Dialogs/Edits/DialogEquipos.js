import React, { useRef, useState } from 'react'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea';
import { ButtonCloseDialog, DropdownMenuComponent, FormUploadImage, PopOverAddButton } from '@/components';
import { UPDATE_EQUIPO, UPLOAD_IMAGE_EQUIPO } from '@/components/commons/apiConnection';
import { useToast } from '@/components/ui/use-toast';

export default function DialogEquipos({
    initialDataDialog,
    handleChangeExistChanges,
    setDataDialog : setDataDialogEquipos,
    handleClickSaveUpdate,
    dataType=[],
    dataLocation=[],
    dataStatus=[],
}) {    
    const {toast} = useToast();
    const [dataEquipment, setDataEquipment] = useState({
        id : initialDataDialog?.id,
        equipment: initialDataDialog?.equipment,
        description : initialDataDialog?.description,
        evidence : initialDataDialog?.evidence,
        origin : initialDataDialog?.origin,
        year : initialDataDialog?.year,
        type : dataType[0],
        location : dataLocation[0],
        status : dataStatus[0],
    });

    const handleChangeInput=(evt)=>{
        const target = evt.target;
        const nameInput = target.name;
        const valueInput = target.value;
        setDataEquipment({
            ...dataEquipment,
            [nameInput] : valueInput
        });
    }   
    
    const handleClickSave=async()=>{
        let urlImagen =null;
        if (dataEquipment.evidence) {
            const newFormDataImage = new FormData();
            newFormDataImage.append("evidence", dataEquipment.evidence);
            newFormDataImage.append("equipment_name", dataEquipment.equipment);
            const responseImage = await UPLOAD_IMAGE_EQUIPO(newFormDataImage);
            if (!responseImage.ok) {
                toast({
                    variant : "destructive",
                    title : "Error",
                    description : "Problemas de subir la imagen"
                });
                return;
            }
            const responseImageJSON = await responseImage.json();
            urlImagen=responseImageJSON?.url;
        }
        const newJSONToSend={
            ...dataEquipment,
            evidence : urlImagen
        };
        const response = await UPDATE_EQUIPO(newJSONToSend);
        if (!response.ok) {
            const responseJSON = await response.json();
            toast({
                variant: "destructive",
                title : "Error",
                description : `Ocurrio un error con el servidor : ${responseJSON?.detail}`
            });
            return;
        }
        const responseJSON = await response.json();
        console.log(responseJSON);
        handleClickSaveUpdate(dataEquipment);
        toast({
            title : "Exito",
            description : `Se actualizo con exito el libro`
        })
    }

  return (
    <section className='h-fit overflow-auto py-2  px-2 max-h-[400px] overflow-y-auto'>
        <div className='my-2'>
            <h1 className='font-bold'>Equipo</h1>
            <Input
                name="equipment"
                value={dataEquipment?.equipment}
                required
                onChange={handleChangeInput}
            />
        </div>
        <div className='my-2'>
            <h1 className='font-bold'>Descripcion</h1>
            <Textarea
                name="description"
                value={dataEquipment?.description}
                onChange={handleChangeInput}
            />
        </div>
        <div className='my-2'>
            <h1 className='font-bold'>Evidencia</h1>
            <FormUploadImage
                previewImage={dataEquipment.evidence}
                handleChange={(file)=>{
                    setDataEquipment({
                        ...dataEquipment,
                        evidence : file
                    })
                }}
            />
        </div>
        <div className='my-2 relative'>
            <h1 className='font-bold'>Tipo</h1>
            <PopOverAddButton
                data={dataType}
                dataMembers={false}
                textButton='Selecciona un tipo de equipo'
                changeValue={(data)=>{
                    setDataEquipment({
                        ...dataEquipment,
                        type : data
                    });
                    handleChangeExistChanges();
                }}
            />
        </div>
        <div className='my-2'>
                <h1 className='font-bold'>Origen</h1>
                <Input
                    name="origin"
                    value={dataEquipment?.origin}
                    onChange={handleChangeInput}
                />
            </div>
            <div className='my-2'>
                <h1 className='font-bold'>Año de adquisición</h1>
                <Input
                    name="year"
                    value={dataEquipment?.year}
                    onChange={handleChangeInput}
                />
            </div>
        <div className='w-full flex flex-row items-center justify-center my-2'>
            <section className='flex-1'>
                <h1 className='font-bold'>Ubicacion</h1>
                <DropdownMenuComponent
                    data={dataLocation}
                    initialValue={dataEquipment?.location}
                    changeData={(data)=>{
                    handleChangeExistChanges();    
                    setDataEquipment({
                        ...dataEquipment,
                        location : data
                    })}}
                />
            </section>
            <section className='flex-1 ml-2'>
                <h1 className='font-bold'>Estado</h1>
                <DropdownMenuComponent
                    data={dataStatus}
                    initialValue={dataEquipment?.status}
                    changeData={(data)=>{
                    handleChangeExistChanges();
                    setDataEquipment({
                        ...dataEquipment,
                        status : data
                    })}}
                />
            </section>
        </div>
        <ButtonCloseDialog
            handleClickSave={handleClickSave}
            textButton='Actualizar Registro'
        />
    </section>
  )
};
