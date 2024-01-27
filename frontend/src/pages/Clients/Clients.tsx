import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Table,
    TableContainer,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Person} from "@mui/icons-material";
import ClientTableHead from "../../components/ClientTableHead";
import {api} from "../../services/Api";

const Clients: React.FC = () => {
    const [clients, setClients] = useState([])


    useEffect(function whenPageLoad(){
        fetchClientsData()
    },[])


    async function fetchClientsData() {
        try {
            const response = await api.get('/clients');
            setClients(response.data);
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }


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
