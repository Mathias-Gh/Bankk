import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavTabs: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex space-x-4 p-4 bg-gray-200">
      <Link to="/deconnexion" className={`px-4 py-2 ${location.pathname === '/login' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Déconnexion</Link>
      <Link to="/AccountsPage" className={`px-4 py-2 ${location.pathname === '/accountspage' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Mes Comptes</Link>
      <Link to="/TransfersPage" className={`px-4 py-2 ${location.pathname === '/transferspage' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Virements</Link>
      <Link to="/Dashboard" className={`px-4 py-2 ${location.pathname === '/dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Dashboard</Link>
      <Link to="/Transactions" className={`px-4 py-2 ${location.pathname === '/transactions'? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Transactions</Link>
      <Link to="/MonProfil" className={`px-4 py-2 ${location.pathname === '/monprofil' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Mon Profil</Link>

    </nav>
  );
};

export default NavTabs;