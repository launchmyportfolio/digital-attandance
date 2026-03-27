import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Logo from './Logo.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = user?.role === 'admin'
    ? [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/employees', label: 'Employees' },
        { to: '/admin/reports', label: 'Reports' }
      ]
    : [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/attendance', label: 'Mark' },
        { to: '/history', label: 'History' },
        { to: '/profile', label: 'Profile' }
      ];

  return (
    <nav className="relative flex items-center justify-between px-4 md:px-6 py-4 bg-slate-900/70 backdrop-blur border-b border-slate-800 gap-3 flex-nowrap">
      <div className="flex items-center gap-3 min-w-0">
        <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3 min-w-0">
          <Logo compact />
          <span className="text-base md:text-lg font-semibold truncate">Junglee Russian Force</span>
        </Link>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          className="md:hidden btn-primary px-3 py-2 flex-shrink-0"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        {user && <span className="hidden md:inline text-sm text-slate-300 flex-shrink-0">{user.name} ({user.role})</span>}
        {user && (
          <button onClick={logout} className="hidden md:inline btn-primary bg-red-500 hover:bg-red-400 flex-shrink-0">
            Logout
          </button>
        )}
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 border-t border-slate-800 shadow-glass z-40">
          <div className="flex flex-col p-4 space-y-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="text-slate-100">
                {l.label}
              </Link>
            ))}
            {user && (
              <button onClick={logout} className="btn-primary bg-red-500 w-full">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
