import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavTabs: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex space-x-4 p-4 bg-gray-200">
      <Link to="/Home" className={`px-4 py-2 ${location.pathname === '/home' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Home</Link>
      <Link to="/login" className={`px-4 py-2 ${location.pathname === '/login' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Login</Link>
      <Link to="/register" className={`px-4 py-2 ${location.pathname === '/register' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Register</Link>
      <Link to="/Mes_Comptes" className={`px-4 py-2 ${location.pathname === '/home' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Mes Comptes</Link>
      <Link to="/Virements" className={`px-4 py-2 ${location.pathname === '/register' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Virements</Link>
      <Link to="/Dashboard" className={`px-4 py-2 ${location.pathname === '/login' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Dashboard</Link>
      <Link to="/Transactions" className={`px-4 py-2 ${location.pathname === '/register' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Transactions</Link>
      <Link to="/MonProfil" className={`px-4 py-2 ${location.pathname === '/register' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Mon Profil</Link>

    </nav>
  );
};

export default NavTabs;