"use client"
import React,{useMemo, useState} from 'react'

import LocationOnIcon from '@mui/icons-material/LocationOn';

import TableLayout from './Layout/TableLayout'
import { DropdownFiltersComponent } from './ui'
import { extraerDataSinRepetir } from '../commons/tableFunctions'
import { DialogCreateLibros, DialogLibros } from '../Dialogs'
import { DELETE_BOOK, UPDATE_BOOKS } from '../commons/apiConnection';
import { useToast } from '../ui/use-toast';

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

    const estadosSinRepetir=extraerDataSinRepetir(librosData,"status");
    // TODO : terminar de hacer las filtraciones por Ubicacion y Prestado a
    const ubicaionSinRepetir=extraerDataSinRepetir(librosData, "location");


    const filterData =useMemo(()=>{
        return  librosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    },[librosData, query]);
    
    const filterButtonLocation=useMemo(()=>{
        return filterData.filter(item=>item?.location[0].value.toUpperCase().includes(locationData.toUpperCase()))
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
    const handleChckedDropdownStatus=(item)=>{
        setQuery("");
        if(item==stateData){
            setstateData("")
            return;
        }
        setstateData(item)
    }
    const handleCheckedDropdownLocation=(item)=>{
        setQuery("");
        if (item==locationData) {
            setLocationData("")
            return;
        }
        setLocationData(item)
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
    const handleAddNewDataToTable=async(dataDialogComponent)=>{
        const idDialog = dataDialogComponent?.id;
        const newDataJSONToSend = {
            id :dataDialogComponent?.id,
            title : dataDialogComponent?.title,
            authors_added : dataDialogComponent?.authors_added,
            authors_deleted : dataDialogComponent?.authors_deleted,
            location : dataDialogComponent?.location[0]?.id,
            status : dataDialogComponent?.status?.id,
            borrowed_to : null,
            amount : null
        }
        console.log(newDataJSONToSend);
        
        const newDataTable = librosData.map(item=>{
            if (item.id == idDialog) {
                return dataDialogComponent
            }
            return {
                ...item
            }
        });

        setLibrosData(newDataTable);

        try {
            
            const response = await UPDATE_BOOKS(newDataJSONToSend);
            if (response.ok) {
                toast({
                    title : "Exito",
                    description : "Libro actualizado con exito!"
                });
                console.log(await response.json());
                
                return
            }            
        } catch (error) {
            console.log(error);
            
        }        
    }
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
        console.log(newDataLibros);
        
    }
    const handleClickSaveRegister=(data)=>{
        setLibrosData([
            data,
            ...librosData,
        ])
    }
    const filterComponents=[
        <DropdownFiltersComponent data={estadosSinRepetir} titleData={stateData} titleButton='Estados' handleCheckedChange={handleChckedDropdownStatus}/>,
        <DropdownFiltersComponent data={ubicaionSinRepetir} titleData={locationData} titleButton='Ubicación' handleCheckedChange={handleCheckedDropdownLocation} />,
    ]
    return (
    <TableLayout
        currentData={currentData}
        currentPage={currentPage}
        titlesData={titlesData}
        keysData={keysData}
        numData={numBooks}
        dataStatusDialog={dataStatus}
        dataLocationDialog={dataLocations}
        setDataTable={handleAddNewDataToTable}
        filtersComponents={filterComponents}
        handleChangeInput={onChangeInput}
        handleChangeChecked={handleChangeChecked}
        handleCheckedRow={handleChangeCheckedRow}
        handlePaginate={paginate}
        hrefCreateButton='/dashboard/libros/create'
        deleteElementFunction={handleDeleteBook}
        dialogTitleEdit='Editar Libro'
        DialogEditComponent={DialogLibros}
        DialogCreateComponent={DialogCreateLibros}  
        handleClickSaveRegister={handleClickSaveRegister}
    />
  )
}

/**
 *             {
                librosData.filter(libro=>libro.Seleccionado).length > 0 && <Button className="border-2 mx-2 border-guinda bg-white hover:bg-red-50 text-guinda">
                    <p className='flex flex-row items-center'><DeleteIcon/> <span>Eliminar libro</span></p>                </Button>
            }
 */