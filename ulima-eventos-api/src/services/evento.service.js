// ============================================================
// src/services/evento.service.js
// Lógica de negocio de eventos
// Calcula el campo "pasado" automáticamente según la fecha
// ============================================================

import { eventoRepository } from '../repositories/evento.repository.js';

function calcularPasado(fechaISO) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return new Date(fechaISO + 'T00:00:00') < hoy;
}

function formatearFecha(fechaISO) {
  const [a, m, d] = fechaISO.split('-');
  return `${d}/${m}/${a}`;
}

export async function listarEventos(filtros = {}) {
  const { carrera, texto } = filtros;
  if (texto)                                       return eventoRepository.findByTexto(texto);
  if (carrera && carrera !== 'Todas las carreras') return eventoRepository.findByCarrera(carrera);
  return eventoRepository.findAll();
}

export async function listarEventosProximos() {
  const eventos = await eventoRepository.findAll();
  return eventos.filter(e => !e.pasado);
}

export async function listarEventosHistorial() {
  const eventos = await eventoRepository.findAll();
  return eventos.filter(e => e.pasado);
}

export async function obtenerEvento(id) {
  return eventoRepository.findById(id);
}

export async function crearEvento(datos) {
  const { titulo, descripcion, fecha, lugar, carrera, imagen, tipo, fechaTexto } = datos;

  if (!titulo || !descripcion || !fecha || !lugar) {
    return { exitoso: false, mensaje: 'Título, descripción, fecha y lugar son obligatorios.' };
  }

  const nuevo = await eventoRepository.create({
    titulo, descripcion, fecha, lugar,
    carrera:    carrera    || 'Todas las carreras',
    imagen:     imagen     || `https://picsum.photos/seed/ev${Date.now()}/600/340`,
    tipo:       tipo       || 'Charla',
    fechaTexto: fechaTexto || formatearFecha(fecha),
    pasado:     calcularPasado(fecha),
  });

  return { exitoso: true, evento: nuevo };
}

export async function editarEvento(id, datos) {
  const cambios = { ...datos };
  if (cambios.fecha) {
    cambios.pasado     = calcularPasado(cambios.fecha);
    cambios.fechaTexto = cambios.fechaTexto || formatearFecha(cambios.fecha);
  }
  const actualizado = await eventoRepository.update(id, cambios);
  if (!actualizado) return { exitoso: false, mensaje: 'Evento no encontrado.' };
  return { exitoso: true, evento: actualizado };
}

export async function eliminarEvento(id) {
  const eliminado = await eventoRepository.remove(id);
  if (!eliminado) return { exitoso: false, mensaje: 'Evento no encontrado.' };
  return { exitoso: true };
}
