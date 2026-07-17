// ============================================================
// pages/Home.jsx  — sin cambios visuales
// Solo cambio: useEffect ahora es async para llamar al API
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './homeStyles';
import Navbar        from '../components/Navbar/Navbar';
import TarjetaEvento from '../components/TarjetaEvento/TarjetaEvento';
import ModalEvento   from '../components/ModalEvento/ModalEvento';
import ModalPerfil   from './ModalPerfil';
import { CARRERAS }  from '../data/mockData';
import { obtenerEventos } from '../services/eventosService';
import { obtenerUsuarioPorId } from '../services/usuariosService';
import { logout, getUsuarioId } from '../services/authService';

const Home = () => {
  const navigate = useNavigate();
  const [eventos,             setEventos]            = useState([]);
  const [busqueda,            setBusqueda]           = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('Todas las carreras');
  const [eventoSel,           setEventoSel]          = useState(null);
  const [usuarioActual,       setUsuarioActual]      = useState(null);
  const [mostrarPerfil,       setMostrarPerfil]      = useState(false);
  const [cargando,            setCargando]           = useState(true);

  // ← async para poder usar await dentro del useEffect
  useEffect(() => {
    if (localStorage.getItem('rol') !== 'usuario') { navigate('/'); return; }

    const cargarDatos = async () => {
      try {
        const [listaEventos, usuario] = await Promise.all([
          obtenerEventos(),
          obtenerUsuarioPorId(getUsuarioId()),
        ]);
        setEventos(listaEventos);
        setUsuarioActual(usuario);
      } catch (err) {
        console.error('Error al cargar datos:', err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const filtrar = (lista) =>
    lista.filter((ev) => {
      const porCarrera = carreraSeleccionada === 'Todas las carreras' || ev.carrera === carreraSeleccionada;
      const t = busqueda.toLowerCase();
      return porCarrera && (ev.titulo.toLowerCase().includes(t) || ev.descripcion.toLowerCase().includes(t));
    });

  const proximos  = filtrar(eventos.filter((e) => !e.pasado)).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const historial = filtrar(eventos.filter((e) => e.pasado)).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const accionesNav = [
    { label: 'Mi Perfil', activo: false, onClick: () => setMostrarPerfil(true) },
  ];

  return (
    <div style={styles.pagina}>
      <Navbar
        titulo="ULIMA EVENTOS"
        acciones={accionesNav}
        onLogout={handleLogout}
        onLogoClick={() => navigate('/paginaprincipal')}
      />

      <div style={styles.contenido}>
        <div style={styles.barraFiltros}>
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={styles.inputBusqueda}
          />
          <select
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
            style={styles.selectCarrera}
          >
            {CARRERAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {cargando ? (
          <p style={styles.sinResultados}>Cargando eventos...</p>
        ) : (
          <>
            <div style={styles.seccion}>
              <div style={styles.tituloSeccion}>Próximos Eventos</div>
              {proximos.length === 0
                ? <p style={styles.sinResultados}>No se encontraron eventos próximos.</p>
                : <div style={styles.grilla}>
                    {proximos.map((ev) => <TarjetaEvento key={ev.id} evento={ev} onClick={setEventoSel} />)}
                  </div>}
            </div>

            <div style={styles.seccion}>
              <div style={styles.tituloSeccion}>Historial de Eventos</div>
              {historial.length === 0
                ? <p style={styles.sinResultados}>No hay eventos anteriores.</p>
                : <div style={styles.grilla}>
                    {historial.map((ev) => <TarjetaEvento key={ev.id} evento={ev} onClick={setEventoSel} />)}
                  </div>}
            </div>
          </>
        )}
      </div>

      <ModalEvento evento={eventoSel} onCerrar={() => setEventoSel(null)} />

      {mostrarPerfil && usuarioActual && (
        <ModalPerfil
          usuario={usuarioActual}
          onCerrar={() => setMostrarPerfil(false)}
          onActualizar={setUsuarioActual}
        />
      )}
    </div>
  );
};

export default Home;
