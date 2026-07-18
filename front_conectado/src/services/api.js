const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005';

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

export const authApi = {
  registro: (datos)        => peticion('/auth/registro', { method: 'POST', body: JSON.stringify(datos) }),
  login:    (credenciales) => peticion('/auth/login',    { method: 'POST', body: JSON.stringify(credenciales) }),
};

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

export const usuariosApi = {
  getAll:  ()           => peticion('/usuarios'),
  getById: (id)         => peticion(`/usuarios/${id}`),
  update:  (id, datos)  => peticion(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),
};
