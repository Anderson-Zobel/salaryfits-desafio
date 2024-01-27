import { Route, Routes } from 'react-router-dom'
import Schedulings from "./pages/Schedulings/Schedulings";
import Clients from "./pages/Clients/Clients";
import Pets from "./pages/Pets/Pets";
import NoMatch from "./pages/NoMatch/NoMatch";
import Sidebar from "./components/SideBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

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

        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Sidebar/>
            <Routes>
                <Route path="/" element={<Schedulings />}/>
                <Route path="/clientes" element={<Clients />}/>
                <Route path="/pets" element={<Pets />}/>
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </ThemeProvider>

    </>
  )
}

export default App
