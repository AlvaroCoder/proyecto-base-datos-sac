"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import TableLayout from './Layout/TableLayout';

export default function TablePapers({dataPapers=[]}) {
    const newDataPapers = dataPapers?.map((item)=>({...item, Seleccionado : false}));
    const [papersData, setPapersData] = useState(newDataPapers);
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
  return (
    <>
        <TableLayout
            titlesData={titlesData}
            currentData={papersData}
            keysData={keysData}
            handleCheckedRow={handleChangeRow}
            handleChangeChecked={handleChangeChecked}
        />
    </>
  )
}
