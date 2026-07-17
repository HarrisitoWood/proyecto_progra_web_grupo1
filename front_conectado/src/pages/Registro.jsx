// ============================================================
// pages/Registro.jsx  — sin cambios visuales
// Solo cambio: handleSubmit ahora es async (registrarUsuario es async)
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/ulimaLogo.png';
import styles from './registroStyles';
import IconoOjo from '../components/IconoOjo/IconoOjo';
import { CARRERAS } from '../data/mockData';
import { registrarUsuario } from '../services/usuariosService';

const Registro = () => {
  const navigate = useNavigate();
  const [errores,  setErrores] = useState({});
  const [exitoso,  setExitoso] = useState(false);
  const [cargando, setCargando]= useState(false);
  const [verPass,  setVerPass] = useState(false);
  const [verConf,  setVerConf] = useState(false);

  const validar = (datos) => {
    const e = {};
    if (!datos.nombre.trim())        e.nombre    = 'El nombre es obligatorio.';
    if (!datos.correo.includes('@'))  e.correo    = 'Ingresa un correo válido.';
    if (!datos.codigo.trim())         e.codigo    = 'El código universitario es obligatorio.';
    if (!datos.carrera)               e.carrera   = 'Selecciona una carrera.';
    if (datos.password.length < 6)    e.password  = 'Mínimo 6 caracteres.';
    if (datos.password !== datos.confirmar) e.confirmar = 'Las contraseñas no coinciden.';
    return e;
  };

  // ← async porque registrarUsuario() ahora llama al API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      nombre:    e.target.nombre.value,
      correo:    e.target.correo.value,
      codigo:    e.target.codigo.value,
      carrera:   e.target.carrera.value,
      password:  e.target.password.value,
      confirmar: e.target.confirmar.value,
    };

    const nuevosErrores = validar(datos);
    if (Object.keys(nuevosErrores).length > 0) { setErrores(nuevosErrores); return; }

    setCargando(true);
    const resultado = await registrarUsuario({
      nombre: datos.nombre, correo: datos.correo,
      codigo: datos.codigo, carrera: datos.carrera, password: datos.password,
    });
    setCargando(false);

    if (!resultado.exito) { setErrores({ correo: resultado.mensaje }); return; }

    setExitoso(true);
    setTimeout(() => navigate('/'), 2500);
  };

  const inp  = (campo) => ({ ...styles.input,         ...(errores[campo] ? styles.inputError : {}) });
  const pass = (campo) => ({ ...styles.inputPassword,  ...(errores[campo] ? styles.inputError : {}) });

  if (exitoso) return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="Logo Ulima" style={styles.logo} />
        <div style={styles.exito}>¡Registro exitoso! Redirigiendo al inicio de sesión...</div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="Logo Universidad de Lima" style={styles.logo} />
        <h1 style={styles.titulo}>Crear cuenta de estudiante</h1>

        <form onSubmit={handleSubmit}>
          <div style={styles.grupo}>
            <label style={styles.label}>Nombre completo</label>
            <input name="nombre" type="text" placeholder="Tu nombre completo" style={inp('nombre')}
              onChange={() => setErrores((p) => ({ ...p, nombre: '' }))} />
            {errores.nombre && <span style={styles.mensajeError}>{errores.nombre}</span>}
          </div>

          <div style={styles.grupo}>
            <label style={styles.label}>Correo universitario</label>
            <input name="correo" type="email" placeholder="tu.nombre@aloe.ulima.edu.pe" style={inp('correo')}
              onChange={() => setErrores((p) => ({ ...p, correo: '' }))} />
            {errores.correo && <span style={styles.mensajeError}>{errores.correo}</span>}
          </div>

          <div style={styles.dosColumnas}>
            <div>
              <label style={styles.label}>Código universitario</label>
              <input name="codigo" type="text" placeholder="20XXXXXX" style={inp('codigo')}
                onChange={() => setErrores((p) => ({ ...p, codigo: '' }))} />
              {errores.codigo && <span style={styles.mensajeError}>{errores.codigo}</span>}
            </div>
            <div>
              <label style={styles.label}>Carrera</label>
              <select name="carrera" style={{ ...styles.select, ...(errores.carrera ? styles.inputError : {}) }}
                onChange={() => setErrores((p) => ({ ...p, carrera: '' }))}>
                <option value="">Selecciona</option>
                {CARRERAS.filter((c) => c !== 'Todas las carreras').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errores.carrera && <span style={styles.mensajeError}>{errores.carrera}</span>}
            </div>
          </div>

          <div style={styles.grupo}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passwordWrapper}>
              <input name="password" type={verPass ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres" style={pass('password')}
                onChange={() => setErrores((p) => ({ ...p, password: '' }))} />
              <button type="button" style={styles.btnOjo} onClick={() => setVerPass((v) => !v)}>
                <IconoOjo visible={verPass} />
              </button>
            </div>
            {errores.password && <span style={styles.mensajeError}>{errores.password}</span>}
          </div>

          <div style={styles.grupo}>
            <label style={styles.label}>Confirmar contraseña</label>
            <div style={styles.passwordWrapper}>
              <input name="confirmar" type={verConf ? 'text' : 'password'}
                placeholder="Repite tu contraseña" style={pass('confirmar')}
                onChange={() => setErrores((p) => ({ ...p, confirmar: '' }))} />
              <button type="button" style={styles.btnOjo} onClick={() => setVerConf((v) => !v)}>
                <IconoOjo visible={verConf} />
              </button>
            </div>
            {errores.confirmar && <span style={styles.mensajeError}>{errores.confirmar}</span>}
          </div>

          <button type="submit" style={styles.boton} disabled={cargando}>
            {cargando ? 'Registrando...' : 'Crear mi cuenta'}
          </button>
        </form>

        <Link to="/" style={styles.linkVolver}>
          ¿Ya tienes cuenta? <span style={styles.linkNaranja}>Inicia sesión aquí</span>
        </Link>
      </div>
    </div>
  );
};

export default Registro;
