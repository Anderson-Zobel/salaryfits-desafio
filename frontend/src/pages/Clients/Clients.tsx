import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Table,
    TableContainer,
    TextField,
    Typography, useMediaQuery,
} from "@mui/material";
import { Delete, Edit, Person } from "@mui/icons-material";
import ClientTableHead from "../../components/ClientTableHead";
import { api } from "../../services/Api";
import ClientTableBody from "../../components/ClientTableBody";
import Modal from "../../components/Modal/Modal";
import LabelValueText from "../../components/LabelValueText";
import {useGlobalContext} from "../../contexts/GlobalContext";
import { useNavigate } from 'react-router-dom';
import { ClientsProps, ClientCreateProps, ClientUpdateProps, PetsProps } from "../../types/types";
import { useSnackbar } from "notistack";
import MasksFilter from "../../shared/MasksFilter";

//// => Camada do Cliente, as partes mais complexas da aplicação
//// => Comporta uma organização: declarações, como Context, Libs de fora, Querys, > Estados > Funções > Requisições e Useffect.


const Clients: React.FC = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { trigger, setTrigger } = useGlobalContext();
    const sizeMatch = useMediaQuery("@media (min-width:900px)");

    const createInitialState = {
        name: "",
        email: "",
        phone: "",
    }

    const [clients, setClients] = useState<ClientsProps[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientsProps | null>(null);
    const [clientCreate, setClientCreate] = useState<ClientCreateProps>(createInitialState);
    const [clientUpdate, setClientUpdate] = useState<ClientUpdateProps>({
        id: selectedClient?.id || 0,
        name: "",
        email: "",
        phone: "",
        pets: [],
    });
    const [edit, setEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [filter, setFilter] = useState({
        search: ""
    })

    function noPets(){
        if (clientUpdate?.pets?.length !== undefined && clientUpdate.pets.length < 1){
            return "Cliente sem pet cadastrado"
        }

    }

    async function fetchClientsData() {
        try {
            const response = await api.get('/clients', {params : filter });
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function createClient() {
        try {
            await api.post('/client', clientCreate);
            enqueueSnackbar('Cliente cadastrado', { variant: 'success' })
            fetchClientsData();
            setEdit(false);
            setOpenCreate(false);
            setClientCreate(createInitialState)
            setTrigger(prevState => ({...prevState, createClient: false}))
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Erro ao cadastrar cliente', { variant: 'error' })
        }
    }

    async function updateClient() {
        try {
            await api.put('/client', clientUpdate);
            enqueueSnackbar('Cliente atualizado', { variant: 'success' })
            fetchClientsData();
            setEdit(false);
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Erro ao atualizar cliente', { variant: 'error' })
        }
    }

    async function deleteClient() {
        try {
            await api.delete('/client', { params: { id: selectedClient?.id } });
            enqueueSnackbar('Cliente deletado', { variant: 'success' })
            fetchClientsData();
            setOpenDetail(false);
            setOpenDelete(false);
            setEdit(false);
        } catch (error) {
            enqueueSnackbar('Erro ao atualizar cliente', { variant: 'error' })
            console.error(error);
        }
    }

    //// => Costumo mover para uma function comum para poder nomear o useEffect, deixando o que ele está fazendo explícito

    useEffect(function checkInputs() {
        const allFieldsFilled = Object.values(clientCreate).every((value) => value?.trim() !== "");
        setButtonDisabled(!allFieldsFilled);
    }, [clientCreate]);

    useEffect(() => {
        fetchClientsData();
    }, [filter]);

    useEffect(() => {
        const client = selectedClient?.id && clients?.find((e) => e.id === selectedClient.id);
        setClientUpdate(client as ClientUpdateProps);
    }, [selectedClient, clients]);


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
                        width: sizeMatch ? '50%' : '100%',
                        mt: '4rem'
                    }}
                >
                    <CardHeader
                        avatar={<Avatar sx={{ bgcolor: '#8AA9C1' }}><Person /></Avatar>}
                        title={
                            <Typography
                                variant={'h5'}
                                sx={{
                                    display: 'flex',
                                    fontWeight: '400',
                                }}
                            >
                                Clientes
                            </Typography>
                        }
                        action={
                            <Button
                                variant={'contained'}
                                onClick={() => setOpenCreate(true)}
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
                        <TextField
                            label={'Procure pelo nome'}
                            fullWidth={true}
                            size={'small'}
                            value={filter?.search}
                            onChange={(e) => setFilter((prevState) => ({ ...prevState, search: e.target.value }))}
                            sx={{
                                mb: '1rem',
                            }}
                        />
                        <TableContainer>
                            <Table>
                                <ClientTableHead />
                                <ClientTableBody
                                    setSelectedClient={setSelectedClient}
                                    setOpenDetail={setOpenDetail}
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
                        setOpenDetail(false);
                        setEdit(false);
                    }}
                    styles={{ p: '1rem' }}
                    actionMenu={
                        <>
                            {!edit ? (
                                <Box>
                                    <IconButton
                                        onClick={() => {
                                            setEdit(true);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setOpenDelete(true)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Box>
                                    <Button
                                        variant={'contained'}
                                        onClick={() => {
                                            updateClient();
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            fetchClientsData();
                                            setEdit(false);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            )}
                        </>
                    }
                    dialogContent={
                        <>
                            {edit ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <TextField
                                        label={'Nome'}
                                        required={true}
                                        fullWidth={true}
                                        size={'small'}
                                        value={clientUpdate?.name}
                                        onChange={(e) => setClientUpdate((prevState) => ({ ...prevState, name: e.target.value }))}
                                        sx={{
                                            mb: '1rem',
                                        }}
                                    />
                                    <TextField
                                        label={'E-mail'}
                                        required={true}
                                        fullWidth={true}
                                        size={'small'}
                                        value={clientUpdate?.email}
                                        onChange={(e) => setClientUpdate((prevState) => ({ ...prevState, email: e.target.value }))}
                                        sx={{
                                            mb: '1rem',
                                        }}
                                    />
                                    <TextField
                                        label={'Telefone'}
                                        required={true}
                                        fullWidth={true}
                                        size={'small'}
                                        value={MasksFilter?.phone(clientUpdate?.phone ?? '')}
                                        onChange={(e) => setClientUpdate((prevState) => ({ ...prevState, phone: e.target.value }))}
                                        sx={{
                                            mb: '1rem',
                                        }}
                                    />
                                </Box>
                            ) : (
                                <>
                                    <LabelValueText label={"E-mail"} value={clientUpdate?.email} />
                                    <LabelValueText label={"Telefone"} value={MasksFilter?.phone(clientUpdate?.phone ?? '')} />
                                    <LabelValueText
                                        label={"Pets"}
                                        value={noPets()}
                                    />

                                    {clientUpdate?.pets?.map((pet: PetsProps, index: number) => (
                                        <Box
                                            sx={{
                                                backgroundColor: '#F3EFEF',
                                                borderRadius: '1rem',
                                                p: '0.7rem',
                                                mb: '1rem ',
                                            }}
                                            key={index}
                                        >
                                            <LabelValueText label={'Nome'} value={pet?.name ?? ''} mb={'0'} />
                                            <LabelValueText label={'Tipo'} value={pet?.type ?? ''} mb={'0'} />
                                        </Box>
                                    ))}
                                    <Button
                                        sx={{
                                            width: '100%',
                                        }}
                                        onClick={() => {
                                            navigate('/pets')
                                            setTrigger(prevState => ({...prevState, createPet: true}))
                                        }}
                                        variant={'outlined'}
                                    >
                                        Cadastrar Pet
                                    </Button>
                                </>
                            )}
                        </>
                    }
                />
            </Box>
            <Modal
                title={'Cadastrar Cliente'}
                open={openCreate || trigger?.createClient}
                titleIcon={<Person />}
                disabled={isButtonDisabled}
                confirmText={'Cadastrar'}
                onClickConfirm={() => createClient()}
                cancelText={'Fechar'}
                onClickCancel={() => {
                    setClientCreate(createInitialState)
                    setOpenCreate(false);
                    setEdit(false);
                    setTrigger(prevState => ({...prevState, createClient: false}))
                }}
                styles={{ p: '1rem' }}
                dialogContent={
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            label={'Nome'}
                            required={true}
                            fullWidth={true}
                            size={'small'}
                            value={clientCreate?.name ?? ''}
                            onChange={(e) => setClientCreate((prevState) => ({ ...prevState, name: e.target.value }))}
                            sx={{
                                mb: '1rem',
                            }}
                        />
                        <TextField
                            label={'E-mail'}
                            required={true}
                            fullWidth={true}
                            size={'small'}
                            value={clientCreate?.email ?? ''}
                            onChange={(e) => setClientCreate((prevState) => ({ ...prevState, email: e.target.value }))}
                            sx={{
                                mb: '1rem',
                            }}
                        />
                        <TextField
                            label={'Telefone'}
                            required={true}
                            fullWidth={true}
                            size={'small'}
                            value={MasksFilter?.phone(clientCreate?.phone ?? '')}
                            onChange={(e) => setClientCreate((prevState) => ({ ...prevState, phone: e.target.value }))}
                            sx={{
                                mb: '1rem',
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
