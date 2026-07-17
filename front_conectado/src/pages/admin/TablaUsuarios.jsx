import styles from './adminStyles';
import { CARRERAS } from '../../data/mockData';

const iniciales = (nombre) => {
  const partes = nombre.split(' ');
  return partes.length >= 2 ? partes[0][0] + partes[1][0] : nombre.slice(0, 2).toUpperCase();
};

const TablaUsuarios = ({ usuarios, filtroCarrera, onFiltroChange }) => (
  <>
    <div style={styles.encabezado}>
      <h2 style={styles.tituloSeccion}>Usuarios Registrados</h2>
      <span style={styles.contadorUsuarios}>
        {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''}
      </span>
    </div>

    <div style={styles.filtroWrapper}>
      <select value={filtroCarrera} onChange={(e) => onFiltroChange(e.target.value)}
        style={styles.selectFiltro}>
        {CARRERAS.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>

    <table style={styles.tabla}>
      <thead>
        <tr>
          <th style={styles.th}>Usuario</th>
          <th style={styles.th}>Correo</th>
          <th style={styles.th}>Código</th>
          <th style={styles.th}>Carrera</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.length === 0 ? (
          <tr><td colSpan={4} style={styles.sinResultados}>No hay usuarios en esta carrera.</td></tr>
        ) : usuarios.map((u) => (
          <tr key={u.id}>
            <td style={styles.td}>
              <div style={styles.filaUsuario}>
                <div style={styles.avatarUsuario}>{iniciales(u.nombre)}</div>
                <span style={styles.nombreUsuario}>{u.nombre}</span>
              </div>
            </td>
            <td style={styles.tdCorreo}>{u.correo}</td>
            <td style={styles.td}>{u.codigo}</td>
            <td style={styles.td}><span style={styles.badgeCarrera}>{u.carrera}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default TablaUsuarios;
