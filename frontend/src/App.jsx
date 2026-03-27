import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Register from './pages/Register.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import MarkAttendance from './pages/MarkAttendance.jsx';
import AttendanceHistory from './pages/AttendanceHistory.jsx';
import Profile from './pages/Profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeList from './pages/EmployeeList.jsx';
import AttendanceReport from './pages/AttendanceReport.jsx';
import EmployeeAttendanceDetail from './pages/EmployeeAttendanceDetail.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute role="employee">
          <EmployeeDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/attendance"
      element={
        <ProtectedRoute role="employee">
          <MarkAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/history"
      element={
        <ProtectedRoute role="employee">
          <AttendanceHistory />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute role="employee">
          <Profile />
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin"
      element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/employees"
      element={
        <ProtectedRoute role="admin">
          <EmployeeList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/reports"
      element={
        <ProtectedRoute role="admin">
          <AttendanceReport />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/attendance/:id"
      element={
        <ProtectedRoute role="admin">
          <EmployeeAttendanceDetail />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default App;
