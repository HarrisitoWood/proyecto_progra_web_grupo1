import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    console.log('CONECTADO OK');
    return client.query('SELECT NOW()');
  })
  .then(res => console.log(res.rows))
  .catch(err => console.error('ERROR:', err))
  .finally(() => client.end());