import React, { ReactNode } from 'react';
import { Box, Typography } from "@mui/material";

interface LabelValueTextProps {
    value?: string | number ;
    label?: string;
    mb?: string;
    notText?: ReactNode;
}

const LabelValueText: React.FC<LabelValueTextProps> = ({ value, label, mb, notText}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: mb ?? '1rem'
            }}
        >
            <Typography
                sx={{
                    fontWeight: 'bold'
                }}
            >
                {label}
            </Typography>
            <Typography>
                {value}
            </Typography>
            {notText}
        </Box>
    );
}

export default LabelValueText;
