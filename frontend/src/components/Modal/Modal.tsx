import React, { ReactNode, Dispatch, SetStateAction } from "react";
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

//// => Esse componente é frequentemente utilizado na aplicação, acaba por ser uma camada utilizados as tas 'Dialog' do MUI, para criar esse
//// Modal customizado de mais fácil acesso aos seus atributos.


interface ModalProps {
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    title?: string;
    subtitle?: string;
    question?: string;
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

const Modal: React.FC<ModalProps> = ({
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
            sx={{
                "& .MuiDialog-paper": { width: "100%", maxWidth: "600px", ...styles },
            }}
            open={open ?? false}
            onClose={(reason) => {
                if (reason === "backdropClick") {
                    return;
                }
            }}
        >
            <ModalTitle
                title={title}
                subtitle={subtitle}
                avatarIcon={titleIcon}
                actionMenu={actionMenu}
            />
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
                    <Button sx={{ p: 0 }} onClick={() => setOpen && setOpen(false)}>
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
