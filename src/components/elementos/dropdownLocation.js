"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

export default function dropdownLocation({data, isLoading=false}) {
    const [dataSelected, setDataSelected] = useState(1);
    
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
                        <span>{data[0]?.value}</span>
                    }
                </>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                !isLoading && data?.map(location=>
                    <DropdownMenuCheckboxItem
                        checked={location.id == dataSelected}
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
