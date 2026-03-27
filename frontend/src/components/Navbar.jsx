import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Logo from './Logo.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-900/70 backdrop-blur border-b border-slate-800">
      <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3">
        <Logo compact />
        <span className="text-xl font-semibold">Junglee Russian Force</span>
      </Link>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm text-slate-300">{user.name} ({user.role})</span>}
        {user && (
          <button onClick={logout} className="btn-primary bg-red-500 hover:bg-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
