import React, { ReactNode } from "react";
import { Avatar, Box, Divider, Typography, DialogTitle } from "@mui/material";
import { PriorityHigh } from "@mui/icons-material";

interface ModalTitleProps {
    title?: string;
    subtitle?: string | undefined;
    styles?: Record<string, unknown>;
    avatarIcon?: ReactNode;
    actionMenu?: ReactNode;
}

const ModalTitle: React.FC<ModalTitleProps> = ({
         title,
         subtitle,
         styles,
         avatarIcon,
         actionMenu,
     }) => {

    return (
        <>
            <DialogTitle
                component={"div"}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    ...styles,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            mr: "1rem",
                        }}
                    >
                        {avatarIcon ?? <PriorityHigh />}
                    </Avatar>

                    <Typography variant={"h6"}>{title}</Typography>

                    {subtitle && (
                        <Typography variant={"body2"}>{subtitle}</Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {actionMenu}
                </Box>
            </DialogTitle>
            <Divider />
        </>
    );
};

export default ModalTitle;
