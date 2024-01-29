import React, { useState } from "react";
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    TableBody,
    TableCell,
    TableRow,
    Menu, Chip,
} from "@mui/material";
import { Delete, ManageSearch, MoreVert } from "@mui/icons-material";
import { SchedulingProps, SchedulingTableBodyProps } from "../types/types";
import moment from "moment";

const ClientTableBody: React.FC<SchedulingTableBodyProps> = ({
          setSelectedScheduling,
          setOpenDetail,
          setOpenDelete,
          setOpenStatus,
          schedulings,
      }) => {

    const [open, setOpen] = useState<number | null>(null);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    function statusText(status: string) {
        switch (status) {
            case 'open':
                return 'Em Aberto';
            case 'done':
                return 'Concluído';
            case 'canceled':
                return 'Cancelado';
            default:
                return '- - -';
        }
    }

    function statusColor(status: string) {
        switch (status) {
            case 'open':
                return '#4CAF50';
            case 'done':
                return '#2196F3';
            case 'canceled':
                return '#F44336';
            default:
                return '#2196F3';
        }
    }

    return (
        <>
            <TableBody>
                {schedulings?.map((scheduling: SchedulingProps) => (
                    <TableRow
                        hover
                        tabIndex={-1}
                        key={scheduling?.id}
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedScheduling(scheduling);
                            setOpenDetail(true);
                        }}
                    >
                        <TableCell component="th" scope="row">
                            {scheduling.client?.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {scheduling.pet?.name}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            {moment(scheduling?.scheduled_at).format('DD/MM/YY')}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {moment(scheduling?.scheduled_at).format('HH:mm')}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            <Chip
                                label={statusText(scheduling?.status ?? '')}
                                size={'small'}
                                variant={'outlined'}
                                sx={{ borderColor: statusColor(scheduling?.status ?? ''), color: statusColor(scheduling?.status ?? '')}}
                            />
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
                                    setSelectedScheduling(scheduling);
                                    setAnchor(e.currentTarget);
                                    setOpen(scheduling.id);
                                }}
                            >
                                <MoreVert />
                            </IconButton>

                            <Menu
                                open={open === scheduling.id}
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
                                        setOpenStatus(true);
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
                                        primary="Mudar Situação"
                                        primaryTypographyProps={{ variant: "body2" }}
                                    />
                                </MenuItem>

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
                                        primary="Detalhes"
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
                                        primary="Excluir Agendamento"
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
