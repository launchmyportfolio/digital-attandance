import axios from 'axios';

// In production point Vite env VITE_API_URL to the deployed backend (e.g. https://jrf-api.onrender.com)
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jrf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
