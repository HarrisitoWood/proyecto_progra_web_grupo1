// ============================================================
// services/eventosService.js
// Reemplaza localStorage por llamadas al API
// Los nombres de funciones son IDÉNTICOS al original
// Ahora todas son async (el API es asíncrono)
// ============================================================

import { eventosApi } from './api.js';

// obtenerEventos: GET /eventos
export async function obtenerEventos(params = {}) {
  return eventosApi.getAll(params);
}

// crearEvento: POST /eventos
export async function crearEvento(datos) {
  return eventosApi.create(datos);
}

// editarEvento: PUT /eventos/:id
// Retorna la lista actualizada (igual que antes)
export async function editarEvento(id, datos) {
  await eventosApi.update(id, datos);
  return obtenerEventos(); // recarga la lista completa
}

// eliminarEvento: DELETE /eventos/:id
// Retorna la lista actualizada (igual que antes)
export async function eliminarEvento(id) {
  await eventosApi.remove(id);
  return obtenerEventos(); // recarga la lista completa
}
