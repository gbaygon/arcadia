// ============================================
// ARCADIA - Datos Mock para MVP
// ============================================

const ARCADIA_DATA = {
  // Categorías de servicios
  categorias: [
    { id: 'plomeria', nombre: 'Plomería', icono: '🔧', color: 'blue' },
    { id: 'electricidad', nombre: 'Electricidad', icono: '⚡', color: 'yellow' },
    { id: 'construccion', nombre: 'Construcción', icono: '🏗️', color: 'orange' },
    { id: 'mecanica', nombre: 'Mecánica', icono: '🔩', color: 'gray' },
    { id: 'informatica', nombre: 'Informática', icono: '💻', color: 'purple' },
    { id: 'jardineria', nombre: 'Jardinería', icono: '🌱', color: 'green' },
    { id: 'limpieza', nombre: 'Limpieza', icono: '🧹', color: 'cyan' },
    { id: 'transporte', nombre: 'Transporte', icono: '🚚', color: 'red' },
    { id: 'carpinteria', nombre: 'Carpintería', icono: '🪚', color: 'amber' },
    { id: 'pintura', nombre: 'Pintura', icono: '🎨', color: 'pink' },
    { id: 'gasista', nombre: 'Gas', icono: '🔥', color: 'orange' },
    { id: 'otros', nombre: 'Otros oficios', icono: '🛠️', color: 'slate' }
  ],

  // Prestadores de servicios
  prestadores: [
    {
      id: 1,
      nombre: 'Carlos Mendoza',
      categoria: 'plomeria',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
      localidad: 'El Bolsón',
      lat: -41.9645,
      lng: -71.5280,
      descripcion: 'Plomero matriculado con 15 años de experiencia. Especialista en instalaciones sanitarias y reparaciones de urgencia.',
      servicios: ['Instalaciones sanitarias', 'Destapaciones', 'Reparación de pérdidas', 'Termotanques'],
      rating: 4.8,
      trabajos: 127,
      telefono: '294-4555123',
      verificado: true,
      destacado: true,
      disponible: true,
      precio: '$$'
    },
    {
      id: 2,
      nombre: 'María Gutiérrez',
      categoria: 'electricidad',
      foto: 'https://randomuser.me/api/portraits/women/44.jpg',
      localidad: 'Lago Puelo',
      lat: -42.0810,
      lng: -71.6120,
      descripcion: 'Electricista matriculada. Instalaciones domiciliarias e industriales. Certificaciones DCI.',
      servicios: ['Instalaciones eléctricas', 'Tableros', 'Iluminación LED', 'Certificaciones'],
      rating: 4.9,
      trabajos: 89,
      telefono: '294-4555124',
      verificado: true,
      destacado: true,
      disponible: true,
      precio: '$$'
    },
    {
      id: 3,
      nombre: 'Roberto Huenelaf',
      categoria: 'construccion',
      foto: 'https://randomuser.me/api/portraits/men/56.jpg',
      localidad: 'El Hoyo',
      lat: -42.0690,
      lng: -71.5200,
      descripcion: 'Albañil y constructor. Obras completas, ampliaciones y refacciones. Trabajo garantizado.',
      servicios: ['Construcción en seco', 'Albañilería tradicional', 'Refacciones', 'Ampliaciones'],
      rating: 4.7,
      trabajos: 45,
      telefono: '294-4555125',
      verificado: true,
      destacado: false,
      disponible: true,
      precio: '$$$'
    },
    {
      id: 4,
      nombre: 'Laura Pefaur',
      categoria: 'informatica',
      foto: 'https://randomuser.me/api/portraits/women/68.jpg',
      localidad: 'El Bolsón',
      lat: -41.9700,
      lng: -71.5400,
      descripcion: 'Técnica en sistemas. Reparación de PC y notebooks, redes, soporte técnico a domicilio.',
      servicios: ['Reparación de PC', 'Instalación de redes', 'Recuperación de datos', 'Soporte técnico'],
      rating: 5.0,
      trabajos: 203,
      telefono: '294-4555126',
      verificado: true,
      destacado: true,
      disponible: false,
      precio: '$$'
    },
    {
      id: 5,
      nombre: 'Juan Curruhuinca',
      categoria: 'mecanica',
      foto: 'https://randomuser.me/api/portraits/men/75.jpg',
      localidad: 'El Bolsón',
      lat: -41.9620,
      lng: -71.5250,
      descripcion: 'Mecánico automotor especializado en vehículos 4x4 y camionetas. Service completo.',
      servicios: ['Mecánica general', 'Service', 'Frenos', 'Suspensión 4x4'],
      rating: 4.6,
      trabajos: 312,
      telefono: '294-4555127',
      verificado: true,
      destacado: false,
      disponible: true,
      precio: '$$'
    },
    {
      id: 6,
      nombre: 'Ana Millaqueo',
      categoria: 'jardineria',
      foto: 'https://randomuser.me/api/portraits/women/52.jpg',
      localidad: 'Lago Puelo',
      lat: -42.0860,
      lng: -71.6200,
      descripcion: 'Diseño y mantenimiento de jardines. Huerta orgánica. Poda de árboles frutales.',
      servicios: ['Diseño de jardines', 'Mantenimiento', 'Huerta orgánica', 'Poda'],
      rating: 4.9,
      trabajos: 67,
      telefono: '294-4555128',
      verificado: true,
      destacado: true,
      disponible: true,
      precio: '$'
    },
    {
      id: 7,
      nombre: 'Pedro Nahuelquir',
      categoria: 'carpinteria',
      foto: 'https://randomuser.me/api/portraits/men/42.jpg',
      localidad: 'El Bolsón',
      lat: -41.9580,
      lng: -71.5380,
      descripcion: 'Carpintero artesanal. Muebles a medida, aberturas, decks. Trabajo en madera nativa y reciclada.',
      servicios: ['Muebles a medida', 'Aberturas', 'Decks', 'Restauración'],
      rating: 4.8,
      trabajos: 156,
      telefono: '294-4555129',
      verificado: true,
      destacado: true,
      disponible: true,
      precio: '$$$'
    },
    {
      id: 8,
      nombre: 'Lucía Trangol',
      categoria: 'limpieza',
      foto: 'https://randomuser.me/api/portraits/women/33.jpg',
      localidad: 'El Hoyo',
      lat: -42.0640,
      lng: -71.5100,
      descripcion: 'Servicio de limpieza integral para hogares y oficinas. Limpieza profunda y mantenimiento.',
      servicios: ['Limpieza de hogares', 'Oficinas', 'Limpieza profunda', 'Vidrios'],
      rating: 4.7,
      trabajos: 234,
      telefono: '294-4555130',
      verificado: false,
      destacado: false,
      disponible: true,
      precio: '$'
    }
  ],

  // Comercios
  comercios: [
    {
      id: 1,
      nombre: 'Ferretería El Bolsón',
      rubro: 'Ferretería',
      foto: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=400',
      localidad: 'El Bolsón',
      direccion: 'Av. San Martín 1234',
      descripcion: 'Ferretería completa. Materiales de construcción, herramientas, sanitarios, electricidad.',
      horario: 'Lun a Sáb 8:30 a 13:00 y 15:30 a 20:00',
      telefono: '294-4492100',
      whatsapp: '5492944492100',
      verificado: true,
      destacado: true,
      categorias: ['Ferretería', 'Construcción', 'Herramientas']
    },
    {
      id: 2,
      nombre: 'Almacén Natural Patagonia',
      rubro: 'Almacén',
      foto: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
      localidad: 'El Bolsón',
      direccion: 'Dorrego 456',
      descripcion: 'Productos orgánicos, frutos secos, harinas especiales, productos regionales.',
      horario: 'Lun a Sáb 9:00 a 20:00',
      telefono: '294-4492101',
      whatsapp: '5492944492101',
      verificado: true,
      destacado: true,
      categorias: ['Almacén', 'Orgánicos', 'Regional']
    },
    {
      id: 3,
      nombre: 'Maderas del Sur',
      rubro: 'Maderera',
      foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      localidad: 'Lago Puelo',
      direccion: 'Ruta 40 km 1890',
      descripcion: 'Maderas para construcción y carpintería. Leña, postes, tirantes, tablas.',
      horario: 'Lun a Vie 8:00 a 17:00',
      telefono: '294-4492102',
      whatsapp: '5492944492102',
      verificado: true,
      destacado: false,
      categorias: ['Maderera', 'Construcción']
    },
    {
      id: 4,
      nombre: 'TecnoPatagonia',
      rubro: 'Tecnología',
      foto: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
      localidad: 'El Bolsón',
      direccion: 'Perito Moreno 789',
      descripcion: 'Venta y reparación de computadoras, celulares, accesorios. Servicio técnico.',
      horario: 'Lun a Sáb 10:00 a 13:00 y 17:00 a 21:00',
      telefono: '294-4492103',
      whatsapp: '5492944492103',
      verificado: true,
      destacado: true,
      categorias: ['Tecnología', 'Reparación', 'Accesorios']
    },
    {
      id: 5,
      nombre: 'Vivero Arrayanes',
      rubro: 'Vivero',
      foto: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      localidad: 'El Bolsón',
      direccion: 'Barrio Luján s/n',
      descripcion: 'Plantas nativas, frutales, ornamentales. Tierra, sustratos y macetas.',
      horario: 'Todos los días 9:00 a 18:00',
      telefono: '294-4492104',
      whatsapp: '5492944492104',
      verificado: false,
      destacado: true,
      categorias: ['Vivero', 'Jardinería', 'Plantas']
    },
    {
      id: 6,
      nombre: 'Panadería La Comarca',
      rubro: 'Panadería',
      foto: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      localidad: 'El Hoyo',
      direccion: 'Av. Costanera 123',
      descripcion: 'Pan artesanal, facturas, tortas. Productos con masa madre y harinas integrales.',
      horario: 'Todos los días 7:00 a 21:00',
      telefono: '294-4492105',
      whatsapp: '5492944492105',
      verificado: true,
      destacado: false,
      categorias: ['Panadería', 'Artesanal']
    }
  ],

  // Capacitaciones
  capacitaciones: [
    {
      id: 1,
      titulo: 'Electricidad domiciliaria básica',
      instructor: 'María Gutiérrez',
      instructorFoto: 'https://randomuser.me/api/portraits/women/44.jpg',
      categoria: 'Electricidad',
      descripcion: 'Aprende los fundamentos de instalaciones eléctricas domiciliarias. Normativas, seguridad y práctica.',
      duracion: '8 semanas',
      modalidad: 'Presencial',
      precio: 45000,
      cupos: 12,
      inscritos: 8,
      inicio: '2026-02-15',
      lugar: 'Taller Municipal El Bolsón',
      requisitos: ['Mayor de 18 años', 'No requiere experiencia previa'],
      contenidos: ['Conceptos básicos', 'Herramientas', 'Circuitos', 'Tableros', 'Normativas', 'Práctica'],
      destacado: true
    },
    {
      id: 2,
      titulo: 'Plomería integral',
      instructor: 'Carlos Mendoza',
      instructorFoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      categoria: 'Plomería',
      descripcion: 'Curso completo de plomería: desde instalaciones básicas hasta sistemas complejos.',
      duracion: '12 semanas',
      modalidad: 'Presencial',
      precio: 55000,
      cupos: 10,
      inscritos: 10,
      inicio: '2026-03-01',
      lugar: 'Centro de Oficios Lago Puelo',
      requisitos: ['Mayor de 18 años', 'Disponibilidad horaria'],
      contenidos: ['Materiales', 'Herramientas', 'Instalaciones sanitarias', 'Gas', 'Termotanques', 'Práctica'],
      destacado: true
    },
    {
      id: 3,
      titulo: 'Huerta orgánica familiar',
      instructor: 'Ana Millaqueo',
      instructorFoto: 'https://randomuser.me/api/portraits/women/52.jpg',
      categoria: 'Jardinería',
      descripcion: 'Diseña y mantené tu propia huerta orgánica. Compostaje, asociación de cultivos, calendario.',
      duracion: '6 semanas',
      modalidad: 'Presencial',
      precio: 25000,
      cupos: 20,
      inscritos: 14,
      inicio: '2026-02-01',
      lugar: 'Finca Agroecológica El Bolsón',
      requisitos: ['Ninguno'],
      contenidos: ['Preparación del suelo', 'Siembra', 'Riego', 'Compostaje', 'Plagas naturales', 'Cosecha'],
      destacado: true
    },
    {
      id: 4,
      titulo: 'Carpintería en madera nativa',
      instructor: 'Pedro Nahuelquir',
      instructorFoto: 'https://randomuser.me/api/portraits/men/42.jpg',
      categoria: 'Carpintería',
      descripcion: 'Trabaja con maderas nativas de la Patagonia. Técnicas tradicionales y sustentables.',
      duracion: '10 semanas',
      modalidad: 'Presencial',
      precio: 60000,
      cupos: 8,
      inscritos: 5,
      inicio: '2026-02-20',
      lugar: 'Taller Nahuelquir, El Bolsón',
      requisitos: ['Mayor de 16 años', 'Interés en el oficio'],
      contenidos: ['Maderas nativas', 'Herramientas manuales', 'Ensambles', 'Acabados', 'Proyecto final'],
      destacado: false
    },
    {
      id: 5,
      titulo: 'Reparación de celulares',
      instructor: 'Laura Pefaur',
      instructorFoto: 'https://randomuser.me/api/portraits/women/68.jpg',
      categoria: 'Informática',
      descripcion: 'Diagnóstico y reparación de smartphones. Cambio de pantallas, baterías, software.',
      duracion: '4 semanas',
      modalidad: 'Híbrido',
      precio: 35000,
      cupos: 15,
      inscritos: 12,
      inicio: '2026-02-10',
      lugar: 'TecnoPatagonia + Online',
      requisitos: ['Conocimientos básicos de tecnología'],
      contenidos: ['Diagnóstico', 'Desarme', 'Pantallas', 'Baterías', 'Software', 'Microsoldadura básica'],
      destacado: true
    }
  ],

  // Oportunidades de trabajo
  trabajos: [
    {
      id: 1,
      titulo: 'Afiliador/a de comercios',
      tipo: 'Freelance',
      empresa: 'Arcadia',
      localidad: 'Comarca Andina',
      descripcion: 'Buscamos personas con habilidades comerciales para sumar comercios a la red Arcadia. Comisión por cada comercio afiliado.',
      requisitos: ['Buena comunicación', 'Movilidad propia', 'Conocimiento de la zona'],
      beneficios: ['Comisiones competitivas', 'Horario flexible', 'Capacitación incluida'],
      contacto: 'trabajo@arcadia.com.ar',
      fecha: '2026-01-20',
      activo: true,
      destacado: true
    },
    {
      id: 2,
      titulo: 'Pasante en desarrollo web',
      tipo: 'Pasantía',
      empresa: 'Arcadia',
      localidad: 'El Bolsón (remoto)',
      descripcion: 'Oportunidad para estudiantes o recién egresados de carreras de sistemas. Colaborá en el desarrollo de la plataforma.',
      requisitos: ['Conocimientos de HTML/CSS/JS', 'Ganas de aprender', 'Disponibilidad 20hs semanales'],
      beneficios: ['Experiencia real', 'Mentoría', 'Posibilidad de contratación'],
      contacto: 'trabajo@arcadia.com.ar',
      fecha: '2026-01-18',
      activo: true,
      destacado: true
    },
    {
      id: 3,
      titulo: 'Ayudante de electricista',
      tipo: 'Tiempo completo',
      empresa: 'Instalaciones Gutiérrez',
      localidad: 'El Bolsón',
      descripcion: 'Se busca ayudante para trabajos de electricidad domiciliaria e industrial. Con o sin experiencia.',
      requisitos: ['Ganas de aprender el oficio', 'Responsabilidad', 'Puntualidad'],
      beneficios: ['Capacitación en el trabajo', 'Herramientas provistas', 'Buen ambiente laboral'],
      contacto: '294-4555124',
      fecha: '2026-01-22',
      activo: true,
      destacado: false
    },
    {
      id: 4,
      titulo: 'Moderador/a de comunidad',
      tipo: 'Part-time',
      empresa: 'Arcadia',
      localidad: 'Remoto',
      descripcion: 'Gestión de la comunidad de usuarios. Atención de consultas, moderación de contenidos, soporte.',
      requisitos: ['Excelente redacción', 'Paciencia', 'Conocimiento de redes sociales'],
      beneficios: ['Trabajo remoto', 'Horario flexible', 'Formar parte del equipo fundador'],
      contacto: 'trabajo@arcadia.com.ar',
      fecha: '2026-01-15',
      activo: true,
      destacado: true
    },
    {
      id: 5,
      titulo: 'Oficial albañil',
      tipo: 'Por proyecto',
      empresa: 'Construcciones Huenelaf',
      localidad: 'El Hoyo',
      descripcion: 'Para obra en construcción. Experiencia comprobable en albañilería tradicional.',
      requisitos: ['Experiencia mínima 3 años', 'Referencias laborales', 'Herramientas propias'],
      beneficios: ['Pago semanal', 'Obra continua por 6 meses'],
      contacto: '294-4555125',
      fecha: '2026-01-21',
      activo: true,
      destacado: false
    }
  ],

  // Localidades con coordenadas
  localidades: [
    'El Bolsón',
    'Lago Puelo',
    'El Hoyo',
    'Epuyén',
    'Cholila',
    'El Maitén'
  ],

  // Coordenadas de localidades (para el mapa)
  coordenadas: {
    'El Bolsón': { lat: -41.9667, lng: -71.5333 },
    'Lago Puelo': { lat: -42.0833, lng: -71.6167 },
    'El Hoyo': { lat: -42.0667, lng: -71.5167 },
    'Epuyén': { lat: -42.2333, lng: -71.4667 },
    'Cholila': { lat: -42.5167, lng: -71.4333 },
    'El Maitén': { lat: -42.05, lng: -71.1667 }
  },

  // Ubicación mock del usuario (El Bolsón centro)
  ubicacionUsuario: {
    lat: -41.9667,
    lng: -71.5333,
    localidad: 'El Bolsón'
  },

  // Estadísticas para mostrar
  stats: {
    prestadores: 150,
    comercios: 85,
    usuarios: 1200,
    trabajosRealizados: 3400
  }
};

