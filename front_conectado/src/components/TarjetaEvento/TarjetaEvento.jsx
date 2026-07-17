import { useState } from 'react';
import styles from './styles';

const TarjetaEvento = ({ evento, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.tarjeta,
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.13)' : '0 2px 10px rgba(0,0,0,0.07)',
        transform:  hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onClick={() => onClick(evento)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={evento.imagen} alt={evento.titulo} style={styles.imagen} />
      <div style={styles.cuerpo}>
        <span style={styles.carrera}>{evento.carrera}</span>
        <div style={styles.titulo}>{evento.titulo}</div>
        <div style={styles.fecha}>{evento.fechaTexto || evento.fecha}</div>
        <div style={styles.descripcion}>{evento.descripcion}</div>
        <span style={styles.pie}>{evento.tipo}</span>
      </div>
    </div>
  );
};

export default TarjetaEvento;
