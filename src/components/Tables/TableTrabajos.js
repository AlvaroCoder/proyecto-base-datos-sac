"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { DialogCreateTrabajo, DialogTrabajos } from '../Dialogs';
import DialogDeleteTrabajos from '../Dialogs/Deletes/DialogDeleteTrabajos';
import { DELETE_TRABAJOS, UPDATE_TRABAJOS } from '../commons/apiConnection';
import { useToast } from '../ui/use-toast';

export default function TableTrabajos({
    dataTrabajos=[],
    dataCourses=[],
    dataSession=null
}) {
    // Id restringidos de acuerdo a los privilegios establecidos
    const restrictedIds = [5,6,7];
    const userID = dataSession?.role;

    const {toast} = useToast();
    const titlesData = [
        {name : "Titulo", className:"w-[400px]"},
        {name: "Curso", className:""},
        {name: "Año", className:""},
        {name: "Link", className:""},
    ]

    const keysData=[
        "title",
        "course",
        "year",
        "link"
    ]

    const newDataTrabajos = dataTrabajos.map((item)=>({...item, Seleccionado : false}));    
    const [trabajosData, setTrabajosData] = useState(newDataTrabajos);

    
    const [currentPage, setCurrentPage]=useState(1);
    const [courseData, setCourseData] = useState("");
    const [query, setQuery] = useState("");     

    const TRABAJOS_POR_PAGINA=10;
    const indexLast = currentPage * TRABAJOS_POR_PAGINA;
    const indexFirst = indexLast - TRABAJOS_POR_PAGINA;

    const filterData = useMemo(()=>{
        return trabajosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    },[trabajosData, query]);
    
    const filterDataButtonCourse = useMemo(()=>{
        return filterData.filter(item=>item?.course?.value.toUpperCase().includes(courseData.toUpperCase()))
    },[filterData, courseData])
    
    const currentData = useMemo(()=>{
        return filterDataButtonCourse.slice(indexFirst, indexLast)
    },[filterDataButtonCourse, indexFirst, indexLast]);

    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    } ;

    const handleChangeRow=(key)=>{
        const newListTrabajos=trabajosData.map((trabajo, idx)=>{
            if (key == idx && trabajo.Seleccionado) {
                return {
                    ...trabajo,
                    Seleccionado : false
                }
            }
            if (key == idx || trabajo.Seleccionado) {
                return {
                    ...trabajo,
                    Seleccionado : true
                }
            }
            return {
                ...trabajo,
                Seleccionado : false
            }
        })
        setTrabajosData(newListTrabajos);
    }

    const handleChangeChecked=(_)=>{
        const newListTrabajos = trabajosData?.map(trabajo=>({...trabajo, Seleccionado : !trabajo.Seleccionado}))
        setTrabajosData(newListTrabajos)
    }
    const handleClickSaveRegister=(data)=>{
        setTrabajosData([
            data,
            ...trabajosData
        ])
    }
    const handleCheckedDropdownCourse=(item)=>{
        setQuery("");
        if (item===courseData) {
            setCourseData("");
            return;
        }
        setCourseData(item)
    }

    // Funcion de eliminar un trabajo de la lista de trabajos
    const handleClickDeleteTrabajo=async(idTrabajo)=>{        
        const response = await DELETE_TRABAJOS(idTrabajo);
        if (!response.ok) {
            toast({
                variant :"destructive",
                title : "Error",
                description :"Algo salio mal!"
            });
            return;
        }
        toast({
            title :"Exito",
            description :"Se elimino correctamente el trabajo!"
        });
        const newDataTrabajos = dataTrabajos.filter(item=>item?.id == idTrabajo);
        setTrabajosData(newDataTrabajos);

    }
    const handleClickUpdateTrabajos=(data)=>{
        const newDataTrabajos = [...dataTrabajos].map(item=>item.id === data.id ? data : item);
        setTrabajosData(newDataTrabajos);
    }
    const paginate = (pageNumber)=>setCurrentPage(pageNumber);
    const numBooks = trabajosData.length;

    const listFilterComponents = [
        <DropdownFiltersComponent data={dataCourses} titleButton='Curso' titleData={courseData} handleCheckedChange={handleCheckedDropdownCourse} />
    ]
    
  return (
    <>
        <TableLayout
            dataCourse={dataCourses}
            titlesData={titlesData}
            currentData={currentData}
            keysData={keysData}
            numData={numBooks}
            currentPage={currentPage}
            filtersComponents={listFilterComponents}
            handleChangeChecked={handleChangeChecked}
            handleCheckedRow={handleChangeRow}
            handleChangeInput={onChangeInput}
            handlePaginate={paginate}
            hrefCreateButton='/dashboard/trabajos/create'
            DialogEditComponent={DialogTrabajos}
            DialogDeleteComponent={DialogDeleteTrabajos}
            DialogCreateComponent={DialogCreateTrabajo}
            handleClickSaveUpdate={handleClickUpdateTrabajos}
            deleteElementFunction={handleClickDeleteTrabajo}
            handleClickSaveRegister={handleClickSaveRegister}
            isAdmin={!restrictedIds.includes(userID)}
        />
    </>
  )
}
