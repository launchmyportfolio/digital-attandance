import api from './api';

export const fetchProfile = () => api.get('/employees/me');
export const fetchMyAttendance = () => api.get('/employees/my-attendance');
export const addAttendance = (data) => api.post('/employees/attendance', data);
export const updateAttendance = (id, data) => api.put(`/employees/attendance/${id}`, data);
