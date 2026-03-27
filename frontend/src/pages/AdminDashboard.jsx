import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { getDashboardStats } from '../services/admin.js';
import Loader from '../components/Loader.jsx';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar role="admin" />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          {!stats ? (
            <Loader />
          ) : (
            <>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-slate-400">Employees</p>
                  <p className="text-3xl font-bold">{stats.totalEmployees}</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-slate-400">Attendance Entries</p>
                  <p className="text-3xl font-bold">{stats.totalAttendance}</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-slate-400">Present Today</p>
                  <p className="text-3xl font-bold text-emerald-400">{stats.present.today}</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-slate-400">Absent Today</p>
                  <p className="text-3xl font-bold text-rose-400">{stats.absent.today}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-slate-400">Present This Month</p>
                  <p className="text-3xl font-bold text-emerald-400">{stats.present.month}</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-slate-400">Absent This Month</p>
                  <p className="text-3xl font-bold text-rose-400">{stats.absent.month}</p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
