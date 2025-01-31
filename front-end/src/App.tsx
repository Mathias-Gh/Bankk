import{BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import TransactionsPage from './pages/TransactionsPage.tsx'
import TransfersPage from './pages/TransfersPage.tsx'
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
          <Route path="/transferspage" element={<TransfersPage/>} />
          <Route path="/accountspage" element={<AccountsPage/>} />
          <Route path="/transactions/:accountId" element={<TransactionsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/monProfil" element={<MonProfil/>} />
        </Route>
      </Routes>
  </BrowserRouter>
  )
}

export default App;