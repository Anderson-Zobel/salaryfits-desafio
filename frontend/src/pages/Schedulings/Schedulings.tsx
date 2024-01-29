import React, { useEffect, useState } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Chip, Fade,
    IconButton, MenuItem,
    Table,
    TableContainer,
    TextField, ToggleButton, ToggleButtonGroup,
    Typography, useMediaQuery,
} from "@mui/material";
import  {CalendarMonth, Delete, Edit } from "@mui/icons-material";
import { api } from "../../services/Api";
import Modal from "../../components/Modal/Modal";
import LabelValueText from "../../components/LabelValueText";
import {useGlobalContext} from "../../contexts/GlobalContext";
import { useNavigate } from 'react-router-dom';
import {
    ClientsProps,
    SchedulingProps,
    SchedulingCreateProps,
    SchedulingUpdateProps
} from "../../types/types"
import SchedulingTableHead from "../../components/SchedulingTableHead";
import SchedulingTableBody from "../../components/SchedulingTableBody";
import { MobileTimePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from "moment";
import {useSnackbar} from "notistack";

const Schedulings: React.FC = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { setTrigger } = useGlobalContext();
    const sizeMatch = useMediaQuery("@media (min-width:900px)");

    const createInitialState = {
        scheduled_at: moment().format(),
    }

    const [schedulings, setSchedulings] = useState<SchedulingProps[]>([]);
    const [clients, setClients] = useState<ClientsProps[]>([]);
    const [selectedScheduling, setSelectedScheduling] = useState<SchedulingProps | null>(null);
    const [schedulingCreate, setSchedulingCreate] = useState<SchedulingCreateProps>(createInitialState);
    const [schedulingUpdate, setSchedulingUpdate] = useState<SchedulingUpdateProps>({
        id: selectedScheduling?.id || 0,
        status: "",
        scheduled_at: "",
    });
    const [edit, setEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [openFilter, setOpenFilter] = useState(false)
    const [dateFilter, setDateFilter] = useState(null)
    const [clientsCheck, setClientsCheck] = useState(false)
    const [filter, setFilter] = useState({
        search: "",
        date: "",
        status: ""
    })

    function statusText(status: string) {
        switch (status) {
            case 'open':
                return 'Em Aberto';
            case 'done':
                return 'Concluído';
            case 'canceled':
                return 'Cancelado';
            default:
                return '- - -';
        }
    }

    function statusColor(status: string) {
        switch (status) {
            case 'open':
                return '#4CAF50';
            case 'done':
                return '#2196F3';
            case 'canceled':
                return '#F44336';
            default:
                return '#2196F3';
        }
    }

    async function fetchClientsData() {
        try {
            const response = await api.get('/clients');
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchSchedulingData() {
        try {
            const response = await api.get('/schedulings', { params: filter});
            setSchedulings(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function createScheduling() {
        try {
            await api.post('/scheduling', schedulingCreate);
            enqueueSnackbar('Agendamento criado', { variant: 'success' })
            fetchSchedulingData();
            setEdit(false);
            setOpenCreate(false);
            setSchedulingCreate(createInitialState)
            setSelectedScheduling(null)
        } catch (error) {
            enqueueSnackbar('Erro ao criar agendamento', { variant: 'error' })
            console.error(error);
        }
    }

    async function updateScheduling() {
        try {
            await api.put('/scheduling', schedulingUpdate);
            enqueueSnackbar('Agendamento atualizado', { variant: 'success' })
            fetchSchedulingData();
            setOpenStatus(false)
            setEdit(false);
        } catch (error) {
            enqueueSnackbar('Erro ao atualizar agendamento', { variant: 'error' })
            console.error(error);
        }
    }

    async function deleteScheduling() {
        try {
            await api.delete('/scheduling', { params: { id: selectedScheduling?.id } });
            enqueueSnackbar('Agendamento deletado', { variant: 'success' })
            fetchSchedulingData();
            setOpenDetail(false);
            setOpenDelete(false);
            setEdit(false);
        } catch (error) {
            enqueueSnackbar('Erro ao deletar agendamento', { variant: 'error' })
            console.error(error);
        }
    }

    useEffect(() => {
        const areFieldsFilled = schedulingCreate?.scheduled_at && schedulingCreate?.client_id && schedulingCreate?.pet_id;
        setButtonDisabled(!areFieldsFilled);
    }, [schedulingCreate]);

    useEffect(function firstLoad() {
        fetchSchedulingData();
        fetchClientsData();
    }, []);

    useEffect(function whenUseFilter() {
        fetchSchedulingData();
    }, [filter]);

    useEffect(() => {
        const scheduling = selectedScheduling?.id && schedulings?.find((e) => e.id === selectedScheduling.id);
        setSchedulingUpdate(scheduling as SchedulingUpdateProps);
    }, [selectedScheduling, schedulings]);

    useEffect(function openFilterObserver(){
        if(openFilter === true) {
            setFilter(prevState => ({...prevState, date: dateFilter ?? ''}))
        } else {
            setFilter(prevState => ({...prevState, date: ''}))
        }
    }, [dateFilter, openFilter])

    useEffect(function checkClientsConditional(){
       if(clients && clients[0] && clients[0]?.pets && clients[0]?.pets.length > 0){
           setClientsCheck(true)
       } else {
           setClientsCheck(false)
       }
    }, [clients])


    return (
        <>
            <title>Agendamentos</title>
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
                        avatar={<Avatar sx={{ bgcolor: '#8AA9C1' }}><CalendarMonth /></Avatar>}
                        title={
                            <Typography
                                variant={'h5'}
                                sx={{
                                    display: 'flex',
                                    fontWeight: '400',
                                }}
                            >
                                Agendamentos
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
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                mb: '1rem',
                                width: '100%'
                            }}
                        >
                            <Fade
                                in={openFilter}
                                mountOnEnter
                                unmountOnExit
                                timeout={200}
                            >
                                <Box>
                                    <DesktopDatePicker
                                        label="Data"
                                        value={dateFilter}
                                        onChange={(date) => setDateFilter(date)}
                                    />
                                </Box>
                            </Fade>
                            <Button
                                variant={'text'}
                                onClick={() => {
                                    setOpenFilter(!openFilter)
                                }}
                            >
                                {openFilter ? "Remover filtro" : "Filtro por data"}
                            </Button>
                        </Box>
                        <ToggleButtonGroup
                            fullWidth
                            value={filter?.status}
                            exclusive
                            onChange={(_e, value) => setFilter((prevState) => ({
                                ...prevState,
                                status: value,
                            }))}
                            size={'small'}
                            sx={{ mb: '1rem', width: '100%'}}
                        >
                            <ToggleButton
                                value="open"
                                style={{
                                    backgroundColor: filter?.status === 'open'
                                        ? statusColor('open')
                                        : '',
                                }}
                            >
                                Aberto
                            </ToggleButton>
                            <ToggleButton
                                value="done"
                                style={{
                                    backgroundColor: filter?.status === 'done'
                                        ? statusColor('done')
                                        : '',
                                }}
                            >
                                Concluído
                            </ToggleButton>
                            <ToggleButton
                                value="canceled"
                                style={{
                                    backgroundColor: filter?.status === 'canceled'
                                        ? statusColor('canceled')
                                        : '',
                                }}
                            >
                                Cancelado
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <TextField
                            label={'Procure cliente ou pet'}
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
                                <SchedulingTableHead />
                                <SchedulingTableBody
                                    setSelectedScheduling={setSelectedScheduling}
                                    setOpenDetail={setOpenDetail}
                                    setOpenDelete={setOpenDelete}
                                    setOpenStatus={setOpenStatus}
                                    schedulings={schedulings}
                                />
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
                <Modal
                    title={'Agendamento'}
                    titleIcon={<CalendarMonth />}
                    open={openDetail}
                    removeConfirm
                    cancelText={'Fechar'}
                    onClickCancel={() => {
                        setOpenDetail(false);
                        setSelectedScheduling(null)
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
                                            updateScheduling();
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            fetchSchedulingData();
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
                                        label={'Pet'}
                                        select={true}
                                        required={true}
                                        fullWidth={true}
                                        size={'small'}
                                        value={schedulingUpdate?.pet_id ?? ''}
                                        onChange={(e) => setSchedulingUpdate((prevState) => ({
                                            ...prevState,
                                            pet_id: +e.target.value
                                        }))}
                                        sx={{
                                            mb: '1rem',
                                        }}
                                    >
                                        {clients
                                            ?.find((client) => client.id === schedulingUpdate?.client_id)
                                            ?.pets?.map((pet) => (
                                                <MenuItem key={pet.id} value={pet.id}>
                                                    {pet.name}
                                                </MenuItem>
                                            ))}
                                    </TextField>

                                        <DesktopDatePicker
                                            label="Data"
                                            value={schedulingUpdate?.scheduled_at}
                                            onChange={(date) => setSchedulingUpdate(prevState => ({...prevState, scheduled_at: date ?? ''}))}
                                            sx={{ mb: '1rem'}}
                                        />
                                        <MobileTimePicker
                                            label="Hora"
                                            value={schedulingUpdate?.scheduled_at}
                                            onChange={(date) => setSchedulingUpdate(prevState => ({...prevState, scheduled_at: date ?? ''}))}
                                            sx={{ mb: '1rem'}}
                                        />



                                    <ToggleButtonGroup
                                        fullWidth
                                        value={schedulingUpdate?.status}
                                        exclusive
                                        onChange={(_e, value) => setSchedulingUpdate((prevState) => ({
                                            ...prevState,
                                            status: value
                                        }))}
                                    >
                                        <ToggleButton
                                            value="open"
                                            style={{
                                                backgroundColor: schedulingUpdate?.status === 'open'
                                                    ? statusColor('open')
                                                    : '',
                                            }}
                                        >
                                            Aberto
                                        </ToggleButton>
                                        <ToggleButton
                                            value="done"
                                            style={{
                                                backgroundColor: schedulingUpdate?.status === 'done'
                                                    ? statusColor('done')
                                                    : '',
                                            }}
                                        >
                                            Concluído
                                        </ToggleButton>
                                        <ToggleButton
                                            value="canceled"
                                            style={{
                                                backgroundColor: schedulingUpdate?.status === 'canceled'
                                                    ? statusColor('canceled')
                                                    : '',
                                            }}
                                        >
                                            Cancelado
                                        </ToggleButton>
                                    </ToggleButtonGroup>



                                </Box>
                            ) : (
                                <>
                                    <LabelValueText label={'Cliente'} value={schedulingUpdate?.client?.name} mb={'1rem'} />
                                    <LabelValueText label={"Pet"} value={schedulingUpdate?.pet?.name} mb={'1rem'}/>
                                    <LabelValueText label={'Data'} value={String(moment(schedulingUpdate?.scheduled_at).format('DD/MM/YY'))} mb={'1rem'} />
                                    <LabelValueText label={'Hora'} value={String(moment(schedulingUpdate?.scheduled_at).format('HH:mm'))} mb={'1rem'} />
                                    <LabelValueText
                                        label={'Situação'}
                                        notText={<Chip
                                            label={statusText(schedulingUpdate?.status ?? '')}
                                            size={'small'}
                                            variant={'outlined'}
                                            sx={{ borderColor: statusColor(schedulingUpdate?.status ?? ''), color: statusColor(schedulingUpdate?.status ?? '')  }}
                                            />}
                                        mb={'1rem'}
                                    />
                                </>
                            )}
                        </>
                    }
                />
            </Box>
            <Modal
                title={'Marcar Agendamento'}
                open={openCreate}
                titleIcon={<CalendarMonth />}
                disabled={isButtonDisabled}
                confirmText={'Agendar'}
                onClickConfirm={() => createScheduling()}
                cancelText={'Fechar'}
                onClickCancel={() => {
                    setSchedulingCreate(createInitialState)
                    setSelectedScheduling(null)
                    setOpenCreate(false);
                    setEdit(false);
                }}
                styles={{ p: '1rem' }}
                dialogContent={
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                    {clientsCheck ?

                        <>
                        <TextField
                            label={'Cliente'}
                            select={true}
                            required={true}
                            fullWidth={true}
                            size={'small'}
                            value={schedulingCreate?.client_id ?? ''}
                            onChange={(e) => setSchedulingCreate((prevState) => ({
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

                        <Fade
                            in={!!schedulingCreate?.client_id}
                            mountOnEnter
                            unmountOnExit
                            timeout={500}

                        >
                            <TextField
                                label={'Pet'}
                                select={true}
                                required={true}
                                fullWidth={true}
                                size={'small'}
                                value={schedulingCreate?.pet_id ?? ''}
                                onChange={(e) => setSchedulingCreate((prevState) => ({
                                    ...prevState,
                                    pet_id: +e.target.value
                                }))}
                                sx={{
                                    mb: '1rem',
                                }}
                            >
                                {clients
                                    ?.find((client) => client.id === schedulingCreate?.client_id)
                                    ?.pets?.map((pet) => (
                                        <MenuItem key={pet.id} value={pet.id}>
                                            {pet.name}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Fade>

                            <DesktopDatePicker
                                label="Data"
                                value={schedulingCreate?.scheduled_at}
                                onChange={(date) => setSchedulingCreate(prevState => ({...prevState, scheduled_at: date ?? ''}))}
                                sx={{
                                    mb: '1rem'
                                }}
                            />
                        <MobileTimePicker
                            label="Hora"
                            value={schedulingCreate?.scheduled_at}
                            sx={{
                                mb: '1rem'
                            }}
                            onChange={(date) => setSchedulingCreate(prevState => ({ ...prevState, scheduled_at: date ?? '' }))}
                        />
                        </>
                        :
                        <>
                            <Alert severity={'info'} sx={{mb: '1rem'}}>
                                É necessário ter pelo menos um cliente com um pet cadastrado para criar um agendamento
                            </Alert>
                            {clients?.length > 0 ? (
                                <Alert severity={'success'} sx={{ mb: '1rem' }}>
                                    Existe pelo menos um cliente cadastrado.
                                </Alert>
                            ) : (
                                <Alert severity={'info'} sx={{ mb: '1rem' }}>
                                    Não possui clientes cadastrados.
                                </Alert>
                            )}

                            {clients && clients[0]?.pets && clients[0]?.pets?.length < 1 && (
                                <Alert severity={'info'} sx={{ mb: '1rem' }}>
                                    Não possui nenhum pet cadastrado.
                                </Alert>
                            )}

                            <Button
                                sx={{
                                    width: '100%',
                                    mb: '1rem',
                                    mt: '1rem',
                                }}
                                variant={'outlined'}
                                onClick={() => {
                                    setTrigger((prevState) => ({ ...prevState, createClient: true }));
                                    navigate('/clientes');
                                }}
                            >
                                Cadastrar Cliente
                            </Button>

                            {clients?.length > 0 &&
                              <Button
                                sx={{
                                    width: '100%',
                                }}
                                onClick={() => {
                                    navigate('/pets');
                                    setTrigger((prevState) => ({...prevState, createPet: true}));
                                }}
                                variant={'outlined'}
                              >
                                Cadastrar Pet
                              </Button>
                            }


                        </>
                    }
                    </Box>
                }
            />
            <Modal
                open={openStatus}
                setOpen={setOpenStatus}
                title={'Situação'}
                onClickConfirm={() => updateScheduling()}
                dialogContent={
                    <ToggleButtonGroup
                        fullWidth
                        value={schedulingUpdate?.status}
                        exclusive
                        onChange={(_e, value) => setSchedulingUpdate((prevState) => ({
                            ...prevState,
                            status: value
                        }))}
                    >
                        <ToggleButton
                            value="open"
                            style={{
                                backgroundColor: schedulingUpdate?.status === 'open'
                                    ? statusColor('open')
                                    : '',
                            }}
                        >
                            Aberto
                        </ToggleButton>
                        <ToggleButton
                            value="done"
                            style={{
                                backgroundColor: schedulingUpdate?.status === 'done'
                                    ? statusColor('done')
                                    : '',
                            }}
                        >
                            Concluído
                        </ToggleButton>
                        <ToggleButton
                            value="canceled"
                            style={{
                                backgroundColor: schedulingUpdate?.status === 'canceled'
                                    ? statusColor('canceled')
                                    : '',
                            }}
                        >
                            Cancelado
                        </ToggleButton>
                    </ToggleButtonGroup>
                }
            />

            <Modal
                open={openDelete}
                setOpen={setOpenDelete}
                title={'Excluir Agendamento'}
                question={'Gostaria realmente de excluir esse agendamento?'}
                onClickConfirm={() => deleteScheduling()}
            />
        </>
    );
};

export default Schedulings;
