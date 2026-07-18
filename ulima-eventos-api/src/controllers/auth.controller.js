import { registrar, login } from '../services/auth.service.js';

export async function registro(req, res) {
  try {
    const resultado = await registrar(req.body);
    if (!resultado.exitoso) return res.status(400).json({ error: resultado.mensaje });
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function loginUsuario(req, res) {
  try {
    const resultado = await login(req.body);
    if (!resultado.exitoso) return res.status(401).json({ error: resultado.mensaje });
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}
