import React from "react";
import {
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

//// => TableHead e TableBody, acabam por ocupar um consideravel espaço quando chamados, então para cada tabela renderizada é feito um Head e um Body

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
