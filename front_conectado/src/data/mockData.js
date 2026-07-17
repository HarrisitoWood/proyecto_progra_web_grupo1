export const CARRERAS = [
  'Todas las carreras',
  'Ingeniería de Sistemas',
  'Economía',
  'Comunicaciones',
  'Derecho',
  'Administración',
  'Psicología',
  'Contabilidad',
];

export const TIPOS_EVENTO = [
  'Charla', 'Taller', 'Foro', 'Competencia', 'Feria',
  'Conversatorio', 'Exposición', 'Presentación', 'Simulacro', 'Otro',
];

export const ADMIN_CREDENCIALES = {
  usuario: 'admin@ulima.edu.pe',
  password: 'admin123',
};

export const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Andrea Quispe Torres',  correo: 'andrea.quispe@aloe.ulima.edu.pe',    codigo: '20210345', carrera: 'Ingeniería de Sistemas', password: 'andrea123'  },
  { id: 2, nombre: 'Carlos Mendoza Ríos',   correo: 'carlos.mendoza@aloe.ulima.edu.pe',   codigo: '20200789', carrera: 'Economía',                password: 'carlos123'  },
  { id: 3, nombre: 'Lucía Fernández Vega',  correo: 'lucia.fernandez@aloe.ulima.edu.pe',  codigo: '20220112', carrera: 'Comunicaciones',          password: 'lucia123'   },
  { id: 4, nombre: 'Diego Huamán Paredes',  correo: 'diego.huaman@aloe.ulima.edu.pe',     codigo: '20190456', carrera: 'Derecho',                 password: 'diego123'   },
  { id: 5, nombre: 'Valeria Soto Cáceres',  correo: 'valeria.soto@aloe.ulima.edu.pe',     codigo: '20210678', carrera: 'Administración',          password: 'valeria123' },
  { id: 6, nombre: 'Rodrigo Castillo Lara', correo: 'rodrigo.castillo@aloe.ulima.edu.pe', codigo: '20220890', carrera: 'Ingeniería de Sistemas',  password: 'rodrigo123' },
];

