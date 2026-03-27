import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
    employeeId: { type: String, unique: true },
    department: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

employeeSchema.pre('save', async function (next) {
  // Avoid double-hashing if a hashed password is already provided (e.g., seed or migrations)
  const alreadyHashed = typeof this.password === 'string' && this.password.startsWith('$2');
  if (!this.isModified('password') || alreadyHashed) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

employeeSchema.pre('save', function (next) {
  if (!this.employeeId) {
    this.employeeId = `JRF-${Math.floor(100000 + Math.random() * 900000)}`;
  }
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
