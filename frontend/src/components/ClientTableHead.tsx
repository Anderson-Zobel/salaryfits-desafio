import React from "react";
import {
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

const ClientTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Nome
                </TableCell>
                <TableCell>
                    E-mail
                </TableCell>
                <TableCell>
                    Telefone
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default ClientTableHead
