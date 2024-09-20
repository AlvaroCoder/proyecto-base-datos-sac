"use client"
import React,{useMemo, useState} from 'react'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';

import TableLayout from './Layout/TableLayout'

function obtenerEstadosUnicos(listaObjetos) {
    const estadosUnicos = [...new Set(listaObjetos.map(objeto => objeto.status.value))];
    return estadosUnicos;
}

function obtenerPrestadosUnicos(listaObjetos) {
    const estadosUnicos = [...new Set(listaObjetos.map(objeto => objeto.Prestadoa))];
    return estadosUnicos;
}

function obtenerUbicacionUnica(listaObjetos) {
    const estadosUnicos = [...new Set(listaObjetos.map(objeto => objeto.Ubicacion))];
    return estadosUnicos;
}

function DialogLibros() {
    return(
        <section>
        <div className='my-2'>
            <h1>Titulo</h1>
            <Input 
                name="title"
                value={dataDialog?.title}
                onChange={(evt)=>{
                    setDataToSend({
                        ...dataToSend,
                        title : evt.target.value
                    });
                    setHasChanges(true);
                    handleChangeInput(dataDialog?.id, "title", evt.target.value)
                }}
            />
        </div>
        <div className='my-2'>
            <h1>Autor</h1>
            <div className='w-full rounded-lg grid grid-cols-auto-fill-100 auto-cols-max gap-2 items-center'>
                {
                    dataDialog?.authors?.map((author, key)=>
                    <p key={key} className='p-2 bg-slate-100 rounded-xl w-fit mt-2 text-nowrap'>
                        <span className='mr-2'>{author?.value}
                            <ClearIcon 
                            className='cursor-pointer'
                            onClick={()=>{
                                const updateData = [...dataDialog?.authors].filter((_, idx)=>idx!==key);
                                const existAuthorInAdded = [...dataToSend.authors_added].some(autor=>autor.name ==  author?.value) 
                                
                                if (author.id) {
                                    setDataToSend({
                                        ...dataToSend,
                                        authors_deleted : [...dataToSend.authors_deleted, {
                                            id : author?.id,
                                            name : author?.value
                                        }]
                                    });
                                }
                                if (existAuthorInAdded) {                                            
                                    setDataToSend({
                                        ...dataToSend,
                                        authors_added : [...dataToSend.authors_added].filter(item=>!item.name.toUpperCase().includes(author.value.toUpperCase()))
                                    })
                                }
                                
                                handleChangeInput(dataDialog?.id,"authors", updateData);     

                                setHasChanges(true);          
                            }}/></span>
                    </p>)
                }
            </div>
            <div className='mt-2'>
                {
                    showFormNewAuthor ? 
                    <section className='p-4 rounded-lg bg-slate-50'>
                        <h1 className='font-bold'>Nuevo Autor</h1>
                        <div className='grid grid-cols-1 gap-2'>
                            <div className='flex-1'>
                                <label>Nombre</label>
                                <Input
                                    name="nombreAutor"
                                    onChange={(evt=>setInputsFormAuthor(evt.target.value))}
                                />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <Button
                                className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"                                    
                                onClick={(evt)=>{
                                    evt.preventDefault();
                                    handleChangeInput(dataDialog?.id, "authors", [...dataDialog?.authors, {
                                        value : inputsFormAuthor
                                    }]);
                                    setDataToSend({
                                        ...dataToSend,
                                        authors_added : [...dataToSend.authors_added, {name : inputsFormAuthor}] 
                                    });
                                    // Reseteamos el valor del form author
                                    setInputsFormAuthor("");
                                    setShowFormNewAuthor(false);
                                    setHasChanges(true);
                                }}
                            >  
                                Agregar
                            </Button>
                            <Button
                                variant="ghost"
                                className="mx-2"
                                onClick={(evt)=>{
                                    evt.preventDefault();
                                    setInputsFormAuthor("");
                                    setShowFormNewAuthor(false);
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </section> :
                    <Button
                        variant="ghost"
                        className="text-guinda underline hover:bg-white hover:text-guinda"
                        onClick={()=>setShowFormNewAuthor(true)}
                    >
                        Agregar autor <AddIcon/>
                    </Button>
                }
            </div>
        </div>
        <div className='my-2 flex flex-row items-center'>
            <div className='w-[300px] flex flex-col'>
                <h1 className='font-bold'>Ubicación</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full border-gray-100 border-[1px] shadow-sm"
                        >
                            <span>{dataDialog?.location?.value}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            dataLocation.map(item=>
                            <DropdownMenuCheckboxItem
                                checked={item.id === dataDialog?.location?.id}
                                className="capitalize"
                                onCheckedChange={()=>{
                                    const jsonSelected = dataLocation?.filter(elem=>elem.id ===  item.id)[0];
                                    handleChangeInput(dataDialog?.id, "location" , jsonSelected);
                                    setDataToSend({
                                        ...dataToSend,
                                        location : jsonSelected.id
                                    });
                                    setHasChanges(true);
                                }}
                            >
                                {item.value}
                            </DropdownMenuCheckboxItem>)
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='flex-1 ml-2'>
                <h1>Estado</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full border-gray-100 border-[1px] shadow-sm"
                        >
                            <span>{dataDialog?.status?.value}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            dataStatus.map(item=>
                                <DropdownMenuCheckboxItem
                                    className="capitalize"
                                    checked={item.id === dataDialog?.status?.id}
                                    onCheckedChange={()=>{
                                        const jsonSelected=dataStatus?.filter(elem=> elem.id === item.id)[0];
                                        handleChangeInput(dataDialog?.id, "status", jsonSelected);
                                        setDataToSend({
                                            ...dataToSend,
                                            status : jsonSelected.id
                                        });
                                        setHasChanges(true);
                                    }}
                                >
                                    {item.value}
                                </DropdownMenuCheckboxItem>
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div className='flex-1 border-b-2 border-b-guindaOpaco py-2 my-4'>
            <h1 className='font-bold'>
                Prestado a
            </h1>
        </div>
        <div className='w-full mb-4'>
            {
                dataPeopleBorrowTo.length > 0 &&
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Apellido</TableHead>
                            <TableHead><DeleteIcon/></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            dataPeopleBorrowTo?.map((people, idx)=>(
                                <TableRow key={idx}>
                                    <TableCell>{people?.nombre}</TableCell>
                                    <TableCell>{people?.apellido}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={
                                                (evt)=>{
                                                    evt.preventDefault();
                                                    const newListPeopleBorrow = dataPeopleBorrowTo.filter((_,indexpeople)=>idx!==indexpeople);
                                                    setDataPeopleBorrowTo(newListPeopleBorrow);
                                                }
                                            }
                                                className="text-guinda bg-white hover:bg-white border-guinda border-2"
                                            >
                                                <DeleteIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }
        </div>
        <div>
            {
                showFormNewPerson ?
                <section className='p-4 rounded-lg bg-slate-50'>
                    <h1 className='font-bold'>Nueva Persona</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex-1'>
                            <label className='text-sm' htmlFor='nombrePersona' >Nombre</label>
                            <Input
                                name="nombrePersona"
                                value={inputsFormPerson.nombrePersona}
                                onChange={handleChangeInputPerson}
                            />
                        </div>
                        <div className='flex-1 ml-2'>
                            <label className='text-sm' htmlFor='apellidoPersona'>Apellido</label>
                            <Input
                                name="apellidoPersona"
                                value={inputsFormPerson.apellidoPersona}
                                onChange={handleChangeInputPerson}
                            />
                        </div>
                        <div>
                            <Button
                                className="bg-white text-guinda border-2 border-guinda hover:bg-red-50"
                                onClick={(evt)=>{
                                    evt.preventDefault();
                                    const newListPeopleBorrow=[...dataPeopleBorrowTo, {
                                        nombre : inputsFormPerson.nombrePersona,
                                        apellido : inputsFormPerson.apellidoPersona
                                    }];
                                    setShowFormNewPerson(false)
                                }}
                            >
                                Agregar
                            </Button>
                            <Button
                                variant="ghost"
                                className="mx-2"
                                onClick={(evt)=>{
                                    evt.preventDefault();
                                    setShowFormNewPerson(false);
                                    setInputsFormPerson({
                                        nombrePersona : "",
                                        apellidoPersona : ""
                                    })
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </section> :
                <Button
                    variant="ghost"
                    className="text-guinda hover:bg-white underline hover:text-guinda"
                    onClick={()=>setShowFormNewPerson(true)}
                >
                    Agregar Persona <AddIcon/>
                </Button>
            }
        </div>
        <div className='flex flex-row items-center my-4'>
            <Button
                className='flex-1 cursor-pointer mr-2 bg-guinda rounded-lg py-4  text-white text-center hover:bg-guindaOpaco  hover:font-bold border-2 border-guinda hover:border-guinda'
                disabled={!hasChanges || loadingData}
                onClick={saveDataToSend}
            >
                {loadingData ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> :<> <SaveIcon/><span className='ml-2'>Guardar cambios</span></>}
            </Button>
            <Button
                variant="ghost"
                onClick={()=>{
                    setOpenDialog(false);
                    resetDataDialog();
                    setDataToSend(initialData);
                }}
            >
                Cancelar
            </Button>
        </div>
    </section>
    )
}

function FilterComponentStatus({
    dataEstados=[],
    nombreEstado,
    handleCheckedChange
}) {
    return (
        <DropdownMenu>
                <DropdownMenuTrigger >
                    <Button variant="ghost" >
                        <span>Estados</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="bottom">
                    {
                        dataEstados.map((item, key)=>
                        <DropdownMenuCheckboxItem 
                        key={key} 
                        className="capitalize" 
                        checked={item==nombreEstado}
                        onCheckedChange={()=>handleCheckedChange(item)}
                        >{item}</DropdownMenuCheckboxItem>)
                    }
                </DropdownMenuContent>
            </DropdownMenu>
    )
}

export default function TableLibros({dataLibros=[], dataStatus=[], dataLocations=[]}) {    
    const titlesData=[
        {name:"Titulo",className:"w-[800px] px-2"},
        {name:"Autor",className:"w-[500px]"},
        {name:"Estado",className:"w-[400px]"},
        {name:<p><LocationOnIcon/>Ubicacion</p>,className:"w-[400px]"},
        {name:"Prestado a",className:"w-[400px]"},
    ]
    const keysData=[
        "title",
        "authors",
        "status",
        "location",
        "borrow_to",
    ]


    const newDataLibros = dataLibros?.map((item)=>({...item, Seleccionado : false}));
    const [librosData, setLibrosData] = useState(newDataLibros);

    const LIBROS_POR_PAGINA=10;
    const [currentPage, setCurrentPage]=useState(1);
    const [stateData, setstateData] = useState("");
    const [query, setQuery] = useState("");        

    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    } ;

    const estadosSinRepetir=obtenerEstadosUnicos(librosData);
    // TODO : terminar de hacer las filtraciones por Ubicacion y Prestado a
    const prestadosNombreSinRepetir = obtenerPrestadosUnicos(librosData);
    const ubicaionSinRepetir=obtenerUbicacionUnica(librosData);


    const filterData =useMemo(()=>{
        return  librosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    },[librosData, query]);
    
    
    const filterChekButton=useMemo(()=>{
        return filterData.filter(item=>item?.status?.value?.toUpperCase().includes(stateData.toUpperCase()));
    },[filterData, stateData])
    
    // Paginado
    const indexOfLasBook = currentPage * LIBROS_POR_PAGINA;
    const indexOfFirstBook = indexOfLasBook - LIBROS_POR_PAGINA;
    const currentData = useMemo(() => {
        return filterChekButton.slice(indexOfFirstBook, indexOfLasBook);
    }, [filterChekButton, indexOfFirstBook, indexOfLasBook]);
    
    const handleChangeRow=(idx, field, value)=>{
        const updateData = [...librosData];
        const newData = updateData.map((item)=>{
            if(item?.id === idx){
                return {...item, [field] : value}                  
            }
            return {...item}
        });
        setLibrosData(newData)
    };

    const resetDataRow=()=>{
        setLibrosData(newDataLibros);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const numBooks = librosData.length;
    const handleCheckedDropdown=(item)=>{
        setQuery("");
        if(item==stateData){
            setstateData("")
            return;
        }
        setstateData(item)
    }
    const handleChangeChecked=(_)=>{
        const newListBooks = librosData?.map(libro=>({...libro, Seleccionado : !libro.Seleccionado}));
        setLibrosData(newListBooks);
    }
    const handleChangeCheckedRow=(key)=>{
        const newListBooks = librosData?.map((libro, idx)=>{
            if (key==idx && libro.Seleccionado) {
                return {
                    ...libro,
                    Seleccionado : false
                }
            }
            if (key == idx || libro.Seleccionado) {
                return {
                    ...libro,
                    Seleccionado : true
                }
            }
            return {
                ...libro,
                Seleccionado : false
            }
        });
        setLibrosData(newListBooks);
    }
    const filterComponents=[
        <FilterComponentStatus dataEstados={estadosSinRepetir} nombreEstado={stateData} handleCheckedChange={handleCheckedDropdown}/>,
    ]
    return (
    <TableLayout
        currentData={currentData}
        currentPage={currentPage}
        titlesData={titlesData}
        keysData={keysData}
        numData={numBooks}
        filtersComponents={filterComponents}
        handleChangeInput={onChangeInput}
        handleChangeChecked={handleChangeChecked}
        handleCheckedRow={handleChangeCheckedRow}
        handlePaginate={paginate}
        hrefCreateButton='/dashboard/libros/create'
    />
  )
}

/**
 *             {
                librosData.filter(libro=>libro.Seleccionado).length > 0 && <Button className="border-2 mx-2 border-guinda bg-white hover:bg-red-50 text-guinda">
                    <p className='flex flex-row items-center'><DeleteIcon/> <span>Eliminar libro</span></p>                </Button>
            }
 */