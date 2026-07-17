// ============================================================
// src/repositories/usuario.repository.js
// Única capa que sabe cómo acceder a la tabla "usuarios"
// El controlador nunca toca Sequelize directamente
// ============================================================

import { Op }     from 'sequelize';
import { Usuario } from '../models/usuario.model.js';

export const usuarioRepository = {

  findAll() {
    return Usuario.findAll({ attributes: { exclude: ['password'] } });
  },

  findById(id) {
    return Usuario.findByPk(id, { attributes: { exclude: ['password'] } });
  },

  findByCorrco(correo) {
    return Usuario.findOne({ where: { correo } });
  },

  findByCodigo(codigo) {
    return Usuario.findOne({ where: { codigo } });
  },

  // Busca por correo O por código (para el login)
  findByCredencial(valor) {
    return Usuario.findOne({
      where: { [Op.or]: [{ correo: valor }, { codigo: valor }] },
    });
  },

  create(datos) {
    return Usuario.create(datos);
  },

  async update(id, cambios) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return undefined;
    return usuario.update(cambios);
  },

};
