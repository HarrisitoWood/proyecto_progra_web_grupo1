import dotenv      from 'dotenv';
import app         from './src/app.js';
import { sequelize } from './src/config/database.js';
import './src/models/index.js';

dotenv.config();

const PORT = process.env.PORT || 3005;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida.');
    await sequelize.sync();
    console.log('Tablas sincronizadas.');
    app.listen(PORT, () => {
      console.log(`API escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

if (process.env.VERCEL) {
  iniciar().catch(console.error);
} else {
  iniciar();
}

export default app;
