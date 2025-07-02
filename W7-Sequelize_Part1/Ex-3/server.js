import express from 'express';
import { sequelize } from './db/database.js';
import { Student } from './models/student.js';
import { Class } from './models/class.js';
import { AttendanceRecord } from './models/attendance.js';

const app = express();
app.use(express.json());
const port = 3000;

// POST Mark attendance for a student in a class on a given date
app.post('/attendance', async (req, res) => {
  try {
    const { studentId, classId, date, status } = req.query;
    const record = await AttendanceRecord.create({ studentId, classId, date, status });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET Get attendance for a student on a specific date
app.get('/attendance', async (req, res) => {
  try {
    const { studentId, date } = req.query;
    const record = await AttendanceRecord.findOne({
      where: { studentId, date },
      include: [{ model: Class }]
    });
    res.json(record || { message: 'No record found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET List attendance for all students in a class
app.get('/classes/:id/attendance', async (req, res) => {
  try {
    const records = await AttendanceRecord.findAll({
      where: { classId: req.params.id },
      include: [{ model: Student }]
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET Get attendance summary for a student
app.get('/students/:id/attendance', async (req, res) => {
  try {
    const summary = await AttendanceRecord.findAll({
      where: { studentId: req.params.id },
      include: [{ model: Class }]
    });
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function start() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced");

    // sample data
    await Student.create({ name: 'Kim Jennie', email: 'jennie@gmail.com' });
    await Class.create({ name: '101', subject: 'Mathematics' });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Unable to connect:", error);
  }
}

start();
