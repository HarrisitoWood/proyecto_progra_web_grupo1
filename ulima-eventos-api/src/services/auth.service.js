// ============================================================
// src/services/auth.service.js
// Lógica de negocio de autenticación
// El profe pone aquí bcrypt y JWT porque requieren más de un paso
// y se escapan de lo que normalmente va en un repositorio
// ============================================================

import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/usuario.repository.js';

const SECRETO = process.env.JWT_SECRET || 'ulima-secreto-2026';

// Genera el token JWT con los datos del usuario
function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, correo: usuario.correo, rol: usuario.rol, nombre: usuario.nombre },
    SECRETO,
    { expiresIn: '24h' }
  );
}

// Elimina el password del objeto antes de enviarlo al cliente
function sanitizar(usuario) {
  const { password, ...resto } = usuario.toJSON ? usuario.toJSON() : usuario;
  return resto;
}

// Registrar un nuevo usuario
export async function registrar({ nombre, correo, codigo, carrera, password }) {
  if (!nombre || !correo || !codigo || !carrera || !password) {
    return { exitoso: false, mensaje: 'Todos los campos son obligatorios.' };
  }

  const existe = await usuarioRepository.findByCorrco(correo);
  if (existe) {
    return { exitoso: false, mensaje: 'Este correo ya está registrado.' };
  }

  const existeCodigo = await usuarioRepository.findByCodigo(codigo);
  if (existeCodigo) {
    return { exitoso: false, mensaje: 'Este código universitario ya está registrado.' };
  }

  // bcrypt: salt + hash (como muestra el profe en clase)
  const salt           = await bcrypt.genSalt(10);
  const passwordHash   = await bcrypt.hash(password, salt);

  const nuevoUsuario = await usuarioRepository.create({
    nombre, correo, codigo, carrera,
    password: passwordHash,
    rol: 'usuario',
  });

  const token = generarToken(nuevoUsuario);
  return { exitoso: true, token, usuario: sanitizar(nuevoUsuario) };
}

// Login de usuario o admin
export async function login({ identificador, password }) {
  if (!identificador || !password) {
    return { exitoso: false, mensaje: 'Usuario y contraseña son requeridos.' };
  }

  // Busca por correo o código universitario
  const usuario = await usuarioRepository.findByCredencial(identificador);
  if (!usuario) {
    return { exitoso: false, mensaje: 'Credenciales incorrectas.' };
  }

  // bcrypt.compare: compara sin desencriptar (como muestra el profe)
  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return { exitoso: false, mensaje: 'Credenciales incorrectas.' };
  }

  const token = generarToken(usuario);
  return { exitoso: true, token, usuario: sanitizar(usuario) };
}
