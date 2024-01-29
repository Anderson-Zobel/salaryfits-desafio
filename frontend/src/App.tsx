import { Route, Routes } from 'react-router-dom'
import Schedulings from "./pages/Schedulings/Schedulings";
import Clients from "./pages/Clients/Clients";
import Pets from "./pages/Pets/Pets";
import NoMatch from "./pages/NoMatch/NoMatch";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale'

function App() {

    const theme = createTheme({
        typography: {
            fontFamily: "Roboto, sans-serif",
        },
        palette: {
            background: {
                default: '#F3EFEF',
            },
        }
    });

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar/>
                <Routes>
                    <Route path="/" element={<Schedulings />}/>
                    <Route path="/clientes" element={<Clients />}/>
                    <Route path="/pets" element={<Pets />}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Routes>
            </ThemeProvider>
        </LocalizationProvider>


    </>
  )
}

export default App
