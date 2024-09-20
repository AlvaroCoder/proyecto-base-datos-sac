
"use client"
import React, { useMemo, useState } from 'react'
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Button } from '../ui/button';
import TableLayout from './Layout/TableLayout';

export default function TableEquipos({dataEquipos=[], dataStatus=[], dataLocation=[]}) {
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
    const [currentPage, setCurrentPage]=useState(1);
    const [query, setQuery] = useState("");       

    const EQUIPOS_POR_PAGINA=10;
    const indexLast = currentPage * EQUIPOS_POR_PAGINA;
    const indexFirst = indexLast - EQUIPOS_POR_PAGINA;

    const filterData = useMemo(()=>{
        return equiposData.filter(item=>item?.equipment?.toUpperCase().includes(query.toUpperCase()))
    },[equiposData, query]);

    const currentData = useMemo(()=>{
        return filterData.slice(indexFirst, indexLast)
    },[filterData, indexFirst, indexLast]);


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
        handleCheckedRow={handleChangeRow}
        handleChangeChecked={handleChangeChecked}
        handleChangeInput={onChangeInput}
        handlePaginate={paginate}
    />
  )
}
