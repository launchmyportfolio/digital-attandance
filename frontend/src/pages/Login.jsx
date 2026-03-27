import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginEmployee } from '../services/auth.js';
import { AuthContext } from '../context/AuthContext.jsx';
import Toast from '../components/Toast.jsx';
import Logo from '../components/Logo.jsx';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginEmployee(form);
      login(data);
      navigate('/dashboard');
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
      <div className="grid lg:grid-cols-2 w-full max-w-5xl glass-card rounded-3xl border border-primary/30 overflow-hidden">
        <div className="p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.3),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.25),transparent_25%)]" />
          <div className="relative space-y-6">
            <Logo />
            <h2 className="text-3xl font-bold">Welcome back, Innovator.</h2>
            <p className="text-slate-300">Mark attendance in seconds with our neon-glass interface built for speed.</p>
            <ul className="space-y-2 text-slate-300">
              <li>• Secure JWT auth</li>
              <li>• Edit today only to keep integrity</li>
              <li>• Instant stats & history</li>
            </ul>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-10 bg-slate-950/70 backdrop-blur relative">
          <div className="absolute inset-0 border border-primary/30 rounded-3xl pointer-events-none" />
          <div className="space-y-6 relative">
            <h3 className="text-2xl font-semibold">Employee Login</h3>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Password</label>
              <input
                type="password"
                className="input-field"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
            <p className="text-sm text-slate-400">
              New here? <a href="/register" className="text-neon">Register now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
