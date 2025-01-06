"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { extraerDataSinRepetir } from '../commons/tableFunctions';
import { DialogCreateTrabajo, DialogTrabajos } from '../Dialogs';
import DialogDeleteTrabajos from '../Dialogs/Deletes/DialogDeleteTrabajos';
import { DELETE_TRABAJOS, UPDATE_TRABAJOS } from '../commons/apiConnection';

export default function TableTrabajos({
    dataTrabajos=[],
    dataCourses=[],
}) {
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
    const [stateData, setstateData] = useState("");
    const [courseData, setCourseData] = useState("");
    const [query, setQuery] = useState("");     

    const TRABAJOS_POR_PAGINA=10;
    const indexLast = currentPage * TRABAJOS_POR_PAGINA;
    const indexFirst = indexLast - TRABAJOS_POR_PAGINA;

    const cursoSinRepetir = extraerDataSinRepetir(trabajosData,"course");    
    const filterData = useMemo(()=>{
        return trabajosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    },[trabajosData, query]);
    
    const filterDataButtonCourse = useMemo(()=>{
        return filterData.filter(item=>item?.course?.toUpperCase().includes(courseData.toUpperCase()))
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
    const handleSaveDataEditTable=async(dataDialogComponent)=>{
        const newDataObj={
            id : dataDialogComponent?.id,
            title : dataDialogComponent?.title,
            course : 1,
            year : dataDialogComponent?.year,
            link : dataDialogComponent?.link
        }
        const response =  await UPDATE_TRABAJOS(newDataObj);
        
    }
    // Funcion de eliminar un trabajo de la lista de trabajos
    const handleClickDeleteTrabajo=async(idTrabajo)=>{
        console.log(idTrabajo);
        
        // const response = await DELETE_TRABAJOS(idTrabajo);


    }
    const paginate = (pageNumber)=>setCurrentPage(pageNumber);
    const numBooks = trabajosData.length;

    const listFilterComponents = [
        <DropdownFiltersComponent data={cursoSinRepetir} titleButton='Curso' titleData={courseData} handleCheckedChange={handleCheckedDropdownCourse} />
    ]
  return (
    <>
        <TableLayout
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
            dataCourse={dataCourses}
            dataStatusDialog={cursoSinRepetir}
            deleteElementFunction={handleClickDeleteTrabajo}
            handleClickSaveRegister={handleClickSaveRegister}
            setDataTable={handleSaveDataEditTable}
        />
    </>
  )
}
