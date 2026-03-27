import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { listAttendance } from '../services/admin.js';
import Loader from '../components/Loader.jsx';

const AttendanceReport = () => {
  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState({ status: '', employeeId: '', startDate: '', endDate: '', page: 1 });
  const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await listAttendance(filters);
      setRecords(data.data);
      setPageInfo({ page: data.page, pages: data.pages });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changePage = (p) => {
    setFilters({ ...filters, page: p });
    setTimeout(load, 0);
  };

  const exportCSV = () => {
    const header = ['Date', 'Employee', 'Status', 'Hours', 'Notes'];
    const rows = records.map((r) => [
      new Date(r.date).toLocaleDateString(),
      `${r.employeeId?.name || ''} (${r.employeeId?.employeeId || ''})`,
      r.status,
      r.workingHours,
      r.notes || ''
    ]);
    const csv = [header, ...rows].map((row) => row.join(',')).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance-report.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="table-card space-y-4">
            <div className="flex flex-wrap gap-3">
              <input className="input-field" placeholder="Employee ID" value={filters.employeeId} onChange={(e) => setFilters({ ...filters, employeeId: e.target.value })} />
              <select className="input-field" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All Status</option>
                {['Present', 'Absent', 'Half Day', 'Leave'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <input type="date" className="input-field" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
              <input type="date" className="input-field" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
              <button className="btn-primary" onClick={load}>Filter</button>
              <button type="button" className="btn-primary bg-emerald-500" onClick={exportCSV}>Export CSV</button>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                <table className="w-full text-sm">
                  <thead className="text-slate-400">
                    <tr>
                      <th className="py-2">Date</th>
                      <th className="py-2">Employee</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Hours</th>
                      <th className="py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={r._id} className="border-t border-slate-800">
                        <td className="py-2">{new Date(r.date).toLocaleDateString()}</td>
                        <td className="py-2">{r.employeeId?.name} ({r.employeeId?.employeeId})</td>
                        <td className="py-2">{r.status}</td>
                        <td className="py-2">{r.workingHours}</td>
                        <td className="py-2 text-slate-400">{r.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex gap-2 justify-end pt-4">
                  <button className="btn-primary" disabled={pageInfo.page <= 1} onClick={() => changePage(pageInfo.page - 1)}>
                    Prev
                  </button>
                  <button className="btn-primary" disabled={pageInfo.page >= pageInfo.pages} onClick={() => changePage(pageInfo.page + 1)}>
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceReport;
