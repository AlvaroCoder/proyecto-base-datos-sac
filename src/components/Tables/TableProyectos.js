'use client'
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { extraerDataSinRepetir } from '../commons/tableFunctions';
import { DialogCreateProyectos, DialogProyectos } from '../Dialogs';
import DialogDeleteProyectos from '../Dialogs/Deletes/DialogDeleteProyectos';
import { UPDATE_PROYECTS } from '../commons/apiConnection';

export default function TableProyectos({dataProyectos = []}) {
  const newDataProyectos = dataProyectos?.map((item)=>{
    const arrAgreements = item?.agreement?.split(";")
    return {
      ...item,
      agreement : arrAgreements,
      fullNameCoordinator : item?.coordinator?.first_name + " "+ item?.coordinator?.last_name,
      Seleccionado : false
    }
  });  
  
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
    return filterDataButtonStatus.filter(item=>item?.fullNameCoordinator.toUpperCase().includes(coordinatorData.toUpperCase()) )
  },[filterDataButtonStatus, coordinatorData]);

  const currentData = useMemo(()=>{
    return filterDataButtonCoordinator.slice(indexFirst, indexLast);
  },[filterDataButtonCoordinator, indexFirst, indexLast]);

  
  const handlePaginate=(pageNumber)=>setCurrentPage(pageNumber);
  const numProyectos = proyectosData.length;

  const titlesData=[
    {name:"Proyecto", className:"w-[300px] mr-8"},
    {name:"Coordinador", className:"px-4"},
    {name:"Convenios", className:"w-[50px] "},
    {name:"Investigadores", className:""},
    {name:"Estado", className:""},
    {name:"Inicio", className:""},
    {name:"Fin", className:""},
    
  ]
  const keysData=[
    "project",
    "fullNameCoordinator",
    "agreement",
    "researchers",
    "status",
    "year_start",
    "year_end",
  ]
  
  const estadosSinRepetir = extraerDataSinRepetir(proyectosData, "status");
  const coordinadorSinRepetir = extraerDataSinRepetir(proyectosData, "fullNameCoordinator");
    
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
  // Funcion de guardar los cambios de la edicion de proyectos
  const handleSaveDataEditProjects =async(dataDialogComponent)=>{
    
    const newDataJSONToSend={
      id : dataDialogComponent?.id,
      name : dataDialogComponent?.project,
      coordinator : dataDialogComponent?.coordinator,
      researchers_added : dataDialogComponent?.authors_added,
      researchers_deleted : dataDialogComponent?.authors_deleted,
      agreements_added : [],
      agreements_deleted : [],
      status : dataDialogComponent?.status === "En Proceso" ? 1 : 2,
      period : {
        year_start : `${dataDialogComponent?.year_start}-01-01`,
        year_end : `${dataDialogComponent?.year_end}-01-01`
      }
    }     
    await UPDATE_PROYECTS(newDataJSONToSend);
    const jsonNewDataProject = {
      id : dataDialogComponent?.id,
      project : dataDialogComponent?.project,
      coordinator : dataDialogComponent?.coordinator,
      fullNameCoordinator : dataDialogComponent?.fullNameCoordinator,
      researchers : dataDialogComponent?.researchers,
      status : dataDialogComponent?.status,
      year_end : dataDialogComponent?.year_end,
      year_start : dataDialogComponent?.year_start,
      agreement : dataDialogComponent?.agreement,
      Seleccionado : false
    }
    const newDataProjects = proyectosData.map(item=>{
      if (item?.id === dataDialogComponent?.id) {
        return jsonNewDataProject
      }
      return item
    })
    setProyectosData(newDataProjects)
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
      setDataTable={handleSaveDataEditProjects}
      handleChangeChecked={handleChangeChecked}
      handleCheckedRow={handleChangeRow}
      handleChangeInput={handleChangeInput}
      handlePaginate={handlePaginate}
      DialogEditComponent={DialogProyectos}
      DialogDeleteComponent={DialogDeleteProyectos}
      DialogCreateComponent={DialogCreateProyectos}
      dialogTitleEdit='Editar Proyecto'
    />
  )
}
