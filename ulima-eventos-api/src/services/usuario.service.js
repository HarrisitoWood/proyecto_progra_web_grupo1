// ============================================================
// src/services/usuario.service.js
// Lógica de negocio de usuarios
// ============================================================

import bcrypt from 'bcryptjs';
import { usuarioRepository } from '../repositories/usuario.repository.js';

export async function listarUsuarios() {
  return usuarioRepository.findAll();
}

export async function obtenerUsuario(id) {
  return usuarioRepository.findById(id);
}

export async function editarUsuario(id, datos) {
  const { nombre, carrera, password } = datos;
  const cambios = {};
  if (nombre)  cambios.nombre  = nombre;
  if (carrera) cambios.carrera = carrera;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    cambios.password = await bcrypt.hash(password, salt);
  }
  const actualizado = await usuarioRepository.update(id, cambios);
  if (!actualizado) return { exitoso: false, mensaje: 'Usuario no encontrado.' };
  return { exitoso: true, usuario: actualizado };
}
