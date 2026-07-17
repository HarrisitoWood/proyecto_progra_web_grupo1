import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Evento = sequelize.define('Evento', {
  titulo:      { type: DataTypes.STRING,   allowNull: false },
  descripcion: { type: DataTypes.TEXT,     allowNull: false },
  fecha:       { type: DataTypes.DATEONLY, allowNull: false },
  fechaTexto:  { type: DataTypes.STRING  },
  lugar:       { type: DataTypes.STRING,   allowNull: false },
  carrera:     { type: DataTypes.STRING,   defaultValue: 'Todas las carreras' },
  imagen:      { type: DataTypes.TEXT },
  tipo:        { type: DataTypes.STRING,   defaultValue: 'Charla' },
  pasado:      { type: DataTypes.BOOLEAN,  defaultValue: false },
}, { tableName: 'eventos' });
