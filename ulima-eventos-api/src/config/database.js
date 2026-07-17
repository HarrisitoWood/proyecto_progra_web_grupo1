// ============================================================
// src/config/database.js
// Conexión Sequelize + PostgreSQL
// En producción (Vercel + Neon) usa DATABASE_URL
// En local usa las variables separadas del .env
// ============================================================

import { Sequelize } from 'sequelize';
import dotenv        from 'dotenv';

dotenv.config();

// El profe usa DATABASE_URL (cadena de conexión de Neon)
// Igual que en la guía de Vercel que dio en clase
const url = process.env.DATABASE_URL || '';

let sequelize;

if (url) {
  // Producción: Neon entrega una sola DATABASE_URL
  sequelize = new Sequelize(url, {
    dialect:        'postgres',
    logging:        false,
    dialectOptions: {
      ssl: {
        require:            true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // Local: variables separadas del .env
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host:    process.env.DB_HOST,
      port:    parseInt(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require:            true,
          rejectUnauthorized: false,
        },
      },
    }
  );
}

export { sequelize };
