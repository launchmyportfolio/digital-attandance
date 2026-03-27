import React from 'react';
import { NavLink } from 'react-router-dom';

const Item = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-lg px-4 py-2 text-sm font-medium transition ${
        isActive ? 'bg-primary/20 text-white border border-primary/60' : 'text-slate-300 hover:bg-slate-800'
      }`
    }
  >
    {label}
  </NavLink>
);

const Sidebar = ({ role }) => {
  const common = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/attendance', label: 'Mark Attendance' },
    { to: '/history', label: 'Attendance History' },
    { to: '/profile', label: 'Profile' }
  ];

  const admin = [
    { to: '/admin', label: 'Admin Dashboard' },
    { to: '/admin/employees', label: 'Employee List' },
    { to: '/admin/reports', label: 'Attendance Reports' }
  ];

  const items = role === 'admin' ? admin : common;

  return (
    <aside className="hidden md:block w-64 bg-slate-900/70 border-r border-slate-800 min-h-screen p-4 space-y-2">
      {items.map((i) => (
        <Item key={i.to} {...i} />
      ))}
    </aside>
  );
};

export default Sidebar;