// Helpers
function getPrestadoresByCategoria(categoriaId) {
  return ARCADIA_DATA.prestadores.filter(p => p.categoria === categoriaId);
}

function getPrestadorById(id) {
  return ARCADIA_DATA.prestadores.find(p => p.id === parseInt(id));
}

function getComercioById(id) {
  return ARCADIA_DATA.comercios.find(c => c.id === parseInt(id));
}

function getCapacitacionById(id) {
  return ARCADIA_DATA.capacitaciones.find(c => c.id === parseInt(id));
}

function getTrabajoById(id) {
  return ARCADIA_DATA.trabajos.find(t => t.id === parseInt(id));
}

function getCategoriaById(id) {
  return ARCADIA_DATA.categorias.find(c => c.id === id);
}

function searchPrestadores(query) {
  const q = query.toLowerCase();
  return ARCADIA_DATA.prestadores.filter(p =>
    p.nombre.toLowerCase().includes(q) ||
    p.descripcion.toLowerCase().includes(q) ||
    p.servicios.some(s => s.toLowerCase().includes(q))
  );
}

function searchComercios(query) {
  const q = query.toLowerCase();
  return ARCADIA_DATA.comercios.filter(c =>
    c.nombre.toLowerCase().includes(q) ||
    c.rubro.toLowerCase().includes(q) ||
    c.descripcion.toLowerCase().includes(q)
  );
}

// Exportar para uso global
window.ARCADIA_DATA = ARCADIA_DATA;
window.getPrestadoresByCategoria = getPrestadoresByCategoria;
window.getPrestadorById = getPrestadorById;
window.getComercioById = getComercioById;
window.getCapacitacionById = getCapacitacionById;
window.getTrabajoById = getTrabajoById;
window.getCategoriaById = getCategoriaById;
window.searchPrestadores = searchPrestadores;
window.searchComercios = searchComercios;
