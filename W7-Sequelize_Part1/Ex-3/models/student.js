import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const Student = sequelize.define('Student', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});
