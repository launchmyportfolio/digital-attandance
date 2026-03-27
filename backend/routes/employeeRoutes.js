import express from 'express';
import { addAttendance, getMyAttendance, getProfile, updateTodayAttendance } from '../controllers/employeeController.js';
import { protect, employeeOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', protect, employeeOnly, getProfile);
router.get('/my-attendance', protect, employeeOnly, getMyAttendance);
router.post('/attendance', protect, employeeOnly, addAttendance);
router.put('/attendance/:id', protect, employeeOnly, updateTodayAttendance);

export default router;
