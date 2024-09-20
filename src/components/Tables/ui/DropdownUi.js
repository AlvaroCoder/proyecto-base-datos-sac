import React, { useState } from 'react'
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Button } from '@/components/ui/button'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { cn } from '@/lib/utils';

export default function DropdownUi({
  handleClickEdit,
  handleClickDelete
}) {
  const [openDropdown, setOpenDropdown] = useState(false)
  return (
    <>
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
                  "relative flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                )}              
            >
              <Button
                variant="ghost"
                onClick={handleClickEdit}
              >
               <EditIcon className='mr-2'/> <span> Editar</span>
              </Button>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              )}              
            >
              <Button
                variant="ghost"
                onClick={handleClickDelete}
              >
                <DeleteIcon className='mr-2'/> <span>Eliminar</span>
              </Button>
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </>
  )
}