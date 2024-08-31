"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

export default function dropdownLocation({data, onChangeData, isLoading=false}) {
    const [dataSelected, setDataSelected] = useState({
        "id": 1,
        "value": "Oficina Ing Ipanaque"
    });
    
  return (
    <DropdownMenu>
        <DropdownMenuTrigger
            asChild
        >
            <Button
                variant="ghost"
            >
                <>
                    {
                        isLoading ?  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                        <span>{dataSelected.value}</span>
                    }
                </>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                !isLoading && data?.map(location=>
                    <DropdownMenuCheckboxItem
                        key={location.id}
                        className="capitalize"
                        onCheckedChange={
                            ()=>{
                                const jsonSelected = data?.filter(elem=>elem.id === location.id)[0];
                                setDataSelected(jsonSelected);
                                onChangeData(jsonSelected.id);
                            }
                        }
                        checked={location.id == dataSelected.id}
                    >
                        <span>
                            {location.value}
                        </span>
                    </DropdownMenuCheckboxItem>
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
