import styles from './adminStyles';
import { CARRERAS } from '../../data/mockData';

const TablaEventos = ({ eventos, busqueda, filtroCarrera, onBusquedaChange, onFiltroChange, onNuevo, onEditar, onEliminar }) => (
  <>
    <div style={styles.encabezado}>
      <h2 style={styles.tituloSeccion}>Gestión de Eventos</h2>
      <button style={styles.btnNuevo} onClick={onNuevo}>+ Nuevo Evento</button>
    </div>

    <div style={styles.barraFiltros}>
      <input
        type="text"
        placeholder="Buscar por título o descripción..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        style={styles.inputBusqueda}
      />
      <select value={filtroCarrera} onChange={(e) => onFiltroChange(e.target.value)}
        style={styles.selectFiltro}>
        {CARRERAS.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>

    <table style={styles.tabla}>
      <thead>
        <tr>
          <th style={styles.th}>Imagen</th>
          <th style={styles.th}>Título</th>
          <th style={styles.th}>Carrera</th>
          <th style={styles.th}>Fecha</th>
          <th style={styles.th}>Estado</th>
          <th style={styles.th}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {eventos.length === 0 ? (
          <tr><td colSpan={6} style={styles.sinResultados}>No se encontraron eventos.</td></tr>
        ) : eventos.map((ev) => (
          <tr key={ev.id}>
            <td style={styles.td}>
              <img src={ev.imagen} alt={ev.titulo} style={styles.imgTabla} />
            </td>
            <td style={styles.td}>
              <strong>{ev.titulo}</strong>
              <div style={styles.tipoEvento}>{ev.tipo}</div>
            </td>
            <td style={styles.td}>
              <span style={styles.badgeCarrera}>{ev.carrera}</span>
            </td>
            <td style={styles.tdFecha}>{ev.fecha}</td>
            <td style={styles.td}>
              {ev.pasado
                ? <span style={styles.badgeHistorial}>Historial</span>
                : <span style={styles.badgeProximo}>Próximo</span>}
            </td>
            <td style={styles.td}>
              <div style={styles.accionesFila}>
                <button style={styles.btnEditar}   onClick={() => onEditar(ev)}>Editar</button>
                <button style={styles.btnEliminar} onClick={() => onEliminar(ev)}>Eliminar</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default TablaEventos;
