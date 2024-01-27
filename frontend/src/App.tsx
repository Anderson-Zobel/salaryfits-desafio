import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
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
