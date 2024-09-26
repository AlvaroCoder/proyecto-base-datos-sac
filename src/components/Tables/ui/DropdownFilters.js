import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DropdownFiltersComponents({
    data=[],
    titleData="",
    titleButton="",
    handleCheckedChange,

}) {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost">
                    <span>{titleButton}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    data.map((item,key)=>
                    <DropdownMenuCheckboxItem
                        key={key}
                        className="capitalize"
                        checked={item==titleData}
                        onCheckedChange={()=>handleCheckedChange(item)}
                    >
                        {item}
                    </DropdownMenuCheckboxItem>)
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}