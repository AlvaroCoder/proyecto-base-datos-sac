"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';

export default function TableTrabajos({dataTrabajos=[]}) {
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
    const [query, setQuery] = useState("");     

    const TRABAJOS_POR_PAGINA=10;
    const indexLast = currentPage * TRABAJOS_POR_PAGINA;
    const indexFirst = indexLast - TRABAJOS_POR_PAGINA;

    const filterData = useMemo(()=>{
        return trabajosData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    },[trabajosData, query]);


    const currentData = useMemo(()=>{
        return filterData.slice(indexFirst, indexLast)
    },[filterData, indexFirst, indexLast]);

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
    const paginate = (pageNumber)=>setCurrentPage(pageNumber);
    const numBooks = trabajosData.length;

  return (
    <>
        <TableLayout
            titlesData={titlesData}
            currentData={currentData}
            keysData={keysData}
            numData={numBooks}
            currentPage={currentPage}
            handleChangeChecked={handleChangeChecked}
            handleCheckedRow={handleChangeRow}
            handleChangeInput={onChangeInput}
            handlePaginate={paginate}
            hrefCreateButton='/dashboard/trabajos/create'
        />
    </>
  )
}
