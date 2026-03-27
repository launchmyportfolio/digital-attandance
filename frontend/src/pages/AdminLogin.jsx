import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/auth.js';
import { AuthContext } from '../context/AuthContext.jsx';
import Toast from '../components/Toast.jsx';
import Logo from '../components/Logo.jsx';

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginAdmin(form);
      login(data);
      navigate('/admin');
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Login failed', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: '' }), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-radial-dark flex items-center justify-center px-4">
      <Toast {...toast} />
      <div className="glass-card rounded-3xl border border-emerald-400/40 p-10 w-full max-w-xl neon-border">
        <div className="mb-6 flex items-center justify-between">
          <Logo />
          <span className="text-sm text-slate-400">Admin Control</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Admin Login</h2>
        <p className="text-slate-300 mb-6">Manage employees, attendance and insights.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full bg-emerald-500" disabled={loading}>
            {loading ? 'Signing in...' : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
