import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { deleteEmployee, listEmployees } from '../services/admin.js';
import Loader from '../components/Loader.jsx';
import Toast from '../components/Toast.jsx';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await listEmployees({ search });
      setEmployees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await deleteEmployee(id);
    setToast({ message: 'Employee deleted', type: 'success' });
    load();
    setTimeout(() => setToast({ message: '' }), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Toast {...toast} />
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar role="admin" />
        <main className="flex-1 p-4 md:p-6">
          <div className="table-card">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
              <h3 className="text-2xl font-semibold">Employees</h3>
              <div className="flex gap-2 flex-wrap">
                <input className="input-field" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className="btn-primary" onClick={load}>Search</button>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <table className="w-full text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Employee ID</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id} className="border-t border-slate-800">
                      <td className="py-2">{emp.name}</td>
                      <td className="py-2">{emp.email}</td>
                      <td className="py-2">{emp.employeeId}</td>
                      <td className="py-2">
                        <button className="btn-primary bg-red-500" onClick={() => remove(emp._id)}>Delete</button>
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

export default EmployeeList;
