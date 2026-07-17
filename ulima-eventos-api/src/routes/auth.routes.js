import { Router }  from 'express';
import { registro, loginUsuario } from '../controllers/auth.controller.js';

const router = Router();

router.post('/registro', registro);
router.post('/login',    loginUsuario);

export default router;
