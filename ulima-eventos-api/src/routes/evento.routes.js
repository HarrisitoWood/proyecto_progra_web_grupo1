import { Router } from 'express';
import {
  getEventos, getEventosProximos, getEventosHistorial,
  getEventoById, createEvento, updateEvento, deleteEvento,
} from '../controllers/evento.controller.js';
import { verificarToken, soloAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Públicas
router.get('/',          getEventos);
router.get('/proximos',  getEventosProximos);
router.get('/historial', getEventosHistorial);
router.get('/:id',       getEventoById);

// Solo admin
router.post('/',    verificarToken, soloAdmin, createEvento);
router.put('/:id',  verificarToken, soloAdmin, updateEvento);
router.delete('/:id', verificarToken, soloAdmin, deleteEvento);

export default router;
