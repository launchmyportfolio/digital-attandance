import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth.js';
import { AuthContext } from '../context/AuthContext.jsx';
import Toast from '../components/Toast.jsx';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' });
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await register(form);
      login(data);
      navigate('/dashboard');
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Registration failed', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: '' }), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-radial-dark flex items-center justify-center px-4">
      <Toast {...toast} />
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl border border-primary/40 p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Create your employee account</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Full Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Email</label>
            <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Password</label>
            <input type="password" className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Department</label>
            <input className="input-field" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          </div>
        </div>
        <button type="submit" className="btn-primary mt-6" disabled={loading}>
          {loading ? 'Creating...' : 'Register & Login'}
        </button>
      </form>
    </div>
  );
};

export default Register;
