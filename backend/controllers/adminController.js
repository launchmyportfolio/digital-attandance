import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';

export const getEmployees = async (req, res) => {
  try {
    const { search = '' } = req.query;
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    const employees = await Employee.find(query).select('-password').sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch employees', error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee removed' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete employee', error: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { employeeId, status, startDate, endDate, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (employeeId) filter.employeeId = employeeId;
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [data, total] = await Promise.all([
      Attendance.find(filter).populate('employeeId', 'name email employeeId').sort({ date: -1 }).skip(skip).limit(parseInt(limit)),
      Attendance.countDocuments(filter)
    ]);
    res.json({ data, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch attendance', error: error.message });
  }
};

export const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const records = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch attendance', error: error.message });
  }
};

export const getDashboardStats = async (_req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({ role: 'employee' });
    const totalAttendance = await Attendance.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const [todayPresent, monthPresent] = await Promise.all([
      Attendance.countDocuments({ date: today, status: 'Present' }),
      Attendance.countDocuments({ date: { $gte: monthStart, $lte: today }, status: 'Present' })
    ]);

    const [todayAbsent, monthAbsent] = await Promise.all([
      Attendance.countDocuments({ date: today, status: 'Absent' }),
      Attendance.countDocuments({ date: { $gte: monthStart, $lte: today }, status: 'Absent' })
    ]);

    res.json({
      totalEmployees,
      totalAttendance,
      present: { today: todayPresent, month: monthPresent },
      absent: { today: todayAbsent, month: monthAbsent }
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch stats', error: error.message });
  }
};
