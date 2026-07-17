import { useState } from 'react';
import styles from './formularioStyles';
import { CARRERAS, TIPOS_EVENTO } from '../../data/mockData';

const FORM_VACIO = {
  titulo: '', descripcion: '', fecha: '',
  carrera: 'Ingeniería de Sistemas', imagen: '',
  tipo: 'Charla', lugar: '',
};

const FormularioEvento = ({ eventoInicial, onGuardar, onCancelar }) => {
  const [form,         setForm]         = useState(eventoInicial || FORM_VACIO);
  const [errores,      setErrores]      = useState({});
  const [modoImg,      setModoImg]      = useState('url');
  const [previewLocal, setPreviewLocal] = useState(null);

  const esEdicion = !!eventoInicial;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errores[name]) setErrores((p) => ({ ...p, [name]: '' }));
  };

  const handleArchivo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewLocal(ev.target.result);
      setForm((p) => ({ ...p, imagen: ev.target.result }));
    };
    reader.readAsDataURL(archivo);
  };

  const validar = () => {
    const e = {};
    if (!form.titulo.trim())      e.titulo      = 'El título es obligatorio.';
    if (!form.descripcion.trim()) e.descripcion = 'La descripción es obligatoria.';
    if (!form.fecha)              e.fecha       = 'La fecha es obligatoria.';
    if (!form.lugar.trim())       e.lugar       = 'El lugar es obligatorio.';
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onGuardar(form);
  };

  const tabBtnStyle = (activo) => ({
    ...styles.tabBtn,
    ...(activo ? styles.tabBtnActivo : {}),
  });

  const inp = (campo) => ({ ...styles.input, ...(errores[campo] ? styles.inputError : {}) });
  const imagenPreview = previewLocal || form.imagen;

  return (
    <div style={styles.fondo} onClick={onCancelar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div style={styles.cabecera}>
          <h2 style={styles.titulo}>{esEdicion ? 'Editar Evento' : 'Nuevo Evento'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.cuerpo}>

            <div style={styles.grupo}>
              <label style={styles.label}>Título del evento *</label>
              <input name="titulo" type="text" value={form.titulo} onChange={handleChange}
                placeholder="Ej: Hackathon Ulima 2026" style={inp('titulo')} />
              {errores.titulo && <span style={styles.mensajeError}>{errores.titulo}</span>}
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>Descripción *</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
                placeholder="Describe el evento..."
                style={{ ...styles.textarea, ...(errores.descripcion ? styles.inputError : {}) }} />
              {errores.descripcion && <span style={styles.mensajeError}>{errores.descripcion}</span>}
            </div>

            <div style={styles.dosColumnas}>
              <div>
                <label style={styles.label}>Fecha *</label>
                <input name="fecha" type="date" value={form.fecha} onChange={handleChange}
                  style={inp('fecha')} />
                {errores.fecha && <span style={styles.mensajeError}>{errores.fecha}</span>}
              </div>
              <div>
                <label style={styles.label}>Tipo de evento</label>
                <select name="tipo" value={form.tipo} onChange={handleChange} style={styles.select}>
                  {TIPOS_EVENTO.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={styles.infoPasado}>
              El estado (próximo / historial) se determina automáticamente por la fecha ingresada.
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>Carrera relacionada</label>
              <select name="carrera" value={form.carrera} onChange={handleChange} style={styles.select}>
                {CARRERAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>Lugar *</label>
              <input name="lugar" type="text" value={form.lugar} onChange={handleChange}
                placeholder="Ej: Auditorio C1, Universidad de Lima" style={inp('lugar')} />
              {errores.lugar && <span style={styles.mensajeError}>{errores.lugar}</span>}
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>
                Imagen <span style={styles.labelAyuda}>(opcional — se genera automáticamente)</span>
              </label>
              <div style={styles.tabsImagen}>
                <button type="button" style={tabBtnStyle(modoImg === 'url')}
                  onClick={() => { setModoImg('url'); setPreviewLocal(null); }}>URL</button>
                <button type="button" style={tabBtnStyle(modoImg === 'archivo')}
                  onClick={() => setModoImg('archivo')}>Subir archivo</button>
              </div>
              {modoImg === 'url' && (
                <input name="imagen" type="text" value={previewLocal ? '' : form.imagen}
                  onChange={handleChange} placeholder="https://..." style={styles.input} />
              )}
              {modoImg === 'archivo' && (
                <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleArchivo} style={styles.inputArchivo} />
              )}
              {imagenPreview && (
                <img src={imagenPreview} alt="Vista previa" style={styles.previewImagen}
                  onError={(e) => { e.target.style.display = 'none'; }} />
              )}
            </div>

          </div>

          <div style={styles.footer}>
            <button type="button" style={styles.btnCancelar} onClick={onCancelar}>Cancelar</button>
            <button type="submit" style={styles.btnGuardar}>
              {esEdicion ? 'Guardar cambios' : 'Crear evento'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default FormularioEvento;
