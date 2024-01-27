import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box, Button,
    Card,
    CardContent,
    CardHeader, IconButton,
    Table,
    TableContainer, TextField,
    Typography,
} from "@mui/material";
import {Delete, Edit, Person} from "@mui/icons-material";
import ClientTableHead from "../../components/ClientTableHead";
import {api} from "../../services/Api";
import ClientTableBody from "../../components/ClientTableBody";
import Modal from "../../components/Modal/Modal";
import LabelValueText from "../../components/LabelValueText";

interface ClientsProps{
    id: number;
    name: string;
    email: string;
    pets: [];
    phone: string;
    created_at: string;
    updated_at: string;
}

interface ClientCreateProps{
    name?: string | undefined;
    email?: string;
    phone?: string;
}

interface ClientUpdateProps{
    id: number;
    name?: string | undefined;
    email?: string;
    phone?: string;
    pets?: []
}



const Clients: React.FC = () => {
    const [clients, setClients] = useState<ClientsProps[]>([])
    const [selectedClient, setSelectedClient] = useState(null)
    const [clientCreate, setClientCreate] = useState<ClientCreateProps>({
        name: "",
        email: "",
        phone: "",
    })
    const [clientUpdate, setClientUpdate] = useState<ClientUpdateProps>({
        id: selectedClient?.id,
        name: "",
        email: "",
        phone: "",
        pets: []
    })
    const [edit, setEdit] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(true)




    console.log(clientUpdate)


    async function fetchClientsData() {
        try {
            const response = await api.get('/clients');
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function createClient() {
        try {
            await api.post('/client', clientCreate);
            fetchClientsData()
            setEdit(false)
            setOpenCreate(false)

        } catch (error) {
            console.error(error);
        }
    }


    async function updateClient() {
        try {
            await api.put('/client', clientUpdate);
            fetchClientsData()
            setEdit(false)
            selectedClient(null)

        } catch (error) {
            console.error(error);
        }
    }

    async function deleteClient() {
        try {
            await api.delete('/client', {params: { id: selectedClient?.id }});
            fetchClientsData()
            setOpenDetail(false)
            setOpenDelete(false)

            setEdit(false)


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const allFieldsFilled = Object.values(clientCreate).every((value) => value.trim() !== "");
        setButtonDisabled(!allFieldsFilled);
    }, [clientCreate]);

    useEffect(function whenPageLoad(){
        fetchClientsData()
    },[])

    useEffect(function whenSelectClient(){
        const client = selectedClient?.id && clients?.find(e => e.id === selectedClient.id)
        setClientUpdate(client)
    },[selectedClient, clients])




    return (
        <>
            <title>Clientes</title>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Card
                    sx={{
                        width: '50%',
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
                        action={
                        <Button
                            variant={'contained'}
                            onClick={() =>  setOpenCreate(true)}
                        >
                            Cadastrar
                        </Button>
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
                                    <ClientTableBody
                                        selectedClient={selectedClient}
                                        setSelectedClient={setSelectedClient}
                                        openDetail={openDetail}
                                        setOpenDetail={setOpenDetail}
                                        openDelete={openDelete}
                                        setOpenDelete={setOpenDelete}
                                        clients={clients}
                                    />
                                </Table>
                            </TableContainer>
                    </CardContent>

                </Card>
                <Modal
                    title={clientUpdate?.name ?? ''}
                    open={openDetail}
                    titleIcon={<Person />}
                    removeConfirm
                    cancelText={'Fechar'}
                    onClickCancel={() => {
                        setOpenDetail(false)
                        fetchClientsData()
                        setEdit(false)
                    }}
                    styles={{ p: '1rem'}}
                    actionMenu={
                        <>
                            {!edit ?
                                <Box>
                                    <IconButton
                                        onClick={() => {
                                            setEdit(true)
                                            }
                                        }
                                    >
                                        <Edit/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setOpenDelete(true)}
                                    >
                                        <Delete/>
                                    </IconButton>
                                </Box>
                                :
                                <Box>
                                    <Button
                                        variant={'contained'}
                                        onClick={() => {
                                            updateClient()
                                            }
                                        }
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            fetchClientsData()
                                            setEdit(false)
                                            selectedClient(null)
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            }
                        </>
                    }
                    dialogContent={
                    <>
                        {edit ?
                          <Box
                          sx={{
                              display: 'flex',
                              flexDirection: 'column'
                          }}>
                        <TextField
                          label={'Nome'}
                          required
                          fullwidth
                          size={'small'}
                          value={clientUpdate?.name}
                          onChange={(e) => setClientUpdate(prevState => ({...prevState, name: e.target.value }))}
                          sx={{
                            mb: '1rem'
                          }}
                        />
                        <TextField
                            label={'E-mail'}
                            required
                            fullwidth
                            size={'small'}
                            value={clientUpdate?.email}
                            onChange={(e) => setClientUpdate(prevState => ({...prevState, name: e.target.value }))}
                            sx={{
                                mb: '1rem'
                            }}
                        />
                        <TextField
                            label={'Telefone'}
                            required
                            fullwidth
                            size={'small'}
                            value={clientUpdate?.phone}
                            onChange={(e) => setClientUpdate(prevState => ({...prevState, name: e.target.value }))}
                            sx={{
                                mb: '1rem'
                            }}
                        />
                        </Box>
                        :
                        <>
                            <LabelValueText
                            label={"E-mail"}
                            value={clientUpdate?.email}
                            />
                            <LabelValueText
                                label={"Telefone"}
                                value={clientUpdate?.phone}
                            />
                            <LabelValueText
                                label={"Pets"}
                                value={clientUpdate?.pets?.length < 1 && 'Cliente sem pet cadastrado'}
                            />

                                {clientUpdate?.pets?.map((pet, index) => (
                                    <Box
                                        sx={{
                                            backgroundColor: '#F3EFEF',
                                            borderRadius: '1rem',
                                            p: '0.7rem',
                                            mb: '1rem '

                                        }}
                                        key={index}
                                    >
                                        <LabelValueText
                                            label={'Nome'}
                                            value={pet.name}
                                            mb={'0'}
                                        />
                                        <LabelValueText
                                            label={'Tipo'}
                                            value={pet.type}
                                            mb={'0'}

                                        />
                                    </Box>
                                ))}
                            <Button
                                sx={{
                                    width: '100%'
                                }}
                                variant={'outlined'}
                            >
                                Cadastrar Pet
                            </Button>

                        </>

                        }
                    </>

                    }
                />


            </Box>
            <Modal
                title={'Cadastrar Cliente'}
                open={openCreate}
                titleIcon={<Person />}
                disabled={isButtonDisabled}
                confirmText={'Cadastrar'}
                onClickConfirm={ () => createClient()}
                cancelText={'Fechar'}
                onClickCancel={() => {
                    setOpenCreate(false)
                    setEdit(false)
                }}
                styles={{ p: '1rem'}}
                dialogContent={
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <TextField
                            label={'Nome'}
                            required
                            fullwidth
                            size={'small'}
                            value={clientCreate?.name}
                            onChange={(e) => setClientCreate(prevState => ({...prevState, name: e.target.value}))}
                            sx={{
                                mb: '1rem'
                            }}
                        />
                        <TextField
                            label={'E-mail'}
                            required
                            fullwidth
                            size={'small'}
                            value={clientCreate?.email}
                            onChange={(e) => setClientCreate(prevState => ({...prevState, email: e.target.value}))}
                            sx={{
                                mb: '1rem'
                            }}
                        />
                        <TextField
                            label={'Telefone'}
                            required
                            fullwidth
                            size={'small'}
                            value={clientCreate?.phone}
                            onChange={(e) => setClientCreate(prevState => ({...prevState, phone: e.target.value}))}
                            sx={{
                                mb: '1rem'
                            }}
                        />
                    </Box>
                }
            />
            <Modal
                open={openDelete}
                setOpen={setOpenDelete}
                title={'Excluir Cliente'}
                question={'Gostaria realmente de excluir esse cliente?'}
                onClickConfirm={() => deleteClient()}
            />
        </>
    );
};

export default Clients;
