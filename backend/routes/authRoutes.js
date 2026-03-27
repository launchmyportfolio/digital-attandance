import express from 'express';
import { loginAdmin, loginEmployee, registerEmployee } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.post('/admin/login', loginAdmin);

export default router;
