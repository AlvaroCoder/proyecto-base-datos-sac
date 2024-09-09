import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function SkeletonTableLibros({headers=[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {
                        headers.map(item=>
                            <TableHead>{item}</TableHead>
                        )
                    }
                    <TableHead>#</TableHead>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Ubicacion</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Pretado a</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow >
                    {
                        Array.from({length : headers.length}).map((_)=> <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>)
                    }
                </TableRow>
                <TableRow >
                    {
                        Array.from({length : headers.length}).map((_)=> <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>)
                    }
                </TableRow>
                <TableRow >
                    {
                        Array.from({length : headers.length}).map((_)=> <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>)
                    }
                </TableRow>
            </TableBody>
        </Table>
    )
}