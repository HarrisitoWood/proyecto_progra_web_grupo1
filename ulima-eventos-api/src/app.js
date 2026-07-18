import express      from 'express';
import cors         from 'cors';
import authRoutes   from './routes/auth.routes.js';
import eventoRoutes from './routes/evento.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API ULIMA Eventos funcionando.' });
});

app.use('/auth',     authRoutes);
app.use('/eventos',  eventoRoutes);
app.use('/usuarios', usuarioRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada.` });
});

export default app;
