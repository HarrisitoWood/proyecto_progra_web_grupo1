import { authApi }    from './api.js';
import { usuariosApi } from './api.js';

export async function registrarUsuario(datos) {
  try {
    await authApi.registro(datos);
    return { exito: true };
  } catch (err) {
    return { exito: false, mensaje: err.message };
  }
}

export async function obtenerUsuarios() {
  return usuariosApi.getAll();
}

export async function obtenerUsuarioPorId(id) {
  if (!id) return null;
  return usuariosApi.getById(id);
}

export async function editarUsuario(id, datos) {
  return usuariosApi.update(id, datos);
}
