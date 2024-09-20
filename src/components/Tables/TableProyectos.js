'use client'
import React, { useState } from 'react'
import TableLayout from './Layout/TableLayout';

export default function TableProyectos({dataProyectos = []}) {
  const newDataProyectos = dataProyectos?.map((item)=>({...item, Seleccionado : false}));  
  const [proyectosData, setProyectosData] = useState(newDataProyectos);

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
  return (
    <TableLayout
      titlesData={titlesData}
      currentData={proyectosData} 
      keysData={keysData}
      handleChangeChecked={handleChangeChecked}
      handleCheckedRow={handleChangeRow}
    />
  )
}
