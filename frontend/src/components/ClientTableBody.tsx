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
    id: number,
    name: string;
    email: string;
    pets: [];
    phone: string;
    created_at: string;
    updated_at: string;
}

interface ClientTableBodyProps {
    setSelectedClient: React.Dispatch<React.SetStateAction<ClientsProps | null>>;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    clients: ClientsProps[];
}

const ClientTableBody: React.FC<ClientTableBodyProps> = ({
     setSelectedClient,
     setOpenDetail,
     setOpenDelete,
     clients,
    }) => {

    const [open, setOpen] = useState<number | null>(null);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    return (
        <>
            <TableBody>
                {clients?.map((client: ClientsProps) => (
                    <TableRow
                        hover
                        tabIndex={-1}
                        key={client?.id}
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClient(client);
                            setOpenDetail(true);
                        }}
                    >
                        <TableCell component="th" scope="row">
                            {client.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {client.email}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            {client.phone}
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
                                    setSelectedClient(client);
                                    setAnchor(e.currentTarget);
                                    setOpen(client.id);
                                }}
                            >
                                <MoreVert />
                            </IconButton>

                            <Menu
                                open={open === client.id}
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
                                        primary="Detalhes do Cliente"
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
                                        primary="Excluir Cliente"
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