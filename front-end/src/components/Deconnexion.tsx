import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.tsx';


const Deconnexion: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Suppression du token du localStorage
    sessionStorage.removeItem('token'); // Optionnel si tu l'avais stocké en sessionStorage
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Suppression du cookie si utilisé
  
    navigate('/');
  };
  

  return (
    <>
        <NavBar />
        <button onClick={handleLogout} id='btnDisconnect'>Se déconnecter</button>
    </>
  );
};

export default Deconnexion;