# ULIMA Eventos — Ev06 Segunda Entrega
## Programación Web 2026-1 | Grupo 01 | Sección 652

**Integrantes:**
- Erazo Mena, Cristian (20220884) — Admin y Diseño
- Muñoz Díaz, Sebastián Mateo (20236497) — Autenticación y Usuarios
- Henry Felix Octavian Wood Vargas (20246222) — Eventos y Filtros

---

## Arquitectura

```
ulima-eventos-api/      ← Backend Express + Sequelize + PostgreSQL
front_conectado/        ← Frontend React + Vite (tu front original conectado)
```

---

## Cómo ejecutar localmente

### Paso 1 — Crear base de datos en Neon (gratis)
1. Crear cuenta en https://neon.tech
2. Crear proyecto → copiar host, usuario, contraseña y nombre de BD

### Paso 2 — Backend
```bash
cd ulima-eventos-api
npm install
cp .env.example .env
# Editar .env con tus credenciales de Neon
npm run dev
```

### Paso 3 — Cargar datos iniciales (solo la primera vez)
```bash
node src/seeders/seed.js
```

### Paso 4 — Frontend
```bash
cd front_conectado
npm install
# Crear archivo .env con:
# VITE_API_URL=http://localhost:3005
npm run dev
```

---

## Credenciales de prueba

| Rol           | Identificador              | Contraseña  |
|---------------|----------------------------|-------------|
| Administrador | admin@ulima.edu.pe         | admin123    |
| Estudiante    | 20210345                   | andrea123   |
| Estudiante    | carlos.mendoza@aloe...     | carlos123   |

---

## Endpoints del API

| Verbo  | Ruta                  | Descripción                    | Auth      |
|--------|-----------------------|--------------------------------|-----------|
| POST   | /auth/registro        | Registro de estudiante         | Público   |
| POST   | /auth/login           | Login → devuelve JWT           | Público   |
| GET    | /eventos              | Todos los eventos (con filtros)| Público   |
| GET    | /eventos/proximos     | Solo eventos próximos          | Público   |
| GET    | /eventos/historial    | Solo eventos pasados           | Público   |
| GET    | /eventos/:id          | Detalle de un evento           | Público   |
| POST   | /eventos              | Crear evento                   | Admin JWT |
| PUT    | /eventos/:id          | Editar evento                  | Admin JWT |
| DELETE | /eventos/:id          | Eliminar evento                | Admin JWT |
| GET    | /usuarios             | Listar usuarios                | Admin JWT |
| GET    | /usuarios/:id         | Ver un usuario                 | JWT       |
| PUT    | /usuarios/:id         | Editar perfil                  | JWT       |

---

## Despliegue en la nube

**Base de datos:** Neon (neon.tech) — PostgreSQL gratuito
**Backend:** Railway (railway.app) — agregar variables del .env
**Frontend:** Vercel (vercel.com) — agregar VITE_API_URL con la URL de Railway

---

## División de trabajo

### Sebastián — Autenticación y Usuarios (HU-01 al HU-04)
**Backend:** usuario.model, usuario.repository, auth.controller, usuario.controller, auth.routes, usuario.routes, auth.middleware
**Frontend:** authService.js, usuariosService.js, Login.jsx, Registro.jsx, ModalPerfil.jsx

### Henry — Eventos y Filtros (HU-05 al HU-09)
**Backend:** evento.model, evento.repository, evento.controller (GETs)
**Frontend:** api.js, eventosService.js, Home.jsx

### Cristian — Admin y Diseño (HU-10 al HU-15)
**Backend:** index.js, app.js, database.js, models/index.js, evento.controller (POST/PUT/DELETE), rutas protegidas, seed.js
**Frontend:** AdminDashboard.jsx, TablaEventos.jsx, TablaUsuarios.jsx, FormularioEvento.jsx, ConfirmacionEliminar.jsx
