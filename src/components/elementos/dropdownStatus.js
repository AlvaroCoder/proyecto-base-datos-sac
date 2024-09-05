"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

export default function dropdownStatus({data, onChangeData, isLoading}) {
    const [dataSelected, setDataSelected] = useState({
        "id": 1,
        "value": "Disponible"
    });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
            >
                <Button
                    className="border border-slate-100 shadow-sm w-40"
                    variant="ghost"
                >
                    <>
                        {
                            isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                            <span>{dataSelected.value}</span>
                        }
                    </>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    !isLoading && data?.map(stat=>
                        <DropdownMenuCheckboxItem
                            key={stat.id}
                            className="capitalize"
                            onCheckedChange={
                                ()=>{
                                    const jsonSelected = data?.filter(elem=>elem.id === stat?.id)[0];
                                    setDataSelected(jsonSelected)
                                    onChangeData(jsonSelected.id)
                                }
                            }
                            checked={stat.id === dataSelected.id}
                        >
                            <span>
                                {stat.value}
                            </span>
                        </DropdownMenuCheckboxItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
;
