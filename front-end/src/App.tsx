import{BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import TransactionsPage from './pages/TransactionsPage.tsx'
import Virements from './pages/Virements.tsx'
import AccountsPage from './pages/AccountsPage.tsx'
import MonProfil from './pages/MonProfil.tsx'
import Deconnexion from './components/Deconnexion.tsx'
import ProtectedRoute from "./components/ProtectedRoute.tsx";


function App() {
  return(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/deconnexion" element={<Deconnexion />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/virements" element={<Virements/>} />
          <Route path="/accountspage" element={<AccountsPage/>} />
          <Route path="/transactions/:accountId" element={<TransactionsPage />} />
          <Route path="/monProfil" element={<MonProfil/>} />
        </Route>
      </Routes>
  </BrowserRouter>
  )
}

export default App;