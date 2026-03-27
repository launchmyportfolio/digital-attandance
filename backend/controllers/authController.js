import Employee from '../models/Employee.js';
import generateToken from '../utils/generateToken.js';

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const employee = await Employee.create({ name, email, password, department });
    const token = generateToken(employee);
    res.status(201).json({
      token,
      user: { id: employee._id, name: employee.name, email: employee.email, role: employee.role, employeeId: employee.employeeId }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (!user || user.role !== 'employee') return res.status(401).json({ message: 'Invalid credentials' });
    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, employeeId: user.employeeId }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (!user || user.role !== 'admin') return res.status(401).json({ message: 'Invalid admin credentials' });
    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid admin credentials' });
    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed', error: error.message });
  }
};
