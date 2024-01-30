import React, { ReactNode } from 'react';
import { Box, Typography } from "@mui/material";

interface LabelValueTextProps {
    value?: string | number ;
    label?: string;
    mb?: string;
    notText?: ReactNode;
}

//// => Componente que faz uma relaçao textual ou de elemento genérico, utilizado nos modos de 'somente leitura' da aplicação
//// acaba sendo uma maneira eficiente de chamar texto com determinado hierarquia e com relação de "chave/valor"

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
