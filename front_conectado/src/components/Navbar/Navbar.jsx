import logo from '../../assets/ulimaLogo.png';
import styles from './styles';

const Navbar = ({ titulo = 'ULIMA EVENTOS', badge, acciones = [], onLogout, onLogoClick }) => {
  const [primera, ...resto] = titulo.split(' ');

  return (
    <nav style={styles.nav}>
      <div style={styles.izquierda} onClick={onLogoClick} title="Ir al inicio">
        <img src={logo} alt="Logo Ulima" style={styles.logo} />
        <span style={styles.titulo}>
          {primera} <span style={styles.naranja}>{resto.join(' ')}</span>
        </span>
        {badge && <span style={styles.badge}>{badge}</span>}
      </div>

      <div style={styles.derecha}>
        {acciones.map((accion) => (
          <button
            key={accion.label}
            style={{ ...styles.btn, ...(accion.activo ? styles.btnActivo : {}) }}
            onClick={accion.onClick}
          >
            {accion.label}
          </button>
        ))}
        <button style={styles.btnLogout} onClick={onLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
