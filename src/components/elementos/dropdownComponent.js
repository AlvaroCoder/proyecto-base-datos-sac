import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

export default function DropdownMenuComponent({
    data=[],
    initialValue={},
    changeData
}) {
    const handleCheckedChange=(id)=>{
        const jsonSelected = data?.filter(item=>item?.id === id)[0]
        changeData(jsonSelected)
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger
            asChild
        >
            <Button
                variant="ghost"
                className="w-full border-input bg-transparent border border-gray-100 rounded-lg"
            >
                <p>{initialValue?.value}</p>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            className="max-h-[200px] overflow-y-auto"
        >
            {
                data?.map((item, key)=>(
                    <DropdownMenuCheckboxItem
                        key={key}
                        className="capitalize"
                        checked={initialValue?.id === item?.id}
                        onCheckedChange={()=>handleCheckedChange(item?.id)}
                    >
                        {item?.value}
                    </DropdownMenuCheckboxItem>
                ))
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
