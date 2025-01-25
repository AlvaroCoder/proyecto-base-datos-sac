"use client"
import React, { useState } from 'react'
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Button } from '@/components/ui/button'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { cn } from '@/lib/utils';

export default function DropdownUi({
  DialogEditComponent=React.Component,
  DialogDeleteComponente=React.Component,
}) {
  const [openDropddown, setOpenDropddown] = useState(false);
  return (
    <>
      <DropdownMenuPrimitive.Root open={openDropddown} onOpenChange={setOpenDropddown} >
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
                "flex flex-col"
            )}
          >
            <DropdownMenuPrimitive.Item
              className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                )}     
              asChild         
            >
              {DialogEditComponent}
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              )}           
              asChild   
            >
              {DialogDeleteComponente}
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </>
  )
}