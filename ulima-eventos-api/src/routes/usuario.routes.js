import { Router }  from 'express';
import { getUsuarios, getUsuarioById, updateUsuario } from '../controllers/usuario.controller.js';
import { verificarToken, soloAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',    verificarToken, soloAdmin, getUsuarios);
router.get('/:id', verificarToken, getUsuarioById);
router.put('/:id', verificarToken, updateUsuario);

export default router;
