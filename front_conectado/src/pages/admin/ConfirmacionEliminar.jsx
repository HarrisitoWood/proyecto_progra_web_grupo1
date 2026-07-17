import styles from './confirmacionStyles';

const ConfirmacionEliminar = ({ titulo, onConfirmar, onCancelar }) => (
  <div style={styles.fondo}>
    <div style={styles.caja}>
      <div style={styles.icono}>⚠️</div>
      <div style={styles.titulo}>¿Estás seguro?</div>
      <p style={styles.mensaje}>
        ¿Deseas eliminar el evento <strong>"{titulo}"</strong>?
        Esta acción no se puede deshacer.
      </p>
      <div style={styles.acciones}>
        <button style={styles.btnCancelar} onClick={onCancelar}>Cancelar</button>
        <button style={styles.btnEliminar} onClick={onConfirmar}>Sí, eliminar</button>
      </div>
    </div>
  </div>
);

export default ConfirmacionEliminar;
