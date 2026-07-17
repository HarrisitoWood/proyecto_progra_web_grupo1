import styles from './styles';

const ModalEvento = ({ evento, onCerrar }) => {
  if (!evento) return null;

  return (
    <div style={styles.fondo} onClick={onCerrar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img src={evento.imagen} alt={evento.titulo} style={styles.imagen} />
        <div style={styles.cuerpo}>
          <span style={styles.carrera}>{evento.carrera}</span>
          <div style={styles.titulo}>{evento.titulo}</div>
          <div style={styles.bannerFecha}>{evento.fechaTexto || evento.fecha}</div>
          <div style={styles.bannerLugar}>{evento.lugar}</div>
          <p style={styles.descripcion}>{evento.descripcion}</p>
          <button style={styles.btnCerrar} onClick={onCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEvento;
