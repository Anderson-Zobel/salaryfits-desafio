import React from "react";
import {
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

const PetTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Nome
                </TableCell>
                <TableCell>
                    Tipo
                </TableCell>
                <TableCell>
                    Cliente
                </TableCell>
                <TableCell>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default PetTableHead
