// ============================================================
// src/repositories/evento.repository.js
// Única capa que sabe cómo acceder a la tabla "eventos"
// ============================================================

import { Op }    from 'sequelize';
import { Evento } from '../models/evento.model.js';

export const eventoRepository = {

  findAll() {
    return Evento.findAll({ order: [['fecha', 'ASC']] });
  },

  findProximos() {
    return Evento.findAll({ where: { pasado: false }, order: [['fecha', 'ASC']] });
  },

  findHistorial() {
    return Evento.findAll({ where: { pasado: true }, order: [['fecha', 'DESC']] });
  },

  findByCarrera(carrera) {
    return Evento.findAll({ where: { carrera }, order: [['fecha', 'ASC']] });
  },

  findByTexto(texto) {
    return Evento.findAll({
      where: {
        [Op.or]: [
          { titulo:      { [Op.iLike]: `%${texto}%` } },
          { descripcion: { [Op.iLike]: `%${texto}%` } },
        ],
      },
      order: [['fecha', 'ASC']],
    });
  },

  findById(id) {
    return Evento.findByPk(id);
  },

  create(datos) {
    return Evento.create(datos);
  },

  async update(id, cambios) {
    const evento = await Evento.findByPk(id);
    if (!evento) return undefined;
    return evento.update(cambios);
  },

  async remove(id) {
    const eliminados = await Evento.destroy({ where: { id } });
    return eliminados > 0;
  },

};
