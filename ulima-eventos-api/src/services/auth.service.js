import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/usuario.repository.js';

const SECRETO = process.env.JWT_SECRET || 'ulima-secreto-2026';

function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, correo: usuario.correo, rol: usuario.rol, nombre: usuario.nombre },
    SECRETO,
    { expiresIn: '24h' }
  );
}

function sanitizar(usuario) {
  const { password, ...resto } = usuario.toJSON ? usuario.toJSON() : usuario;
  return resto;
}

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

export async function login({ identificador, password }) {
  if (!identificador || !password) {
    return { exitoso: false, mensaje: 'Usuario y contraseña son requeridos.' };
  }

  const usuario = await usuarioRepository.findByCredencial(identificador);
  if (!usuario) {
    return { exitoso: false, mensaje: 'Credenciales incorrectas.' };
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return { exitoso: false, mensaje: 'Credenciales incorrectas.' };
  }

  const token = generarToken(usuario);
  return { exitoso: true, token, usuario: sanitizar(usuario) };
}
