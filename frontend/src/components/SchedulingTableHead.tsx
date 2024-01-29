import React from "react";
import {
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

const SchedulingTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Cliente
                </TableCell>
                <TableCell>
                    Pet
                </TableCell>
                <TableCell>
                    Data
                </TableCell>
                <TableCell>
                    Hora
                </TableCell>
                <TableCell>
                    Situação
                </TableCell>

                <TableCell>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default SchedulingTableHead
