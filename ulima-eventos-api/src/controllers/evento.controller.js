import {
  listarEventos, listarEventosProximos, listarEventosHistorial, obtenerEvento,
  crearEvento, editarEvento, eliminarEvento,
} from '../services/evento.service.js';

export async function getEventos(req, res) {
  try {
    const eventos = await listarEventos(req.query);
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function getEventosProximos(req, res) {
  try {
    const eventos = await listarEventosProximos();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function getEventosHistorial(req, res) {
  try {
    const eventos = await listarEventosHistorial();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function getEventoById(req, res) {
  try {
    const evento = await obtenerEvento(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado.' });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function createEvento(req, res) {
  try {
    const resultado = await crearEvento(req.body);
    if (!resultado.exitoso) return res.status(400).json({ error: resultado.mensaje });
    res.status(201).json(resultado.evento);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function updateEvento(req, res) {
  try {
    const resultado = await editarEvento(req.params.id, req.body);
    if (!resultado.exitoso) return res.status(404).json({ error: resultado.mensaje });
    res.json(resultado.evento);
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}

export async function deleteEvento(req, res) {
  try {
    const resultado = await eliminarEvento(req.params.id);
    if (!resultado.exitoso) return res.status(404).json({ error: resultado.mensaje });
    res.json({ mensaje: 'Evento eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error inesperado.', detalle: error.message });
  }
}
