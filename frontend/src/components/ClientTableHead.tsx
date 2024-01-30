import React from "react";
import {
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

//// => TableHead e TableBody, acabam por ocupar um consideravel espaço quando chamados, então para cada tabela renderizada é feito um Head e um Body

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
                <TableCell>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default ClientTableHead
