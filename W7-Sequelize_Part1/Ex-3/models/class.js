import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const Class = sequelize.define('Class', {
  name: DataTypes.STRING,
  subject: DataTypes.STRING,
});
