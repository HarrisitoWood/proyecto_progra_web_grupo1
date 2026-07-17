// ============================================================
// pages/Login.jsx  — sin cambios visuales
// Solo cambio: handleSubmit ahora es async (login es async)
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/ulimaLogo.png';
import styles from './loginStyles';
import IconoOjo from '../components/IconoOjo/IconoOjo';
import { login } from '../services/authService';

const LoginUsuario = () => {
  const navigate = useNavigate();
  const [error,        setError]       = useState('');
  const [cargando,     setCargando]    = useState(false);
  const [verPassword,  setVerPassword] = useState(false);

  useEffect(() => {
    const rol = localStorage.getItem('rol');
    if (rol === 'admin')   navigate('/admin');
    else if (rol === 'usuario') navigate('/paginaprincipal');
  }, []);

  // ← async porque login() ahora llama al API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      const identificador = e.target.usuario.value.trim();
      const password      = e.target.password.value;
      const rol = await login(identificador, password);
      if (rol === 'admin')        navigate('/admin');
      else if (rol === 'usuario') navigate('/paginaprincipal');
    } catch (err) {
      setError(err.message || 'Usuario o contraseña incorrectos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="Logo Universidad de Lima" style={styles.logo} />
        <h1 style={styles.titulo}>Bienvenido a ULIMA Eventos</h1>

        <form onSubmit={handleSubmit}>
          <div style={styles.grupo}>
            <label style={styles.label}>Usuario</label>
            <input
              name="usuario" type="text"
              placeholder="Código universitario o correo"
              style={styles.input} required
              onChange={() => setError('')}
            />
          </div>

          <div style={styles.grupo}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passwordWrapper}>
              <input
                name="password"
                type={verPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                style={styles.inputPassword} required
                onChange={() => setError('')}
              />
              <button type="button" style={styles.btnOjo}
                onClick={() => setVerPassword((v) => !v)}>
                <IconoOjo visible={verPassword} />
              </button>
            </div>
          </div>

          {error && <div style={styles.mensajeError}>{error}</div>}

          <button type="submit" style={styles.boton} disabled={cargando}>
            {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <hr style={styles.separador} />
        <p style={styles.textoRegistro}>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" style={styles.linkRegistro}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginUsuario;
