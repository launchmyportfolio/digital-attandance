import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { fetchMyAttendance } from '../services/employee.js';
import Loader from '../components/Loader.jsx';

const EmployeeDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchMyAttendance();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const present = data.filter((d) => d.status === 'Present').length;
  const absent = data.filter((d) => d.status === 'Absent').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar role="employee" />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-slate-400">Total Entries</p>
              <p className="text-3xl font-bold">{data.length}</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-slate-400">Present</p>
              <p className="text-3xl font-bold text-emerald-400">{present}</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-slate-400">Absent</p>
              <p className="text-3xl font-bold text-rose-400">{absent}</p>
            </div>
          </div>
          <div className="table-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Attendance</h3>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="py-2">Date</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Hours</th>
                    <th className="py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 7).map((row) => (
                    <tr key={row._id} className="border-t border-slate-800">
                      <td className="py-2">{new Date(row.date).toLocaleDateString()}</td>
                      <td className="py-2">{row.status}</td>
                      <td className="py-2">{row.workingHours}</td>
                      <td className="py-2 text-slate-400">{row.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
