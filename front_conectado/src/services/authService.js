import { authApi } from './api.js';

export async function login(identificador, password) {
  const datos = await authApi.login({ identificador, password });
  localStorage.setItem('token',     datos.token);
  localStorage.setItem('rol',       datos.usuario.rol);
  localStorage.setItem('usuarioId', datos.usuario.id);
  localStorage.setItem('usuario',   JSON.stringify(datos.usuario));
  return datos.usuario.rol;  
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
