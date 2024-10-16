
"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { extraerDataSinRepetir } from '../commons/tableFunctions';
import { DialogEquipos } from '../Dialogs';
import DialogCreateEquipos from '../Dialogs/DialogCreateEquipos';

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
    const [typeData, setTypeData] = useState("");
    const [currentPage, setCurrentPage]=useState(1);
    const [query, setQuery] = useState("");       

    const EQUIPOS_POR_PAGINA=10;
    const indexLast = currentPage * EQUIPOS_POR_PAGINA;
    const indexFirst = indexLast - EQUIPOS_POR_PAGINA;

    const ubicacionSinRepetir = extraerDataSinRepetir(equiposData, "location");
    const estadosSinRepetir = extraerDataSinRepetir(equiposData, "status");
    const tiposSinRepetir = extraerDataSinRepetir(equiposData,"type");
    const origenSinRepetir = extraerDataSinRepetir(equiposData, "origin");

    const filterData = useMemo(()=>{
        return equiposData.filter(item=>item?.equipment?.toUpperCase().includes(query.toUpperCase()))
    },[equiposData, query]);
    
    const filterDataStatus=useMemo(()=>{
        return filterData.filter(item=>item?.status?.value.toUpperCase().includes(statusData.toUpperCase()))
    },[filterData, statusData]);

    const filterDataLocation=useMemo(()=>{
        return filterDataStatus.filter(item=>item?.location?.value.toUpperCase().includes(locationData.toUpperCase()))  
    },[filterDataStatus, locationData])

    const filterDataType=useMemo(()=>{
        return filterDataLocation.filter(item=>item?.type.toUpperCase().includes(typeData.toUpperCase()))
    },[filterDataLocation, typeData])

    const currentData = useMemo(()=>{
        return filterDataType.slice(indexFirst, indexLast)
    },[filterDataType, indexFirst, indexLast]);

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
    const handleCheckedDropwdownStatus=(item)=>{
        setQuery("");
        if (item===statusData) {
            setStatusData("");
            return;
        }
        setStatusData(item)
    }
    const handleCheckedDropdownLocation=(item)=>{
        setQuery("");
        if (item===locationData) {
            setLocationData("");
            return;
        }
        setLocationData(item)
    }
    const handleCheckedDropdownType=(item)=>{
        setQuery("");
        if (item===typeData) {
            setTypeData("");
            return
        }
        setTypeData(item)
    }
    const paginate=(pageNumber) => setCurrentPage(pageNumber);
    const numEquipos = equiposData.length;

    const listFiltersEquipos=[
        <DropdownFiltersComponent data={ubicacionSinRepetir} titleData={locationData} titleButton='Ubicacion' handleCheckedChange={handleCheckedDropdownLocation}/>,
        <DropdownFiltersComponent data={estadosSinRepetir} titleButton='Estado' titleData={statusData} handleCheckedChange={handleCheckedDropwdownStatus} />,
    ]
  return (
    <TableLayout
        titlesData={titlesData}
        currentData={currentData}
        keysData={keysData}
        numData={numEquipos}
        currentPage={currentPage}
        dataLocationDialog={ubicacionSinRepetir}
        dataStatusDialog={estadosSinRepetir}
        dataTypeDialog={tiposSinRepetir}
        dataOriginDialog={origenSinRepetir}
        filtersComponents={listFiltersEquipos}
        handleCheckedRow={handleChangeRow}
        handleChangeChecked={handleChangeChecked}
        handleChangeInput={onChangeInput}
        handlePaginate={paginate}
        hrefCreateButton='/dashboard/equipos/create'
        DialogEditComponent={DialogEquipos}
        DialogCreateComponent={DialogCreateEquipos}
    />
  )
}
