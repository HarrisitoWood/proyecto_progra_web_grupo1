import { useState, useEffect } from 'react';
import { useNavigate }         from 'react-router-dom';
import styles                  from './adminStyles';
import Navbar                  from '../../components/Navbar/Navbar';
import FormularioEvento        from './FormularioEvento';
import ConfirmacionEliminar    from './ConfirmacionEliminar';
import TablaEventos            from './TablaEventos';
import TablaUsuarios           from './TablaUsuarios';
import { obtenerEventos, crearEvento, editarEvento, eliminarEvento } from '../../services/eventosService';
import { obtenerUsuarios }     from '../../services/usuariosService';
import { logout }              from '../../services/authService';

const SECCIONES = { EVENTOS: 'eventos', USUARIOS: 'usuarios' };

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [seccion,       setSeccion]      = useState(SECCIONES.EVENTOS);
  const [eventos,       setEventos]      = useState([]);
  const [usuarios,      setUsuarios]     = useState([]);
  const [busqueda,      setBusqueda]     = useState('');
  const [filtroEv,      setFiltroEv]     = useState('Todas las carreras');
  const [filtroUs,      setFiltroUs]     = useState('Todas las carreras');
  const [mostrarForm,   setMostrarForm]  = useState(false);
  const [eventoEditar,  setEventoEditar] = useState(null);
  const [eventoElim,    setEventoElim]   = useState(null);
  const [toast,         setToast]        = useState('');

  useEffect(() => {
    if (localStorage.getItem('rol') !== 'admin') { navigate('/'); return; }

    const cargarDatos = async () => {
      try {
        const [listaEventos, listaUsuarios] = await Promise.all([
          obtenerEventos(),
          obtenerUsuarios(),
        ]);
        setEventos(listaEventos);
        setUsuarios(listaUsuarios);
      } catch (err) {
        console.error('Error al cargar datos admin:', err.message);
      }
    };

    cargarDatos();
  }, []);

  const mostrarToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCrear = async (datos) => {
    try {
      const nuevo = await crearEvento(datos);
      setEventos((p) => [...p, nuevo]);
      setMostrarForm(false);
      mostrarToast('Evento creado exitosamente.');
    } catch (err) {
      mostrarToast(`Error: ${err.message}`);
    }
  };

  const handleEditar = async (datos) => {
    try {
      const lista = await editarEvento(eventoEditar.id, datos);
      setEventos(lista);
      setEventoEditar(null);
      setMostrarForm(false);
      mostrarToast('Evento actualizado correctamente.');
    } catch (err) {
      mostrarToast(`Error: ${err.message}`);
    }
  };

  const handleEliminar = async () => {
    try {
      const lista = await eliminarEvento(eventoElim.id);
      setEventos(lista);
      setEventoElim(null);
      mostrarToast('Evento eliminado.');
    } catch (err) {
      mostrarToast(`Error: ${err.message}`);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const eventosFiltrados = eventos.filter((e) => {
    const porCarrera = filtroEv === 'Todas las carreras' || e.carrera === filtroEv;
    const t = busqueda.toLowerCase();
    return porCarrera && (e.titulo.toLowerCase().includes(t) || e.descripcion.toLowerCase().includes(t));
  });

  const usuariosFiltrados = usuarios.filter(
    (u) => filtroUs === 'Todas las carreras' || u.carrera === filtroUs
  );

  const accionesNav = [
    { label: 'Eventos',  activo: seccion === SECCIONES.EVENTOS,  onClick: () => setSeccion(SECCIONES.EVENTOS) },
    { label: 'Usuarios', activo: seccion === SECCIONES.USUARIOS, onClick: () => setSeccion(SECCIONES.USUARIOS) },
  ];

  return (
    <div style={styles.pagina}>
      <Navbar titulo="ULIMA ADMIN" badge="PANEL" acciones={accionesNav} onLogout={handleLogout} />

      <div style={styles.contenido}>
        <div style={styles.statsGrid}>
          {[
            { num: eventos.length,                           label: 'Total eventos' },
            { num: eventos.filter((e) => !e.pasado).length, label: 'Próximos'      },
            { num: eventos.filter((e) => e.pasado).length,  label: 'En historial'  },
            { num: usuarios.length,                          label: 'Usuarios'      },
          ].map((st) => (
            <div key={st.label} style={styles.statCard}>
              <div style={styles.statNumero}>{st.num}</div>
              <div style={styles.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>

        {seccion === SECCIONES.EVENTOS && (
          <TablaEventos
            eventos={eventosFiltrados}
            busqueda={busqueda}
            filtroCarrera={filtroEv}
            onBusquedaChange={setBusqueda}
            onFiltroChange={setFiltroEv}
            onNuevo={() => { setEventoEditar(null); setMostrarForm(true); }}
            onEditar={(ev) => { setEventoEditar(ev); setMostrarForm(true); }}
            onEliminar={setEventoElim}
          />
        )}

        {seccion === SECCIONES.USUARIOS && (
          <TablaUsuarios
            usuarios={usuariosFiltrados}
            filtroCarrera={filtroUs}
            onFiltroChange={setFiltroUs}
          />
        )}
      </div>

      {mostrarForm && (
        <FormularioEvento
          eventoInicial={eventoEditar}
          onGuardar={eventoEditar ? handleEditar : handleCrear}
          onCancelar={() => { setMostrarForm(false); setEventoEditar(null); }}
        />
      )}

      {eventoElim && (
        <ConfirmacionEliminar
          titulo={eventoElim.titulo}
          onConfirmar={handleEliminar}
          onCancelar={() => setEventoElim(null)}
        />
      )}

      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
};

export default AdminDashboard;
