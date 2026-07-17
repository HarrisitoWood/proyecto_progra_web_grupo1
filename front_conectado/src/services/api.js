// ============================================================
// services/api.js
// Cliente central fetch → API REST
// Todas las llamadas HTTP pasan por aquí
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005';

// Función auxiliar: hace el fetch y lanza error si falla
async function peticion(ruta, opciones = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opciones.headers,
  };

  const respuesta = await fetch(`${BASE_URL}${ruta}`, { ...opciones, headers });

  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || `Error ${respuesta.status}`);
  }

  return respuesta.json();
}

// ── Auth ─────────────────────────────────────────────────────
export const authApi = {
  registro: (datos)        => peticion('/auth/registro', { method: 'POST', body: JSON.stringify(datos) }),
  login:    (credenciales) => peticion('/auth/login',    { method: 'POST', body: JSON.stringify(credenciales) }),
};

// ── Eventos ──────────────────────────────────────────────────
export const eventosApi = {
  getAll:   (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return peticion(`/eventos${query ? `?${query}` : ''}`);
  },
  getById:  (id)       => peticion(`/eventos/${id}`),
  create:   (datos)    => peticion('/eventos',      { method: 'POST',   body: JSON.stringify(datos) }),
  update:   (id, datos)=> peticion(`/eventos/${id}`,{ method: 'PUT',    body: JSON.stringify(datos) }),
  remove:   (id)       => peticion(`/eventos/${id}`,{ method: 'DELETE' }),
};

// ── Usuarios ─────────────────────────────────────────────────
export const usuariosApi = {
  getAll:  ()           => peticion('/usuarios'),
  getById: (id)         => peticion(`/usuarios/${id}`),
  update:  (id, datos)  => peticion(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),
};
