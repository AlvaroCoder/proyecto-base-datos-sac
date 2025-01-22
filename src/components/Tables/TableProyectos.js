'use client'
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { DialogCreateProyectos, DialogProyectos } from '../Dialogs';
import DialogDeleteProyectos from '../Dialogs/Deletes/DialogDeleteProyectos';
import { DELETE_PROYECT, UPDATE_PROYECTS } from '../commons/apiConnection';

export default function TableProyectos({
  dataProyectos = [],
  dataMiembros = [],
  dataCargosUsuarios=[],
  dataStatus=[],
  dataAgreements=[]
}) {  
  const newDataProyectos = dataProyectos?.map((item)=>{
    return {
      ...item,
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
    return filterData.filter(item=>item?.status?.value.toUpperCase().includes(statusData.toUpperCase()))
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

  // Funcion de agregar proyectos a la tabla de proyectos
  const handleClickSaveRegister=(data)=>{
    setProyectosData([
      data,
      ...proyectosData
    ])
  } 
  // Funcion de eliminar un elemento de la lista de proyectos
  const handleClickDelete=async(idDeletedata)=>{
    await DELETE_PROYECT(idDeletedata);
    const newDatProjects = dataProyectos.filter(item=>item?.id !== idDeletedata);     
    setProyectosData(newDatProjects);
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
        
    const response = await UPDATE_PROYECTS(newDataJSONToSend);
    
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
    <DropdownFiltersComponent data={dataStatus} titleButton='Estados' titleData={statusData} handleCheckedChange={handleCheckedDropddownStatus} />,
  ]
  return (
    <TableLayout
      titlesData={titlesData}
      dataMembers={dataMiembros}
      currentData={currentData} 
      dataCategoriesUser={dataCargosUsuarios}
      dataListAgreements={dataAgreements}
      dataStatusDialog={dataStatus}
      keysData={keysData}
      numData={numProyectos}
      currentPage={currentPage}
      dataCoordinator={dataMiembros}
      filtersComponents={listFilterComponents}
      deleteElementFunction={handleClickDelete}
      setDataTable={handleSaveDataEditProjects}
      handleChangeChecked={handleChangeChecked}
      handleCheckedRow={handleChangeRow}
      handleChangeInput={handleChangeInput}
      handlePaginate={handlePaginate}
      handleClickSaveRegister={handleClickSaveRegister}
      DialogEditComponent={DialogProyectos}
      DialogDeleteComponent={DialogDeleteProyectos}
      DialogCreateComponent={DialogCreateProyectos}
      dialogTitleEdit='Editar Proyecto'
    />
  )
}
