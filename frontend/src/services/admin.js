import api from './api';

export const listEmployees = (params) => api.get('/admin/employees', { params });
export const listAttendance = (params) => api.get('/admin/attendance', { params });
export const attendanceByEmployee = (id) => api.get(`/admin/attendance/${id}`);
export const deleteEmployee = (id) => api.delete(`/admin/employees/${id}`);
export const getDashboardStats = () => api.get('/admin/dashboard-stats');
