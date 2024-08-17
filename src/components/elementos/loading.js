import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function SkeletonTableLibros() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
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
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                </TableRow>
                <TableRow >
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                </TableRow>
                <TableRow >
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                    <TableCell><Skeleton className={"h-4 w-[150px]"}/></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}