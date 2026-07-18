import { Sequelize } from 'sequelize';
import dotenv        from 'dotenv';
import pg from 'pg';

dotenv.config();

const url = process.env.DATABASE_URL || '';

let sequelize;

if (url) {
  sequelize = new Sequelize(url, {
    dialect:        'postgres',
    dialectModule:  pg,
    logging:        false,
    dialectOptions: {
      ssl: {
        require:            true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host:    process.env.DB_HOST,
      port:    parseInt(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      dialectModule: pg,
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
