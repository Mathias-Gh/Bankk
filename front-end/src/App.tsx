import{BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Transactions from './pages/Transactions.tsx'
import Virements from './pages/Virements.tsx'
import MesComptes from './pages/MesComptes.tsx'
import MonProfil from './pages/MonProfil.tsx'
import ProtectedRoute from "./components/ProtectedRoute.tsx";


function App() {
  return(
  <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/virements" element={<Virements/>} />
          <Route path="/mesComptes" element={<MesComptes/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/monProfil" element={<MonProfil/>} />
        </Route>
        {/* Ajoutez d'autres routes ici */}
      </Routes>
  </BrowserRouter>
  )
}

export default App;