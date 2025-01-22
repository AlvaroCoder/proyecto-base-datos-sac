"use client"
import React, { useMemo, useState } from 'react'
import TableLayout from './Layout/TableLayout';
import { extraerDataSinRepetir } from '../commons/tableFunctions';
import { DropdownFiltersComponent } from './ui';
import { DialogCreatePapers, DialogDeletePapers, DialogPapers } from '../Dialogs';
import { DELETE_PAPER } from '../commons/apiConnection';

export default function TablePapers({
    dataPapers=[],
    dataMiembros=[]
}) {
    const titlesData=[
        {name : "Titulo", className: "w-[300px]"},
        {name : "Miembros", className: "w-[500px] px-2"},
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
    const [yearData, setYearData] = useState("");

    const PAPERS_POR_PAGINA = 10
    const indexLast = currentPage * PAPERS_POR_PAGINA;
    const indexFirst = indexLast - PAPERS_POR_PAGINA;

    const yearSinRepetir = extraerDataSinRepetir(papersData,"year");


    const filterData=useMemo(()=>{
        return papersData.filter(item=>item?.title?.toUpperCase().includes(query.toUpperCase()))
    }, [papersData, query]);
    
    const filterDataYear=useMemo(()=>{
        return filterData.filter(item=>String(item?.year).toUpperCase().includes(String(yearData).toUpperCase()))
    },[filterData, yearData]);
    const currentData=useMemo(()=>{
        return filterDataYear.slice(indexFirst, indexLast)
    },[filterDataYear, indexFirst, indexLast]);

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
    const handleCheckedDropdownYear=(item)=>{
        setQuery("")
        if (item===yearData) {
            setYearData("");
            return;
        }
        setYearData(item);
    }
    const handlePaginate=(pageNumber)=>setCurrentPage(pageNumber);
    const numPapers = papersData.length;

    const listFilterComponents = [
    ]
    const handleClickSaveRegister=(data)=>{
        setPapersData([
            data,
            ...papersData
        ]);
    }
    // Funcion de eliminar paper
    const handleClickDeletePaper=async(idDeletePaper)=>{
        await DELETE_PAPER(idDeletePaper)
    }
    const handleSaveUpdate=(data)=>{
        const newDataPapers = dataPapers.map(item=>item.id === data.id ? data : item);
        setPapersData(newDataPapers)
    }
  return (
    <>
        <TableLayout
            titlesData={titlesData}
            currentData={currentData}
            keysData={keysData}
            numData={numPapers}
            dataMembers={dataMiembros}
            currentPage={currentPage}
            filtersComponents={listFilterComponents}
            deleteElementFunction={handleClickDeletePaper}
            handleCheckedRow={handleChangeRow}
            handleChangeChecked={handleChangeChecked}
            handleChangeInput={handleChangeInput}
            handlePaginate={handlePaginate}
            DialogCreateComponent={DialogCreatePapers}
            DialogDeleteComponent={DialogDeletePapers}
            DialogEditComponent={DialogPapers}
            handleClickSaveUpdate={handleSaveUpdate}
            handleClickSaveRegister={handleClickSaveRegister}
        />
    </>
  )
}
