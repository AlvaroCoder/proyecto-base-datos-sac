"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';

export default function TablePapers({dataPapers=[]}) {
    const titlesData=[
        {name : "Titulo", className: "w-[300px]"},
        {name : "Miembros", className: ""},
        {name : "Año", className: ""},
        {name : "Link", className : ""}
    ]

    const keysData=[
        "title",
        "members",
        "year",
        "link"
    ]


    const newDataPapers = dataPapers?.map((item)=>({...item, Seleccionado : false}));
    const [papersData, setPapersData] = useState(newDataPapers);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");

    const PAPERS_POR_PAGINA = 10
    const indexLast = currentPage * PAPERS_POR_PAGINA;
    const indexFirst = indexLast - PAPERS_POR_PAGINA;

    const filterData=useMemo(()=>{
        return papersData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    }, [papersData, query])

    const currentData=useMemo(()=>{
        return filterData.slice(indexFirst, indexLast)
    },[filterData, indexFirst, indexLast]);

    const handleChangeRow=(key)=>{
        const newListPapers = papersData.map((paper, idx)=>{
            if (key==idx && paper.Seleccionado) {
                return {
                    ...paper,
                    Seleccionado : false
                }
            }
            if (key == idx || paper.Seleccionado) {
                return {
                    ...paper,
                    Seleccionado : true
                }
            }
            return {
                ...paper,
                Seleccionado : false
            }
        });
        setPapersData(newListPapers);
    }

    const handleChangeChecked=(_)=>{
        const newListPaper = papersData?.map(paper=>({...paper, Seleccionado : !paper.Seleccionado}));
        setPapersData(newListPaper);
    }
    const handleChangeInput=(e)=>{
        setQuery(e.target.value);
    }

    const handlePaginate=(pageNumber)=>setCurrentPage(pageNumber);
    const numPapers = papersData.length;
  return (
    <>
        <TableLayout
            titlesData={titlesData}
            currentData={currentData}
            keysData={keysData}
            numData={numPapers}
            currentPage={currentPage}
            handleCheckedRow={handleChangeRow}
            handleChangeChecked={handleChangeChecked}
            handleChangeInput={handleChangeInput}
            handlePaginate={handlePaginate}
        />
    </>
  )
}
