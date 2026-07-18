import { eventosApi } from './api.js';

export async function obtenerEventos(params = {}) {
  return eventosApi.getAll(params);
}

export async function crearEvento(datos) {
  return eventosApi.create(datos);
}

export async function editarEvento(id, datos) {
  await eventosApi.update(id, datos);
  return obtenerEventos();
}

export async function eliminarEvento(id) {
  await eventosApi.remove(id);
  return obtenerEventos(); 
}
