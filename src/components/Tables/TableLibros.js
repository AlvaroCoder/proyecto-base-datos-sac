"use client"
import React,{useMemo, useState} from 'react'

import LocationOnIcon from '@mui/icons-material/LocationOn';

import TableLayout from './Layout/TableLayout'
import { DropdownFiltersComponent } from './ui'
import { DialogCreateLibros, DialogDeleteLibros, DialogLibros } from '../Dialogs'
import { DELETE_BOOK } from '../commons/apiConnection';
import { useToast } from '../ui/use-toast';

export default function TableLibros({
    dataLibros=[], 
    dataStatus=[], 
    dataLocations=[],
    dataUsers=[],
    dataAutores=[]
}) {        
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
        "borrowed_to",
    ]
    const {toast} = useToast();
    const newDataLibros = dataLibros?.map((item)=>({...item, Seleccionado : false}));

    const [librosData, setLibrosData] = useState(newDataLibros);

    const LIBROS_POR_PAGINA=10;
    const [currentPage, setCurrentPage]=useState(1);
    const [stateData, setstateData] = useState("");
    const [locationData, setLocationData] = useState("");
    const [query, setQuery] = useState("");        

    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    } ;

    const filterData =useMemo(()=>{
        return  librosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    },[librosData, query]);
    
    const filterButtonLocation=useMemo(()=>{
        return filterData.filter(item=>item?.location.value.toUpperCase().includes(locationData.toUpperCase()))
    },[filterData, locationData])
    
    const filterButtonStatus=useMemo(()=>{
        return filterButtonLocation.filter(item=>item?.status?.value?.toUpperCase().includes(stateData.toUpperCase()));
    },[filterButtonLocation, stateData])
    

    // Paginado
    const indexOfLasBook = currentPage * LIBROS_POR_PAGINA;
    const indexOfFirstBook = indexOfLasBook - LIBROS_POR_PAGINA;
    const currentData = useMemo(() => {
        return filterButtonStatus.slice(indexOfFirstBook, indexOfLasBook);
    }, [filterButtonStatus, indexOfFirstBook, indexOfLasBook]);
    

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const numBooks = librosData.length;
    const handleChckedDropdownStatus=(item)=>{
        setQuery("");
        if(item==stateData){
            setstateData("")
            return;
        }
        setstateData(item?.value)
    }
    const handleCheckedDropdownLocation=(item)=>{
        setQuery("");
        if (item==locationData) {
            setLocationData("")
            return;
        }
        setLocationData(item?.value)
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
    // Funcion de actualizar la data de un libro en la tabla
    const handleAddNewDataToTable=(data)=>{
        const newDataJSON = {...data, borrowed_to : data?.borrowed_to.length <= 0 ? "No prestado" : data?.borrowed_to}
        const newDataLibros = [...dataLibros].map(item=>item?.id === data?.id ? newDataJSON : item);
        setLibrosData(newDataLibros);
    }
    // Funcion de eliminar libro en la tabla
    const handleDeleteBook=async(idBook)=>{
        const response = await DELETE_BOOK(idBook);
        if (!response.ok) {
            toast({
                variant: "destructive",
                title : "Error",
                description : "Algo salio mal!"
            });
            return
        }
        toast({
            title:"Exito",
            description : "Se elimino el libro correctamente!"
        })
        const newDataLibros = librosData.filter(item=>item?.id!==idBook);
        setLibrosData(newDataLibros)
    }
    // Funcion de guardar registro
    const handleClickSaveRegister=(data)=>{
        setLibrosData([
            data,
            ...librosData
        ])
    }
    const filterComponents=[
        <DropdownFiltersComponent data={dataStatus} titleData={stateData} titleButton='Estados' handleCheckedChange={handleChckedDropdownStatus}/>,
        <DropdownFiltersComponent data={dataLocations} titleData={locationData} titleButton='Ubicación' handleCheckedChange={handleCheckedDropdownLocation} />,
    ]
    return (
    <TableLayout
        currentData={currentData}
        currentPage={currentPage}
        titlesData={titlesData}
        keysData={keysData}
        numData={numBooks}
        dataAutores={dataAutores}
        dataStatusDialog={dataStatus}
        dataLocationDialog={dataLocations}
        dataMembers={dataUsers}
        handleClickSaveUpdate={handleAddNewDataToTable}
        filtersComponents={filterComponents}
        handleChangeInput={onChangeInput}
        handleChangeChecked={handleChangeChecked}
        handleCheckedRow={handleChangeCheckedRow}
        handlePaginate={paginate}
        deleteElementFunction={handleDeleteBook}
        dialogTitleEdit='Editar Libro'
        DialogDeleteComponent={DialogDeleteLibros}
        DialogEditComponent={DialogLibros}
        DialogCreateComponent={DialogCreateLibros}  
        handleClickSaveRegister={handleClickSaveRegister}
        
    />
  )
}
