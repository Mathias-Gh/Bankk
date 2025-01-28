import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavTabs: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex space-x-4 p-4 bg-gray-200">
      <Link to="/Home" className={`px-4 py-2 ${location.pathname === '/home' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Home</Link>
      <Link to="/login" className={`px-4 py-2 ${location.pathname === '/login' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Login</Link>
      <Link to="/register" className={`px-4 py-2 ${location.pathname === '/register' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Register</Link>
    </nav>
  );
};

export default NavTabs;