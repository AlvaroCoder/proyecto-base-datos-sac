
"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { DropdownFiltersComponent } from './ui';
import { extraerDataSinRepetir } from '../commons/tableFunctions';
import { DialogDeleteEquipos, DialogEquipos } from '../Dialogs';
import DialogCreateEquipos from '../Dialogs/Creates/DialogCreateEquipos';
import { DELETE_EQUIPO } from '../commons/apiConnection';
import { useToast } from '../ui/use-toast';

export default function TableEquipos({
    dataEquipos=[], 
    dataStatusEquipos=[],
    dataTypeEquipos=[],
    
    dataLocationEquipos=[]
}) {
    
    const{toast}=useToast();
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
        return filterDataLocation.filter(item=>item?.type?.value.toUpperCase().includes(typeData.toUpperCase()))
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
        setStatusData(item?.value)
    }
    const handleCheckedDropdownLocation=(item)=>{
        console.log(item);
        
        setQuery("");
        if (item===locationData) {
            setLocationData("");
            return;
        }
        setLocationData(item?.value)
    }
    const handleClickSaveRegister=(data)=>{
        setEquiposData([
            data,
            ...equiposData
        ])
    }
    const handleClickDeleteRegister=async(id)=>{
        const response = await DELETE_EQUIPO(id);
        if (!response.ok) {
            toast({
                variant: "destructive",
                title : "Error",
                description : "Ocurrio un error"
            })
            return;
        }
        const responseJSON = await response.json();
        console.log(responseJSON);
        toast({
            title : "Exito",
            description : "Se elimino correctamente el equipo"
        });
        const newDataEquipos = equiposData.filter(item=>item?.id!==id);
        setEquiposData(newDataEquipos);
    }
    const handleClickSaveUpdate=(data)=>{
        console.log(data);
        
        const newDataEquipos = [...dataEquipos].map(item=>item?.id === data.id);
        console.log(newDataEquipos);
        
        setEquiposData(newDataEquipos);
    }
    const paginate=(pageNumber) => setCurrentPage(pageNumber);
    const numEquipos = equiposData.length;

    const listFiltersEquipos=[
        <DropdownFiltersComponent data={dataLocationEquipos} titleData={locationData} titleButton='Ubicacion' handleCheckedChange={handleCheckedDropdownLocation}/>,
        <DropdownFiltersComponent data={dataStatusEquipos} titleButton='Estado' titleData={statusData} handleCheckedChange={handleCheckedDropwdownStatus} />,
    ]
  return (
    <TableLayout
        titlesData={titlesData}
        currentData={currentData}
        keysData={keysData}
        numData={numEquipos}
        currentPage={currentPage}
        dataLocationDialog={dataLocationEquipos}
        dataStatusDialog={dataStatusEquipos}
        dataTypeDialog={dataTypeEquipos}
        filtersComponents={listFiltersEquipos}
        deleteElementFunction={handleClickDeleteRegister}
        handleClickSaveRegister={handleClickSaveRegister}
        handleClickSaveUpdate={handleClickSaveUpdate}
        handleCheckedRow={handleChangeRow}
        handleChangeChecked={handleChangeChecked}
        handleChangeInput={onChangeInput}
        handlePaginate={paginate}
        hrefCreateButton='/dashboard/equipos/create'
        DialogEditComponent={DialogEquipos}
        DialogCreateComponent={DialogCreateEquipos}
        DialogDeleteComponent={DialogDeleteEquipos}
    />
  )
}
