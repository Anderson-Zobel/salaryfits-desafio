import {
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    TableBody,
    TableCell,
    TableRow,
    Menu,
} from "@mui/material";
import React, { useState } from "react";
import { Delete, ManageSearch, MoreVert } from "@mui/icons-material";
import { PetsProps, PetTableBodyProps } from "../types/types";

//// => TableHead e TableBody, acabam por ocupar um consideravel espaço quando chamados, então para cada tabela renderizada é feito um Head e um Body

const ClientTableBody: React.FC<PetTableBodyProps> = ({
         setSelectedPet,
         setOpenDetail,
         setOpenDelete,
         pets,
     }) => {

    const [open, setOpen] = useState<number | null>(null);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    return (
        <>
            <TableBody>
                {pets?.map((pet: PetsProps) => (
                    <TableRow
                        hover
                        tabIndex={-1}
                        key={pet?.id}
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPet(pet);
                            setOpenDetail(true);
                        }}
                    >
                        <TableCell component="th" scope="row">
                            {pet.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {pet.type}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            {pet?.client?.name}
                        </TableCell>

                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                width: "24px",
                            }}
                        >
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPet(pet);
                                    setAnchor(e.currentTarget);
                                    setOpen(pet.id);
                                }}
                            >
                                <MoreVert />
                            </IconButton>

                            <Menu
                                open={open === pet.id}
                                anchorEl={anchor}
                                onClose={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    setOpen(null);
                                }}
                                PaperProps={{
                                    sx: { width: 200, maxWidth: "100%" },
                                }}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <MenuItem
                                    onClick={(e) => {
                                        setOpenDetail(true);
                                        setOpen(null);
                                        e.stopPropagation();
                                    }}
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                >
                                    <ListItemIcon>
                                        <ManageSearch />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Detalhes do Pet"
                                        primaryTypographyProps={{ variant: "body2" }}
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        setOpenDelete(true);
                                        setOpen(null);
                                        e.stopPropagation();
                                    }}
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                >
                                    <ListItemIcon>
                                        <Delete />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Excluir Pet"
                                        primaryTypographyProps={{ variant: "body2" }}
                                    />
                                </MenuItem>
                            </Menu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default ClientTableBody;
