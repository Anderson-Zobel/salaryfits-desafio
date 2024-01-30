import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton, MenuItem,
    Table,
    TableContainer,
    TextField,
    Typography, useMediaQuery,
} from "@mui/material";
import { Delete, Edit, Pets } from "@mui/icons-material";
import { api } from "../../services/Api";
import Modal from "../../components/Modal/Modal";
import LabelValueText from "../../components/LabelValueText";
import PetTableHead from "../../components/PetTableHead";
import PetTableBody from "../../components/PetTableBody";
import {useGlobalContext} from "../../contexts/GlobalContext";
import { useNavigate } from 'react-router-dom';
import { PetsProps, PetCreateProps, PetUpdateProps, ClientsProps } from "../../types/types"
import {useSnackbar} from "notistack";

//// => Camada de Pets, existe uma dependência da camada de Client


const Clients: React.FC = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { trigger, setTrigger } = useGlobalContext();
    const sizeMatch = useMediaQuery("@media (min-width:900px)");


    const createInitialState = {
        name: "",
        type: "",
    }

    const [pets, setPets] = useState<PetsProps[]>([]);
    const [clients, setClients] = useState<ClientsProps[]>([]);
    const [selectedPet, setSelectedPet] = useState<PetsProps | null>(null);
    const [petCreate, setPetCreate] = useState<PetCreateProps>(createInitialState);
    const [petUpdate, setPetUpdate] = useState<PetUpdateProps>({
        id: selectedPet?.id || 0,
        name: "",
        type: "",
    });
    const [edit, setEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [filter, setFilter] = useState({
        search: ""
    })

//// => Utilizo a função com async, não utilizando a convenção para arrow Function, ao ver que começa com async facilitta saber que é uma requisição.

    async function fetchClientsData() {
        try {
            const response = await api.get('/clients', );
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchPetsData() {
        try {
            const response = await api.get('/pets', { params: filter });
            setPets(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function createPet() {
        try {
            await api.post('/pet', petCreate);
            enqueueSnackbar('Pet cadastrado', {variant: 'success'})
            fetchPetsData();
            setEdit(false);
            setOpenCreate(false);
            setPetCreate(createInitialState)
            setTrigger(prevState => ({...prevState, createPet: false}))
        } catch (error) {
            enqueueSnackbar('Erro ao cadastrar pet', {variant: 'error'})
            console.error(error);
        }
    }

    async function updatePet() {
        try {
            await api.put('/pet', petUpdate);
            enqueueSnackbar('Pet atualizado', {variant: 'success'})
            fetchPetsData();
            setEdit(false);
        } catch (error) {
            enqueueSnackbar('Erro ao atualizar pet', {variant: 'error'})
            console.error(error);
        }
    }

    async function deletePet() {
        try {
            await api.delete('/pet', { params: { id: selectedPet?.id } });
            enqueueSnackbar('Pet deletado', {variant: 'success'})
            fetchPetsData();
            setOpenDetail(false);
            setOpenDelete(false);
            setEdit(false);
        } catch (error) {
            enqueueSnackbar('Erro ao deletar pet', {variant: 'error'})
            console.error(error);
        }
    }

    useEffect(() => {
        const areFieldsFilled = petCreate?.name && petCreate?.type && petCreate?.client_id;
        setButtonDisabled(!areFieldsFilled);
    }, [petCreate]);

    useEffect(function firstPageLoad() {
        fetchPetsData();
        fetchClientsData();
    }, []);

    useEffect(function whenUseFilter() {
        fetchPetsData();
    }, [filter]);

    useEffect(function setSelectedPet() {
        const pet = selectedPet?.id && pets?.find((e) => e.id === selectedPet.id);
        setPetUpdate(pet || {} as PetUpdateProps);
    }, [selectedPet, pets]);

    return (
        <>
            <title>Pets</title>
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
                        avatar={<Avatar sx={{ bgcolor: '#8AA9C1' }}><Pets /></Avatar>}
                        title={
                            <Typography
                                variant={'h5'}
                                sx={{
                                    display: 'flex',
                                    fontWeight: '400',
                                }}
                            >
                                Pets
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
                                <PetTableHead />
                                <PetTableBody
                                    setSelectedPet={setSelectedPet}
                                    setOpenDetail={setOpenDetail}
                                    setOpenDelete={setOpenDelete}
                                    pets={pets}
                                />
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
                <Modal
                    title={petUpdate?.name ?? ''}
                    open={openDetail}
                    titleIcon={<Pets />}
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
                                            updatePet();
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            fetchPetsData();
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
                                        value={petUpdate?.name ?? ''}
                                        onChange={(e) => setPetUpdate((prevState) => ({ ...prevState, name: e.target.value }))}
                                        sx={{
                                            mb: '1rem',
                                        }}
                                    />
                                    <TextField
                                        label={'Tipo'}
                                        required={true}
                                        fullWidth={true}
                                        size={'small'}
                                        value={petUpdate?.type ?? ''}
                                        helperText={'ex: Gato, Cachorro, Papagaio'}
                                        onChange={(e) => setPetUpdate((prevState) => ({ ...prevState, type: e.target.value }))}
                                        sx={{
                                            mb: '1rem',
                                        }}
                                    />
                                    <TextField
                                        label={'Cliente'}
                                        required={true}
                                        select={true}
                                        fullWidth={true}
                                        size={'small'}
                                        value={petUpdate?.client_id ?? ''}
                                        onChange={(e) => setPetUpdate((prevState) => ({
                                            ...prevState,
                                            client_id: +e.target.value
                                        }))}
                                        sx={{
                                            mb: '1rem',
                                        }}
                                    >
                                        {clients?.map((client) =>
                                        <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                                        )}
                                    </TextField>
                                </Box>
                            ) : (
                                <>
                                    <LabelValueText label={"Tipo"} value={petUpdate?.type} />
                                    <LabelValueText label={'Cliente'} value={petUpdate?.client?.name ?? ''} mb={'0'} />
                                </>
                            )}
                        </>
                    }
                />
            </Box>
            <Modal
                title={'Cadastrar Pet'}
                open={openCreate || trigger?.createPet}
                titleIcon={<Pets />}
                disabled={isButtonDisabled}
                confirmText={'Cadastrar'}
                onClickConfirm={() => createPet()}
                cancelText={'Fechar'}
                onClickCancel={() => {
                    setPetCreate(createInitialState)
                    setOpenCreate(false);
                    setEdit(false);
                    setTrigger(prevState => ({...prevState, createPet:false }))
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
                            value={petCreate?.name ?? ''}
                            onChange={(e) => setPetCreate((prevState) => ({ ...prevState, name: e.target.value }))}
                            sx={{
                                mb: '1rem',
                            }}
                        />
                        <TextField
                            label={'Tipo'}
                            required={true}
                            fullWidth={true}
                            size={'small'}
                            helperText={'ex: Gato, Cachorro, Papagaio'}
                            value={petCreate?.type ?? ''}
                            onChange={(e) => setPetCreate((prevState) => ({ ...prevState, type: e.target.value }))}
                            sx={{
                                mb: '1rem',
                            }}
                        />

                        {clients?.length > 0 ?
                            <TextField
                                label={'Cliente'}
                                select={true}
                                required={true}
                                fullWidth={true}
                                size={'small'}
                                value={petCreate?.client_id ?? ''}
                                onChange={(e) => setPetCreate((prevState) => ({
                                    ...prevState,
                                    client_id: +e.target.value
                                }))}
                                sx={{
                                    mb: '1rem',
                                }}
                            >
                                {clients?.map((client) =>
                                    <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                                )}
                            </TextField>
                            :
                            <LabelValueText label={"Nenhum cliente cadastrado"}/>
                        }
                        <Button
                            sx={{
                                width: '100%',
                            }}
                            variant={'outlined'}
                            onClick={() => {
                                setTrigger(prevState => ({...prevState, createClient:true }))
                                navigate('/clientes')
                            }}
                        >
                            Cadastrar Cliente
                        </Button>

                    </Box>
                }
            />
            <Modal
                open={openDelete}
                setOpen={setOpenDelete}
                title={'Excluir Pet'}
                question={'Gostaria realmente de excluir esse pet?'}
                onClickConfirm={() => deletePet()}
            />
        </>
    );
};

export default Clients;
