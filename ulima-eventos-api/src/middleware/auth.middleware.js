// ============================================================
// src/middleware/auth.middleware.js
// verificarToken → valida JWT en header Authorization
// soloAdmin      → verifica que el rol sea "admin"
// ============================================================

import jwt from 'jsonwebtoken';

const SECRETO = process.env.JWT_SECRET || 'ulima-eventos-secreto';

export function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });
  }

  try {
    req.usuario = jwt.verify(token, SECRETO);
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
}

export function soloAdmin(req, res, next) {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso restringido a administradores.' });
  }
  next();
}
