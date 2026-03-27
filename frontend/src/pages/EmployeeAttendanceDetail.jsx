import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { attendanceByEmployee } from '../services/admin.js';
import Loader from '../components/Loader.jsx';

const EmployeeAttendanceDetail = () => {
  const { id } = useParams();
  const [records, setRecords] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await attendanceByEmployee(id);
        setRecords(data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="table-card">
            <h3 className="text-2xl font-semibold mb-4">Employee Attendance Detail</h3>
            {!records ? (
              <Loader />
            ) : (
              <table className="w-full text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="py-2">Date</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Hours</th>
                    <th className="py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r._id} className="border-t border-slate-800">
                      <td className="py-2">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="py-2">{r.status}</td>
                      <td className="py-2">{r.workingHours}</td>
                      <td className="py-2 text-slate-400">{r.notes || '-'}</td>
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

export default EmployeeAttendanceDetail;
