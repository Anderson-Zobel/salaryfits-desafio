import React, { FC, ReactNode, Dispatch, SetStateAction } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    useMediaQuery,
} from "@mui/material";
import ModalTitle from "./ModalTitle";

interface ModalProps {
    open?: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    subtitle?: string;
    question: string;
    onClickConfirm?: () => void;
    onClickCancel?: () => void;
    dialogContent?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    titleIcon?: ReactNode;
    disabled?: boolean;
    removeConfirm?: boolean;
    styles?: Record<string, unknown>;
    actionMenu?: ReactNode;
}

const Modal: FC<ModalProps> = ({
           open,
           setOpen,
           title,
           subtitle,
           question,
           onClickConfirm,
           onClickCancel,
           dialogContent,
           confirmText,
           cancelText,
           titleIcon,
           disabled,
           removeConfirm,
           styles,
           actionMenu,
       }) => {
    const sizeMatch = useMediaQuery("@media (min-width:600px)");

    return (
        <Dialog
            fullScreen={!sizeMatch}
            sx={
                { "& .MuiDialog-paper": { width: "100%", maxWidth: "600px", ...styles }}}
            open={open ?? false}
            onClose={(event, reason) => {
                if (reason === "backdropClick") {
                    return;
                }
            }}
        >
            {title && (
                <ModalTitle
                    title={title}
                    subtitle={subtitle}
                    avatarIcon={titleIcon}
                    actionMenu={actionMenu}
                />
            )}
            <DialogContent>
                {dialogContent}

                <DialogContentText>{question}</DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem",
                }}
            >
                {!onClickCancel ? (
                    <Button
                        sx={{ p: 0 }}
                        onClick={() => (setOpen(false))}
                    >
                        {cancelText ?? "Cancelar"}
                    </Button>
                ) : (
                    <Button size={"small"} sx={{ p: 0 }} onClick={onClickCancel}>
                        {cancelText ?? "Cancelar"}
                    </Button>
                )}
                <Box>
                    {!removeConfirm && (
                        <Button
                            size={"small"}
                            variant={"contained"}
                            disabled={disabled}
                            onClick={onClickConfirm}
                            autoFocus
                        >
                            {confirmText ?? "Confirmar"}
                        </Button>
                    )}
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
