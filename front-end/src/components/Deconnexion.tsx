import React from 'react';
import { useNavigate } from 'react-router-dom';

const Deconnexion: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Se déconnecter</button>
  );
};

export default Deconnexion;