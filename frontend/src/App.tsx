import { Route, Routes } from 'react-router-dom'
import Schedulings from "./pages/Schedulings/Schedulings";
import Clients from "./pages/Clients/Clients";
import Pets from "./pages/Pets/Pets";
import NoMatch from "./pages/NoMatch/NoMatch";
import Sidebar from "./components/SideBar";

function App() {

  return (
    <>

        <Sidebar/>
        <Routes>
            <Route path="/" element={<Schedulings />}/>
            <Route path="/clientes" element={<Clients />}/>
            <Route path="/pets" element={<Pets />}/>
            <Route path="*" element={<NoMatch/>}/>
        </Routes>

    </>
  )
}

export default App
