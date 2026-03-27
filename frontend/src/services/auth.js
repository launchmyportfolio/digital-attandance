import api from './api';

export const register = (data) => api.post('/auth/register', data);
export const loginEmployee = (data) => api.post('/auth/login', data);
export const loginAdmin = (data) => api.post('/auth/admin/login', data);
