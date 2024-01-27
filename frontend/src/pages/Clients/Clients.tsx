import React from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider, Table, TableContainer, Typography,
    useMediaQuery
} from "@mui/material";
import {Person} from "@mui/icons-material";
import ClientTableHead from "../../components/ClientTableHead";



const Clients: React.FC = () => {
const sizeMatch = useMediaQuery('@media (min-width:700px)')
    return (
        <>
            <title>Clientes</title>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                    textAlign: 'center',
                }}
            >
                <Card
                    sx={{
                        width: '50%'
                    }}
                >
                    <CardHeader
                        avatar={<Avatar sx={{ bgcolor: '#8AA9C1' }}><Person /></Avatar>}
                        title={
                        <Typography
                            variant={'h5'}
                            sx={{
                                display: 'flex',
                                fontWeight: '400'
                            }}
                        >
                            Clientes
                        </Typography>
                        }
                    />
                    <CardContent
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: '1rem',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                            <TableContainer>
                                <Table>
                                    <ClientTableHead />
                                </Table>
                            </TableContainer>
                    </CardContent>



                </Card>


            </Box>

        </>
    );
};

export default Clients;
