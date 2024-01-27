import {
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Delete, ManageSearch, MoreVert } from "@mui/icons-material";
import Menu from "@mui/material/Menu";

interface ClientsProps{
    name: string;
    email: string;
    pets: [];
    phone: string;
    created_at: string;
    updated_at: string;
}


const ClientTableBody = (
    {
        setSelectedClient,
        setOpenDetail,
        setOpenDelete,
        clients
    }) => {

    const [open, setOpen] = useState(false)
    const [anchor, setAnchor] = useState(null)


    return (
        <>
            <TableBody>
                { clients?.map(( client : ClientsProps) => (
                    <TableRow
                        hover
                        tabIndex={-1}
                        key={client?.id}
                        sx={{ 'cursor': 'pointer' }}
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClient(client)
                            setOpenDetail(true)
                        }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                        >
                            {client.name}
                        </TableCell>
                        <TableCell
                            component="th"
                            scope="row"
                        >
                            {client.email}
                        </TableCell>

                        <TableCell
                            component="th"
                            scope="row"
                        >
                            {client.phone}
                        </TableCell>

                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                width: '24px'
                            }}
                        >
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedClient(client)
                                    setAnchor(e.currentTarget)
                                    setOpen(client.id)
                                }}>
                                <MoreVert/>
                            </IconButton>

                            <Menu
                                open={open === client.id}
                                anchorEl={anchor && anchor}
                                onClose={(e) => {
                                    e.stopPropagation()
                                    setOpen(false)
                                }}
                                PaperProps={{
                                    sx: { width: 200, maxWidth: '100%' },
                                }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem
                                    onClick={(e)=> {
                                        setOpenDetail(true)
                                        setOpen(false)
                                        e.stopPropagation()
                                    }}
                                    sx={{
                                        color: 'text.secondary'
                                    }}
                                >
                                    <ListItemIcon>
                                        <ManageSearch />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Detalhes do Cliente"
                                        primaryTypographyProps={{ variant: 'body2' }}/>
                                </MenuItem>
                                <MenuItem
                                    onClick={(e)=> {
                                        setOpenDelete(true)
                                        setOpen(false)
                                        e.stopPropagation()
                                    }}
                                    sx={{
                                        color: 'text.secondary'
                                    }}
                                >
                                    <ListItemIcon>
                                        <Delete />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Excluir Cliente"
                                        primaryTypographyProps={{ variant: 'body2' }}/>
                                </MenuItem>


                            </Menu>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </>
    )
}

export default ClientTableBody