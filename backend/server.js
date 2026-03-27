import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Employee from './models/Employee.js';
import bcrypt from 'bcryptjs';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ message: 'Junglee Russian Force API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/admin', adminRoutes);

const seedAdmin = async () => {
  const adminEmail = 'admin@junglee.com';
  const existing = await Employee.findOne({ email: adminEmail });
  if (!existing) {
    await Employee.create({
      name: 'Super Admin',
      email: adminEmail,
      password: 'Admin@123', // hashed by model hook
      role: 'admin',
      department: 'HQ'
    });
    console.log('Default admin created: admin@junglee.com / Admin@123');
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
