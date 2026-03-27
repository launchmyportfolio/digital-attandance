import Attendance from '../models/Attendance.js';

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.user._id }).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch attendance', error: error.message });
  }
};

export const addAttendance = async (req, res) => {
  try {
    const { status, workingHours = 0, notes, date } = req.body;
    const entryDate = date ? new Date(date) : new Date();
    entryDate.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({ employeeId: req.user._id, date: entryDate });
    if (existing) return res.status(400).json({ message: 'Attendance already marked for today' });

    const attendance = await Attendance.create({
      employeeId: req.user._id,
      date: entryDate,
      status,
      workingHours,
      notes
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Unable to mark attendance', error: error.message });
  }
};

export const updateTodayAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const record = await Attendance.findOne({ _id: id, employeeId: req.user._id });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);
    if (recordDate.getTime() !== today.getTime()) return res.status(400).json({ message: 'Only today\'s entry can be edited' });

    const { status, workingHours, notes } = req.body;
    record.status = status ?? record.status;
    record.workingHours = workingHours ?? record.workingHours;
    record.notes = notes ?? record.notes;
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update attendance', error: error.message });
  }
};
