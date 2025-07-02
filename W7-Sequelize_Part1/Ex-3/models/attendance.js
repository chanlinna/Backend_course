import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Student } from './student.js';
import { Class } from './class.js';

export const AttendanceRecord = sequelize.define('AttendanceRecord', {
  date: DataTypes.DATEONLY,
  status: DataTypes.STRING,
});

// Associations
AttendanceRecord.belongsTo(Student, { foreignKey: 'studentId' });
AttendanceRecord.belongsTo(Class, { foreignKey: 'classId' });

Student.belongsToMany(Class, { through: AttendanceRecord, foreignKey: 'studentId', otherKey: 'classId' });
Class.belongsToMany(Student, { through: AttendanceRecord, foreignKey: 'classId', otherKey: 'studentId' });
