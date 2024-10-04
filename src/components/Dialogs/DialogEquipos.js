import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function DialogEquipos({
    initialDataDialog,
    dataDialog,
    handleChangeExistChanges,
    setDataDialog : setDataDialogEquipos,
    dataType=[],
    dataOrigin=[],
    dataLocation=[],
    dataStatus=[]
}) {    
    
    const [mostrarComentarios, seTmostrarComentarios] = useState(false);
    const [mostrarDropdownInputType, setMostrarDropdownInputType] = useState(false);
    const [mostrarDropdownInputOrigin, setMostrarDropdownInputOrigin] = useState(false);

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [filterSearchType, setFilterSearchType] = useState(dataType);
    const [filterSearchOrigin, setFilterSearchOrigin] = useState(dataOrigin);

    const handleChangeMostrarComentario=()=>{
        seTmostrarComentarios(!mostrarComentarios);
    }
    const handleChangeInput=(evt,keyValue)=>{
        const inputValue = evt.target.value;
        if (inputValue!==dataDialog[keyValue]) {
            handleChangeExistChanges()
        }
        setDataDialogEquipos({
            ...dataDialog,
            [keyValue] : inputValue
        })
    }
    const handleChangeImage=(evt)=>{
        const file = evt.target.files[0];
        if (file) {
            setImagenSeleccionada(URL.createObjectURL(file))
        }
    }
    const handleDrop=(evt)=>{
        evt.preventDefault();
        const file = evt.dataTransfer.files[0];
        if (file) {
            setImagenSeleccionada(URL.createObjectURL(file));
        }
    }
    const handleDragOver=(evt)=>{
        evt.preventDefault();
    }
  return (
    <section className='max-h-[500px] h-full overflow-auto'>
        <div className='my-2'>
            <h1>Equipo</h1>
            <Input
                name="equipment"
                value={dataDialog?.equipment}
                onChange={(evt)=>handleChangeInput(evt, "equipment")}
                required
            />
        </div>
        <div className='my-2 relative'>
            <h1>Tipo</h1>
            <Input
                name="type"
                value={dataDialog?.type}
                onChange={(evt)=>{
                    handleChangeInput(evt, "type");
                    setMostrarDropdownInputType(evt.target.value !== initialDataDialog?.type)
                    setFilterSearchType(dataType.filter(item=>item.toUpperCase().includes(evt.target.value.toUpperCase())))
                }}
                required
            />
            {
                (mostrarDropdownInputType && filterSearchType.length > 0) &&
                <div className='absolute mt-2 shadow-lg rounded-lg p-2 bg-white w-full'>
                    {
                        filterSearchType.map((item, idx)=>{
                            if (idx < 4) {
                                return (
                                    <Button key={idx} className="w-full" variant="ghost" onClick={(evt)=>{
                                        evt.preventDefault();
                                        setDataDialogEquipos({
                                            ...dataDialog,
                                            type : item
                                        });
                                        setMostrarDropdownInputType(false);
                                    }}>
                                        {item}
                                    </Button>
                                )
                            }
                            return null
                        })
                    }
                </div>
            }
        </div>
        <div className='my-2 relative'>
            <h1>Origen</h1>
            <Input
                name="origin"
                value={dataDialog?.origin}
                onChange={(evt)=>{
                    handleChangeInput(evt, "origin");
                    setMostrarDropdownInputOrigin(evt.target.value!==initialDataDialog?.origin);
                    setFilterSearchOrigin(dataOrigin.filter(item=>item.toUpperCase().includes(evt.target.value.toUpperCase())));
                    
                }}
            />
            {
                (mostrarDropdownInputOrigin && filterSearchOrigin.length > 0) &&
                <div className='absolute mt-2 shadow-lg rounded-lg p-2 bg-white w-full'>
                    {
                        filterSearchOrigin.map((item,idx)=>{
                            if (idx < 4) {
                                return (
                                    <Button key={idx} className="w-full" variant="ghost" onClick={(evt)=>{
                                        evt.preventDefault();
                                        setDataDialogEquipos({
                                            ...dataDialog,
                                            origin : item
                                        })
                                        setMostrarDropdownInputOrigin(false);
                                    }}>
                                        {item}
                                    </Button>
                                )
                            }
                            return null
                        })
                    }
                </div>
            }
        </div>
        <div className='my-2 relative'>
            <h1>Año de adquisición</h1>
            <Input
                name="year"

            />
        </div>

        <div className='w-full flex flex-row items-center justify-center my-2'>
            <section className='flex-1'>
                <h1>Ubicacion</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full border border-slate-50 shadow-sm"
                        >
                            {dataDialog?.location?.value}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                        {
                            dataLocation?.map((item, idx)=><DropdownMenuItem key={idx}><p>{item}</p></DropdownMenuItem>)
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>
            <section className='flex-1 ml-2'>
                <h1>Estado</h1>
                <DropdownMenu >
                    <DropdownMenuTrigger className='w-full'>
                        <Button
                            variant="ghost"
                            className="w-full border border-slate-50 shadow-sm"
                        >
                            {dataDialog?.status?.value}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                        {
                            dataStatus?.map((item, idx)=><DropdownMenuItem key={idx} ><p>{item}</p></DropdownMenuItem>)
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>
        </div>
        {
                mostrarComentarios ? 
                <div className='my-2'>
                <h1>Comentarios</h1>
                <Textarea
                    placeholder ="Ingresa un comentario"
                />
                <h1>Evidencia</h1>
                <div 
                onDrop={handleDrop}
                onDrag={handleDragOver}
                className="mt-5 w-full p-4 border-2 border-dashed border-blue-400 bg-blue-50 text-center rounded-lg">
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleChangeImage}
                        className="block w-full mb-3"
                    />
                    <div className="h-48 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                        {
                            imagenSeleccionada ?
                            <img
                                src={imagenSeleccionada}
                                alt="Previsualización" 
                                className="max-h-full max-w-full rounded-md"
                            /> :
                            <p className="text-gray-600">Arrastra y suelta una imagen aquí o selecciona una desde tu dispositivo</p>
                        }
                    </div>
                </div>
                </div>:
                <Button
                    className="text-guinda hover:bg-white underline hover:text-guinda"
                    variant="ghost"
                    onClick={handleChangeMostrarComentario}
                >
                    Agregar comentario+
                </Button>
        }

    </section>
  )
};
