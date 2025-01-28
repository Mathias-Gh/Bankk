import{BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './Dashboard.js'
import NavBar from './components/NavBar.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'


function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />

    </Routes>
    <NavBar>

    </NavBar>
  </BrowserRouter>
  )
}

export default App;