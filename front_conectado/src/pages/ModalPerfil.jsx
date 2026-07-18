import { useState } from 'react';
import styles from './modalPerfilStyles';
import IconoOjo from '../components/IconoOjo/IconoOjo';
import { CARRERAS } from '../data/mockData';
import { editarUsuario } from '../services/usuariosService';

const ModalPerfil = ({ usuario, onCerrar, onActualizar }) => {
  const [form,    setForm]    = useState({ nombre: usuario.nombre, carrera: usuario.carrera, password: '', confirmar: '' });
  const [errores, setErrores] = useState({});
  const [exito,   setExito]   = useState(false);
  const [verPass, setVerPass] = useState(false);

  const validar = () => {
    const e = {};
    if (!form.nombre.trim())                       e.nombre    = 'El nombre es obligatorio.';
    if (form.password && form.password.length < 6) e.password  = 'Mínimo 6 caracteres.';
    if (form.password !== form.confirmar)           e.confirmar = 'Las contraseñas no coinciden.';
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) return;
    const datos = { nombre: form.nombre, carrera: form.carrera };
    if (form.password) datos.password = form.password;
    const actualizado = await editarUsuario(usuario.id, datos);
    setExito(true);
    setTimeout(() => { onActualizar(actualizado); onCerrar(); }, 1600);
  };

  const inp  = (campo) => ({ ...styles.input,         ...(errores[campo] ? styles.inputError : {}) });
  const pass = (campo) => ({ ...styles.inputPassword,  ...(errores[campo] ? styles.inputError : {}) });

  return (
    <div style={styles.fondo} onClick={onCerrar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div style={styles.cabecera}>
          <h2 style={styles.titulo}>Mi Perfil</h2>
        </div>

        <div style={styles.cuerpo}>
          {exito && <div style={styles.exito}>Perfil actualizado correctamente.</div>}

          <div style={styles.grupo}>
            <label style={styles.label}>Nombre completo</label>
            <input type="text" style={inp('nombre')} value={form.nombre}
              onChange={(e) => { setForm((p) => ({ ...p, nombre: e.target.value })); setErrores((p) => ({ ...p, nombre: '' })); }} />
            {errores.nombre && <span style={styles.mensajeError}>{errores.nombre}</span>}
          </div>

          <div style={styles.grupo}>
            <label style={styles.label}>Carrera</label>
            <select style={styles.select} value={form.carrera}
              onChange={(e) => setForm((p) => ({ ...p, carrera: e.target.value }))}>
              {CARRERAS.filter((c) => c !== 'Todas las carreras').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={styles.grupo}>
            <label style={styles.label}>
              Nueva contraseña <span style={styles.labelAyuda}>(dejar vacío para no cambiar)</span>
            </label>
            <div style={styles.passwordWrapper}>
              <input type={verPass ? 'text' : 'password'} placeholder="Mínimo 6 caracteres"
                style={pass('password')} value={form.password}
                onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); setErrores((p) => ({ ...p, password: '' })); }} />
              <button type="button" style={styles.btnOjo} onClick={() => setVerPass((v) => !v)}>
                <IconoOjo visible={verPass} />
              </button>
            </div>
            {errores.password && <span style={styles.mensajeError}>{errores.password}</span>}
          </div>

          <div style={styles.grupo}>
            <label style={styles.label}>Confirmar contraseña</label>
            <input type="password" placeholder="Repite la contraseña"
              style={pass('confirmar')} value={form.confirmar}
              onChange={(e) => { setForm((p) => ({ ...p, confirmar: e.target.value })); setErrores((p) => ({ ...p, confirmar: '' })); }} />
            {errores.confirmar && <span style={styles.mensajeError}>{errores.confirmar}</span>}
          </div>
        </div>

        <div style={styles.footer}>
          <button style={styles.btnCancelar} onClick={onCerrar}>Cancelar</button>
          <button style={styles.btnGuardar}  onClick={handleGuardar}>Guardar cambios</button>
        </div>

      </div>
    </div>
  );
};

export default ModalPerfil;
