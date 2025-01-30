import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    //localStorage.removeItem('access_token');
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <button onClick={() => handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Déconnexion
    </button>
  );
};

export default LogoutButton;