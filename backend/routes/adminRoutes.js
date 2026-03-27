import express from 'express';
import { adminOnly, protect } from '../middleware/auth.js';
import {
  deleteEmployee,
  getAttendance,
  getAttendanceByEmployee,
  getDashboardStats,
  getEmployees
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/employees', protect, adminOnly, getEmployees);
router.delete('/employees/:id', protect, adminOnly, deleteEmployee);
router.get('/attendance', protect, adminOnly, getAttendance);
router.get('/attendance/:employeeId', protect, adminOnly, getAttendanceByEmployee);
router.get('/dashboard-stats', protect, adminOnly, getDashboardStats);

export default router;
