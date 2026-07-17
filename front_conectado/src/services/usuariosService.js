// ============================================================
// services/usuariosService.js
// Reemplaza localStorage por llamadas al API
// Los nombres de funciones son IDÉNTICOS al original
// ============================================================

import { authApi }    from './api.js';
import { usuariosApi } from './api.js';

// registrarUsuario: POST /auth/registro
export async function registrarUsuario(datos) {
  try {
    await authApi.registro(datos);
    return { exito: true };
  } catch (err) {
    return { exito: false, mensaje: err.message };
  }
}

// obtenerUsuarios: GET /usuarios  (solo admin)
export async function obtenerUsuarios() {
  return usuariosApi.getAll();
}

// obtenerUsuarioPorId: GET /usuarios/:id
export async function obtenerUsuarioPorId(id) {
  if (!id) return null;
  return usuariosApi.getById(id);
}

// editarUsuario: PUT /usuarios/:id
export async function editarUsuario(id, datos) {
  return usuariosApi.update(id, datos);
}
