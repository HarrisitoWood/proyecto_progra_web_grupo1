import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define('Usuario', {
  nombre:   { type: DataTypes.STRING,                        allowNull: false },
  correo:   { type: DataTypes.STRING,  unique: true,         allowNull: false },
  codigo:   { type: DataTypes.STRING,  unique: true,         allowNull: false },
  carrera:  { type: DataTypes.STRING,                        allowNull: false },
  password: { type: DataTypes.STRING,                        allowNull: false },
  rol:      { type: DataTypes.ENUM('usuario', 'admin'),      defaultValue: 'usuario' },
}, { tableName: 'usuarios' });
