'use client'
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { extraerDataSinRepetir } from '../commons/tableFunctions';
import { DialogCreateProyectos, DialogProyectos } from '../Dialogs';
import DialogDeleteProyectos from '../Dialogs/Deletes/DialogDeleteProyectos';

export default function TableProyectos({dataProyectos = []}) {
  const newDataProyectos = dataProyectos?.map((item)=>({...item, Seleccionado : false}));  
  const [proyectosData, setProyectosData] = useState(newDataProyectos);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [statusData, setStatusData] = useState("");
  const [coordinatorData, setCoordinatorData] = useState("");

  const PROYECTOS_POR_PAGINA = 10;
  const indexLast = currentPage * PROYECTOS_POR_PAGINA;
  const indexFirst = indexLast - PROYECTOS_POR_PAGINA;

  const filterData = useMemo(()=>{
    return proyectosData.filter(item=>item?.project?.toUpperCase().includes(query.toUpperCase()))
  },[proyectosData, query]);

  const filterDataButtonStatus=useMemo(()=>{
    return filterData.filter(item=>item?.status?.toUpperCase().includes(statusData.toUpperCase()))
  },[filterData, statusData]);

  const filterDataButtonCoordinator=useMemo(()=>{
    return filterDataButtonStatus.filter(item=>item?.coordinator?.toUpperCase().includes(coordinatorData.toUpperCase()))
  },[filterDataButtonStatus, coordinatorData]);

  const currentData = useMemo(()=>{
    return filterDataButtonCoordinator.slice(indexFirst, indexLast);
  },[filterDataButtonCoordinator, indexFirst, indexLast]);

  const handlePaginate=(pageNumber)=>setCurrentPage(pageNumber);
  const numProyectos = proyectosData.length;

  const titlesData=[
    {name:"Proyecto", className:"w-[300px] mr-8"},
    {name:"Coordinador", className:"px-4"},
    {name:"Investigadores", className:""},
    {name:"Estado", className:""},
    {name:"Inicio", className:""},
    {name:"Fin", className:""},
  ]
  const keysData=[
    "project",
    "coordinator",
    "researchers",
    "status",
    "year_start",
    "year_end"
  ]
  
  const estadosSinRepetir = extraerDataSinRepetir(proyectosData, "status");
  const coordinadorSinRepetir = extraerDataSinRepetir(proyectosData, "coordinator");
    
  const handleChangeChecked=(_)=>{
    const newListProyectos = proyectosData.map(proyecto=>({...proyecto, Seleccionado : !proyecto.Seleccionado}))
    setProyectosData(newListProyectos);
  }
  const handleChangeRow=(key)=>{
    const newListProyectos = proyectosData.map((proyecto, idx)=>{
      if (key == idx && proyecto.Seleccionado) {
        return {
          ...proyecto,
          Seleccionado : false
        }
      }
      if (key == idx || proyecto.Seleccionado) {
        return {
          ...proyecto,
          Seleccionado : true
        }
      }
      return {
        ...proyecto,
        Seleccionado : false
      }
    })
    setProyectosData(newListProyectos);
  }
  const handleChangeInput=(e)=>{
    setQuery(e.target.value);
  }
  const handleCheckedDropddownStatus=(item)=>{
    setQuery("");
    if (item===statusData) {
      setStatusData("");
      return
    }
    setStatusData(item);
  }
  const handleCheckedDropdownCoordinate=(item)=>{
    setQuery("");
    if (item===coordinatorData) {
      setCoordinatorData("");
      return;
    }
    setCoordinatorData(item);
  }
  const listFilterComponents=[
    <DropdownFiltersComponent data={estadosSinRepetir} titleButton='Estados' titleData={statusData} handleCheckedChange={handleCheckedDropddownStatus} />,
    <DropdownFiltersComponent data={coordinadorSinRepetir} titleButton='Coordinador' titleData={coordinatorData} handleCheckedChange={handleCheckedDropdownCoordinate} />
  ]
  return (
    <TableLayout
      titlesData={titlesData}
      currentData={currentData} 
      keysData={keysData}
      numData={numProyectos}
      currentPage={currentPage}
      dataCoordinator={coordinadorSinRepetir}
      dataStatusDialog={estadosSinRepetir}
      filtersComponents={listFilterComponents}
      handleChangeChecked={handleChangeChecked}
      handleCheckedRow={handleChangeRow}
      handleChangeInput={handleChangeInput}
      handlePaginate={handlePaginate}
      hrefCreateButton='/dashboard/proyectos/create'
      DialogEditComponent={DialogProyectos}
      DialogDeleteComponent={DialogDeleteProyectos}
      DialogCreateComponent={DialogCreateProyectos}
      dialogTitleEdit='Editar Proyecto'
    />
  )
}
