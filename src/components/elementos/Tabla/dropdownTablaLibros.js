"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import React,{useState} from 'react'


export default function dropdownTablaLibros({dataDialog,onOpenChangeDialogEdit, onOpenChangeDialogDelete}) {
    const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <DropdownMenuPrimitive.Root open={openDropdown} onOpenChange={setOpenDropdown} >
        <DropdownMenuPrimitive.Trigger asChild>
         <Button
                variant="ghost"
            >
                <MoreVertIcon/>
            </Button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                sideOffset={4}
                className={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",

                )}
            >
                <DropdownMenuPrimitive.Item
                    className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    )}
                >
                    <Button
                        variant="ghost"
                        onClick={()=>onOpenChangeDialogEdit()}
                    ><EditIcon className='mr-2'/> Editar</Button>
                </DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Item
                    className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    )}
                >
                    <Button
                        variant="ghost"
                    ><DeleteIcon className='mr-2' /> Eliminar</Button>
                </DropdownMenuPrimitive.Item>
            </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
;