export const EVENTOS_INICIALES = [
  { id: 1,  titulo: 'Hackathon Ulima 2026: Soluciones con IA',        fecha: '2026-06-20', fechaTexto: 'Sábado 20 de junio de 2026 | De 08.00 a 20.00 horas',    descripcion: 'Participa en el hackathon anual donde equipos de estudiantes desarrollarán soluciones tecnológicas aplicando IA a problemas reales del sector público y privado peruano.',          lugar: 'Universidad de Lima, Laboratorios de Cómputo C3', carrera: 'Ingeniería de Sistemas', imagen: 'https://picsum.photos/seed/hack2026/600/340',    tipo: 'Competencia',    pasado: false },
  { id: 2,  titulo: 'Charla: Ciberseguridad en la Era del Cloud',     fecha: '2026-07-03', fechaTexto: 'Jueves 3 de julio de 2026 | De 17.00 a 19.00 horas',      descripcion: 'El ingeniero Marco Delgado expondrá sobre los principales vectores de ataque en entornos de nube y las mejores prácticas de defensa para sistemas distribuidos.',             lugar: 'Universidad de Lima, Auditorio C1',                carrera: 'Ingeniería de Sistemas', imagen: 'https://picsum.photos/seed/cyber2026/600/340',   tipo: 'Charla',         pasado: false },
  { id: 3,  titulo: 'Foro Económico Ulima: Perspectivas 2026',        fecha: '2026-06-18', fechaTexto: 'Miércoles 18 de junio de 2026 | De 10.00 a 13.00 horas',  descripcion: 'Economistas y representantes del BCR debatirán el panorama macroeconómico nacional e internacional, con foco en el nuevo periodo presidencial.',                            lugar: 'Universidad de Lima, Auditorio I2',                carrera: 'Economía',               imagen: 'https://picsum.photos/seed/foro2026/600/340',    tipo: 'Foro',           pasado: false },
  { id: 4,  titulo: 'Taller de Producción Audiovisual con IA',        fecha: '2026-06-27', fechaTexto: 'Viernes 27 de junio de 2026 | De 14.00 a 17.00 horas',    descripcion: 'Taller práctico donde los estudiantes explorarán herramientas de IA generativa aplicadas a guiones, storyboards y edición asistida.',                                       lugar: 'Universidad de Lima, Estudio de Televisión',       carrera: 'Comunicaciones',         imagen: 'https://picsum.photos/seed/media2026/600/340',   tipo: 'Taller',         pasado: false },
  { id: 5,  titulo: 'Conversatorio: Reforma del Sistema Judicial',    fecha: '2026-07-10', fechaTexto: 'Viernes 10 de julio de 2026 | De 16.00 a 18.00 horas',    descripcion: 'Panel de magistrados y docentes analizará las propuestas de reforma al sistema de justicia peruano y el rol del ciudadano en la transformación del Estado.',                lugar: 'Universidad de Lima, Sala de Grados F2',           carrera: 'Derecho',                imagen: 'https://picsum.photos/seed/derecho2026/600/340', tipo: 'Conversatorio',  pasado: false },
  { id: 6,  titulo: 'Open Ulima: Feria y Charlas de Carreras',        fecha: '2026-06-13', fechaTexto: 'Sábado 13 de junio de 2026 | Desde las 08.00 horas',      descripcion: 'Conoce el campus, participa en la feria y asiste a charlas. Docentes, estudiantes y egresados estarán listos para resolver tus dudas. Aforo limitado.',                    lugar: 'Universidad de Lima, Campus Principal',            carrera: 'Todas las carreras',     imagen: 'https://picsum.photos/seed/open2026/600/340',    tipo: 'Feria',          pasado: false },
  { id: 7,  titulo: 'Exposición: Proyectos de Software Fin de Ciclo', fecha: '2026-05-30', fechaTexto: 'Viernes 30 de mayo de 2026 | De 09.00 a 13.00 horas',    descripcion: 'Los estudiantes del décimo ciclo presentaron sus proyectos finales ante jurado de docentes y representantes de empresas tecnológicas.',                                   lugar: 'Universidad de Lima, Laboratorios de Cómputo C2', carrera: 'Ingeniería de Sistemas', imagen: 'https://picsum.photos/seed/expo2026/600/340',    tipo: 'Exposición',     pasado: true  },
  { id: 8,  titulo: 'Presentación de Libro: Perú, El Desarrollo Esquivo', fecha: '2026-06-11', fechaTexto: 'Jueves 11 de junio de 2026 | De 17.00 a 19.00 horas', descripcion: 'Reflexión sobre las oportunidades y desafíos de la economía peruana. Expositor: Elmer Cuba, economista especializado en macroeconomía.',                                    lugar: 'Universidad de Lima, Auditorio I2',                carrera: 'Economía',               imagen: 'https://picsum.photos/seed/libro2026/600/340',   tipo: 'Presentación',   pasado: true  },
  { id: 9,  titulo: 'Feria Impacto Verde: Día del Medio Ambiente',    fecha: '2026-06-05', fechaTexto: 'Viernes 5 de junio de 2026 | De 10.00 a 13.00 horas',    descripcion: 'El Centro de Sostenibilidad conmemoró el Día Mundial del Medio Ambiente con actividades que invitaron a reflexionar sobre el compromiso colectivo.',                       lugar: 'Universidad de Lima, Hall del Edificio F1',        carrera: 'Todas las carreras',     imagen: 'https://picsum.photos/seed/verde2026/600/340',   tipo: 'Feria',          pasado: true  },
  { id: 10, titulo: 'Simulacro Empresarial: Gestión de Crisis',       fecha: '2026-05-22', fechaTexto: 'Jueves 22 de mayo de 2026 | De 14.00 a 17.00 horas',     descripcion: 'Estudiantes de Administración tomaron decisiones estratégicas bajo presión con retroalimentación en tiempo real de ejecutivos de empresas líderes del país.',               lugar: 'Universidad de Lima, Aula Magna',                  carrera: 'Administración',         imagen: 'https://picsum.photos/seed/admin2026/600/340',   tipo: 'Simulacro',      pasado: true  },
];
