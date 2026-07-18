import { listarUsuarios, obtenerUsuario, editarUsuario } from '../services/usuario.service.js';

export async function getUsuarios(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function getUsuarioById(req, res) {
  try {
    const usuario = await obtenerUsuario(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function updateUsuario(req, res) {
  try {
    const idSolicitado = parseInt(req.params.id);
    if (req.usuario.rol !== 'admin' && req.usuario.id !== idSolicitado) {
      return res.status(403).json({ error: 'No puedes editar el perfil de otro usuario.' });
    }
    const resultado = await editarUsuario(idSolicitado, req.body);
    if (!resultado.exitoso) return res.status(404).json({ error: resultado.mensaje });
    res.json(resultado.usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}
