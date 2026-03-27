import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';

const Home = () => (
  <div className="min-h-screen bg-radial-dark text-slate-100 flex flex-col">
    <header className="p-6 flex items-center justify-between">
      <Logo />
      <div className="flex gap-3">
        <Link to="/login" className="btn-primary">Employee Login</Link>
        <Link to="/admin/login" className="btn-primary bg-emerald-500">Admin Login</Link>
      </div>
    </header>

    <main className="flex-1 grid md:grid-cols-2 gap-10 px-8 md:px-16 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smart, secure & stylish attendance for modern teams.
        </h1>
        <p className="text-lg text-slate-300">
          Junglee Russian Force keeps daily presence, working hours and leave status in one elegant dashboard.
          Admins get real-time stats; employees mark attendance in seconds.
        </p>
        <div className="flex gap-4">
          <Link to="/register" className="btn-primary">Register Employee</Link>
          <Link to="/login" className="btn-primary bg-transparent border border-primary text-primary">Get Started</Link>
        </div>
      </div>
      <div className="glass-card rounded-2xl p-6 shadow-neon">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl p-4 bg-slate-900/70 border border-slate-800">
            <div className="text-3xl font-bold text-emerald-400">98%</div>
            <div className="text-sm text-slate-400">On-time punches</div>
          </div>
          <div className="rounded-xl p-4 bg-slate-900/70 border border-slate-800">
            <div className="text-3xl font-bold text-primary">42</div>
            <div className="text-sm text-slate-400">Active employees</div>
          </div>
          <div className="col-span-2 rounded-xl p-4 bg-gradient-to-r from-primary/30 via-cyan-500/20 to-emerald-400/20 border border-primary/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Today's Presence</p>
                <p className="text-2xl font-semibold">35 Present / 3 Absent</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary/50 flex items-center justify-center text-lg font-semibold">92%</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Home;
