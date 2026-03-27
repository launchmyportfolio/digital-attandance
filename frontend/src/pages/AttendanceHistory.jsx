import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { fetchMyAttendance, updateAttendance } from '../services/employee.js';
import Loader from '../components/Loader.jsx';
import Toast from '../components/Toast.jsx';

const AttendanceHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await fetchMyAttendance();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpdate = async (record) => {
    try {
      await updateAttendance(record._id, { status: record.status, workingHours: record.workingHours, notes: record.notes });
      setToast({ message: 'Updated', type: 'success' });
      load();
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Update failed', type: 'error' });
    } finally {
      setTimeout(() => setToast({ message: '' }), 3000);
    }
  };

  const canEdit = (dateStr) => {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Toast {...toast} />
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar role="employee" />
        <main className="flex-1 p-4 md:p-6">
          <div className="table-card">
            <h3 className="text-2xl font-semibold mb-4">Attendance History</h3>
            {loading ? (
              <Loader />
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-slate-400">
                  <tr>
                    <th className="py-2">Date</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Hours</th>
                    <th className="py-2">Notes</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row._id} className="border-t border-slate-800">
                      <td className="py-2">{new Date(row.date).toLocaleDateString()}</td>
                      <td className="py-2">
                        {canEdit(row.date) ? (
                          <select
                            className="input-field"
                            value={row.status}
                            onChange={(e) => setData((prev) => prev.map((r) => (r._id === row._id ? { ...r, status: e.target.value } : r)))}
                          >
                            {['Present', 'Absent', 'Half Day', 'Leave'].map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        ) : (
                          row.status
                        )}
                      </td>
                      <td className="py-2">
                        {canEdit(row.date) ? (
                          <input
                            type="number"
                            className="input-field"
                            value={row.workingHours}
                            onChange={(e) => setData((prev) => prev.map((r) => (r._id === row._id ? { ...r, workingHours: e.target.value } : r)))}
                          />
                        ) : (
                          row.workingHours
                        )}
                      </td>
                      <td className="py-2">
                        {canEdit(row.date) ? (
                          <input
                            className="input-field"
                            value={row.notes || ''}
                            onChange={(e) => setData((prev) => prev.map((r) => (r._id === row._id ? { ...r, notes: e.target.value } : r)))}
                          />
                        ) : (
                          row.notes || '-'
                        )}
                      </td>
                      <td className="py-2">
                        {canEdit(row.date) && (
                          <button className="btn-primary" onClick={() => handleUpdate(row)}>
                            Save
                          </button>
                        )}
                      </td>
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

export default AttendanceHistory;
