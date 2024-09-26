
"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { extraerDataSinRepetir } from '../commons/tableFunctions';

export default function TableEquipos({dataEquipos=[]}) {
    const titlesData=[
        {name:"Equipo", className:"w-[400px]"},
        {name:"Comentarios", className:""},
        {name:"Tipo", className:""},
        {name:"Origen", className:""},
        {name:"Año de Adquisición", className:""},
        {name:"Ubicacion", className:""},
        {name:"Estado",className:""}
    ]

    const keysData=[
        "equipment",
        "description",
        "type",
        "origin",
        "year",
        "location",
        "status"
    ]

    const newDataEquipos = dataEquipos?.map((item)=>({...item, Seleccionado : false}));
    
    const [equiposData, setEquiposData] = useState(newDataEquipos);
    const [locationData, setLocationData] = useState("");
    const [statusData, setStatusData] = useState("");
    const [currentPage, setCurrentPage]=useState(1);
    const [query, setQuery] = useState("");       

    const EQUIPOS_POR_PAGINA=10;
    const indexLast = currentPage * EQUIPOS_POR_PAGINA;
    const indexFirst = indexLast - EQUIPOS_POR_PAGINA;

    const ubicacionSinRepetir = extraerDataSinRepetir(equiposData, "location");
    const estadosSinRepetir = extraerDataSinRepetir(equiposData, "status")
    const filterData = useMemo(()=>{
        return equiposData.filter(item=>item?.equipment?.toUpperCase().includes(query.toUpperCase()))
    },[equiposData, query]);

    const currentData = useMemo(()=>{
        return filterData.slice(indexFirst, indexLast)
    },[filterData, indexFirst, indexLast]);

    const listFiltersEquipos=[
        <DropdownFiltersComponent data={ubicacionSinRepetir} titleData={locationData} titleButton='Ubicacion'/>,
        <DropdownFiltersComponent data={estadosSinRepetir} titleButton='Estado' titleData={statusData} />
    ]

    const onChangeInput=(e)=>{
        setQuery(e.target.value);
    }
    const handleChangeRow=(key)=>{
        const newListEquipos = equiposData.map((equipo, idx)=>{
            if (key==idx && equipo.Seleccionado) {
                return {
                    ...equipo,
                    Seleccionado : false
                }
            }
            if (key == idx || equipo.Seleccionado) {
                return {
                    ...equipo,
                    Seleccionado : true
                }
            }
            return {
                ...equipo,
                Seleccionado : false
            }
        });
        setEquiposData(newListEquipos)
    }
    const handleChangeChecked=(_)=>{
        const newListEquipments= equiposData?.map(equipo=>({...equipo, Seleccionado : !equipo.Seleccionado}))
        setEquiposData(newListEquipments)
    }
    
    const paginate=(pageNumber) => setCurrentPage(pageNumber);
    const numEquipos = equiposData.length;
  return (
    <TableLayout
        titlesData={titlesData}
        currentData={currentData}
        keysData={keysData}
        numData={numEquipos}
        currentPage={currentPage}
        filtersComponents={listFiltersEquipos}
        handleCheckedRow={handleChangeRow}
        handleChangeChecked={handleChangeChecked}
        handleChangeInput={onChangeInput}
        handlePaginate={paginate}
        hrefCreateButton='/dashboard/equipos/create'
    />
  )
}
