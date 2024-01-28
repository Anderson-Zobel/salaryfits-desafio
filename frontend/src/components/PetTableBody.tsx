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

interface ClientsProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    pets?: [];
}

interface PetsProps {
    id: number;
    name: string;
    type: string;
    client_id: number;
    created_at: string;
    updated_at: string;
    client?: ClientsProps;
}

interface PetTableBodyProps {
    setSelectedPet: React.Dispatch<React.SetStateAction<PetsProps | null>>;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    pets: PetsProps[];
}

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
