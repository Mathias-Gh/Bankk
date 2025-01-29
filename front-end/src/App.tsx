import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard.tsx";
import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Transactions from "./pages/Transactions.tsx";
import Virements from "./pages/Virements.tsx";
import MesComptes from "./pages/MesComptes.tsx";
import MonProfil from "./pages/MonProfil.tsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      {/* La NavBar s'affiche sur toutes les pages */}
      <NavBar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Redirection de "/" vers "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Routes principales */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/virements" element={<Virements />} />
        <Route path="/mescomptes" element={<MesComptes />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/monprofil" element={<MonProfil />} />

        {/* Route 404 pour les URLs inconnues */}
        <Route path="*" element={<h1>Page non trouvée</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;