'use client'
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';

export default function TableProyectos({dataProyectos = []}) {
  const newDataProyectos = dataProyectos?.map((item)=>({...item, Seleccionado : false}));  
  const [proyectosData, setProyectosData] = useState(newDataProyectos);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const PROYECTOS_POR_PAGINA = 10;
  const indexLast = currentPage * PROYECTOS_POR_PAGINA;
  const indexFirst = indexLast - PROYECTOS_POR_PAGINA;

  const filterData = useMemo(()=>{
    return proyectosData.filter(item=>item?.project?.toUpperCase().includes(query.toUpperCase()))
  },[proyectosData, query]);

  const currentData = useMemo(()=>{
    return filterData.slice(indexFirst, indexLast);
  },[filterData, indexFirst, indexLast]);

  const handlePaginate=(pageNumber)=>setCurrentPage(pageNumber);
  const numProyectos = proyectosData.length;

  const titlesData=[
    {name:"Proyecto", className:"w-[300px]"},
    {name:"Coordinador", className:""},
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
  return (
    <TableLayout
      titlesData={titlesData}
      currentData={currentData} 
      keysData={keysData}
      numData={numProyectos}
      currentPage={currentPage}
      handleChangeChecked={handleChangeChecked}
      handleCheckedRow={handleChangeRow}
      handleChangeInput={handleChangeInput}
      handlePaginate={handlePaginate}
      hrefCreateButton='/dashboard/proyectos/create'
    />
  )
}
