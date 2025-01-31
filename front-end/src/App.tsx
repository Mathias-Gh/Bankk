import{BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import TransactionsPage from './pages/TransactionsPage.tsx'
import Virements from './pages/Virements.tsx'
import AccountsPage from './pages/AccountsPage.tsx'
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
          <Route path="/accountspage" element={<AccountsPage/>} />
          <Route path="/transactions/:accountId" element={<TransactionsPage />} />
          <Route path="/monProfil" element={<MonProfil/>} />
        </Route>
      </Routes>
  </BrowserRouter>
  )
}

export default App;