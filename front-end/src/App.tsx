import{BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard.tsx'
import NavBar from './components/NavBar.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Transactions from './pages/Transactions.tsx'
import Virements from './pages/Virements.tsx'
import MesComptes from './pages/MesComptes.tsx'
import MonProfil from './pages/MonProfil.tsx'


function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/Virements" element={<Virements/>} />
      <Route path="/MesComptes" element={<MesComptes/>} />
      <Route path="/Transactions" element={<Transactions/>} />
      <Route path="/MonProfil" element={<MonProfil/>} />

    </Routes>
    <NavBar></NavBar>
  </BrowserRouter>
  )
}

export default App;