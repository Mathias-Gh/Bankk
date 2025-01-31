import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavTabs: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex space-x-4 p-4 bg-gray-200">

      <Link to="/mescomptes" className={`px-4 py-2 ${location.pathname === '/mescomptes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Mes Comptes</Link>
      <Link to="/virements" className={`px-4 py-2 ${location.pathname === '/virements' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Virements</Link>
      <Link to="/dashboard" className={`px-4 py-2 ${location.pathname === '/dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Dashboard</Link>
      <Link to="/transactions" className={`px-4 py-2 ${location.pathname === '/transactions' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Transactions</Link>
      <Link to="/monprofil" className={`px-4 py-2 ${location.pathname === '/monprofil' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Mon Profil</Link>

    </nav>
  );
};

export default NavTabs;