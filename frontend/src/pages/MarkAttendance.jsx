import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { addAttendance } from '../services/employee.js';
import Toast from '../components/Toast.jsx';

const MarkAttendance = () => {
  const [form, setForm] = useState({ status: 'Present', workingHours: 8, notes: '', date: new Date().toISOString().slice(0, 10) });
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addAttendance(form);
      setToast({ message: 'Attendance saved', type: 'success' });
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Failed to save', type: 'error' });
    } finally {
      setTimeout(() => setToast({ message: '' }), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Toast {...toast} />
      <Navbar />
      <div className="flex">
        <Sidebar role="employee" />
        <main className="flex-1 p-6">
          <div className="glass-card rounded-xl p-6 max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">Mark Attendance</h3>
            <form className="space-y-4" onSubmit={submit}>
              <div>
                <label className="text-sm text-slate-300">Date</label>
                <input type="date" className="input-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-slate-300">Status</label>
                <select
                  className="input-field"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  {['Present', 'Absent', 'Half Day', 'Leave'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300">Working Hours</label>
                <input
                  type="number"
                  className="input-field"
                  value={form.workingHours}
                  onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Notes</label>
                <textarea
                  className="input-field"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary">Save Attendance</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAttendance;
