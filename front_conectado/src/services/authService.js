// ============================================================
// services/authService.js
// Reemplaza la versión de localStorage por llamadas al API
// Los nombres de funciones son IDÉNTICOS al original
// ============================================================

import { authApi } from './api.js';

// login: ahora llama POST /auth/login
// Retorna 'admin' | 'usuario' | null  (mismo contrato que antes)
export async function login(identificador, password) {
  const datos = await authApi.login({ identificador, password });
  // Guarda token y sesión exactamente como antes usaba localStorage
  localStorage.setItem('token',     datos.token);
  localStorage.setItem('rol',       datos.usuario.rol);
  localStorage.setItem('usuarioId', datos.usuario.id);
  localStorage.setItem('usuario',   JSON.stringify(datos.usuario));
  return datos.usuario.rol;  // 'admin' | 'usuario'
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('usuarioId');
  localStorage.removeItem('usuario');
}

export function getRol() {
  return localStorage.getItem('rol');
}

export function getUsuarioId() {
  return parseInt(localStorage.getItem('usuarioId'));
}
