// ============================================
// ARCADIA ADMIN - Panel de Administración
// Nota: Este es un MVP con datos mock controlados
// En producción sanitizar contenido de usuario
// ============================================

// Estado del admin
var AdminState = {
  currentSection: 'dashboard',
  registros: [],
  consultas: []
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  initAdmin();
});

function initAdmin() {
  // Cargar datos de localStorage
  AdminState.registros = JSON.parse(localStorage.getItem('arcadia_registros') || '[]');
  AdminState.consultas = JSON.parse(localStorage.getItem('arcadia_consultas') || '[]');

  // Generar datos de ejemplo si no hay
  if (AdminState.registros.length === 0) {
    generateSampleRegistros();
  }
  if (AdminState.consultas.length === 0) {
    generateSampleConsultas();
  }

  // Actualizar badges
  updateBadges();

  // Manejar navegación
  handleAdminNavigation();
  window.addEventListener('hashchange', handleAdminNavigation);

  // Activar links del sidebar
  document.querySelectorAll('.sidebar-link').forEach(function(link) {
    link.addEventListener('click', function() {
      document.querySelectorAll('.sidebar-link').forEach(function(l) { l.classList.remove('active'); });
      this.classList.add('active');
    });
  });
}

function handleAdminNavigation() {
  var hash = window.location.hash.slice(1) || 'dashboard';
  AdminState.currentSection = hash;

  var titles = {
    dashboard: 'Dashboard',
    prestadores: 'Gestion de Prestadores',
    comercios: 'Gestion de Comercios',
    capacitaciones: 'Gestion de Capacitaciones',
    trabajos: 'Gestion de Trabajos',
    registros: 'Registros Pendientes',
    consultas: 'Consultas'
  };
  document.getElementById('page-title').textContent = titles[hash] || 'Dashboard';

  document.querySelectorAll('.sidebar-link').forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + hash) {
      link.classList.add('active');
    }
  });

  renderSection(hash);
}

function renderSection(section) {
  var content = document.getElementById('admin-content');
  switch (section) {
    case 'dashboard': renderDashboard(content); break;
    case 'prestadores': renderPrestadores(content); break;
    case 'comercios': renderComercios(content); break;
    case 'capacitaciones': renderCapacitaciones(content); break;
    case 'trabajos': renderTrabajos(content); break;
    case 'registros': renderRegistros(content); break;
    case 'consultas': renderConsultas(content); break;
    default: renderDashboard(content);
  }
}

function updateBadges() {
  var pendientes = AdminState.registros.filter(function(r) { return r.estado === 'pendiente'; }).length;
  var consultasNuevas = AdminState.consultas.filter(function(c) { return !c.leida; }).length;

  var badgeRegistros = document.getElementById('badge-registros');
  var badgeConsultas = document.getElementById('badge-consultas');

  if (pendientes > 0) {
    badgeRegistros.textContent = pendientes;
    badgeRegistros.classList.remove('hidden');
  } else {
    badgeRegistros.classList.add('hidden');
  }

  if (consultasNuevas > 0) {
    badgeConsultas.textContent = consultasNuevas;
    badgeConsultas.classList.remove('hidden');
  } else {
    badgeConsultas.classList.add('hidden');
  }
}

// Función segura para escapar HTML
function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// DASHBOARD
// ============================================
function renderDashboard(container) {
  var totalPrestadores = ARCADIA_DATA.prestadores.length;
  var totalComercios = ARCADIA_DATA.comercios.length;
  var registrosPendientes = AdminState.registros.filter(function(r) { return r.estado === 'pendiente'; }).length;
  var consultasSinLeer = AdminState.consultas.filter(function(c) { return !c.leida; }).length;

  var registrosRecientes = AdminState.registros.slice(0, 5).map(function(r) {
    var statusClass = r.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                     r.estado === 'aprobado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
    var nombre = escapeHtml(r.nombre || r.nombre_comercio || 'Sin nombre');
    return '<li class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">' +
      '<div><p class="font-medium">' + nombre + '</p>' +
      '<p class="text-xs text-slate-500">' + escapeHtml(r.tipo) + ' - ' + escapeHtml(r.localidad || '-') + '</p></div>' +
      '<span class="text-xs px-2 py-1 rounded-full ' + statusClass + '">' + escapeHtml(r.estado) + '</span></li>';
  }).join('');

  var consultasRecientes = AdminState.consultas.slice(0, 5).map(function(c) {
    return '<li class="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">' +
      '<div class="w-2 h-2 rounded-full mt-2 ' + (c.leida ? 'bg-slate-300' : 'bg-brand') + '"></div>' +
      '<div class="flex-1"><p class="font-medium text-sm">' + escapeHtml(c.asunto) + '</p>' +
      '<p class="text-xs text-slate-500">' + escapeHtml(c.nombre) + ' - ' + escapeHtml(c.email) + '</p></div></li>';
  }).join('');

  container.innerHTML =
    '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">' +
      '<div class="bg-white rounded-xl p-6 border border-slate-200">' +
        '<div class="flex items-center justify-between"><div>' +
        '<p class="text-sm text-slate-500">Prestadores</p>' +
        '<p class="text-3xl font-bold">' + totalPrestadores + '</p></div>' +
        '<div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">👷</div></div>' +
        '<p class="text-xs text-green-600 mt-2">+3 esta semana</p></div>' +

      '<div class="bg-white rounded-xl p-6 border border-slate-200">' +
        '<div class="flex items-center justify-between"><div>' +
        '<p class="text-sm text-slate-500">Comercios</p>' +
        '<p class="text-3xl font-bold">' + totalComercios + '</p></div>' +
        '<div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">🏪</div></div>' +
        '<p class="text-xs text-green-600 mt-2">+2 esta semana</p></div>' +

      '<div class="bg-white rounded-xl p-6 border border-slate-200">' +
        '<div class="flex items-center justify-between"><div>' +
        '<p class="text-sm text-slate-500">Registros pendientes</p>' +
        '<p class="text-3xl font-bold text-brand">' + registrosPendientes + '</p></div>' +
        '<div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">📝</div></div>' +
        '<a href="#registros" class="text-xs text-brand mt-2 inline-block hover:underline">Ver pendientes</a></div>' +

      '<div class="bg-white rounded-xl p-6 border border-slate-200">' +
        '<div class="flex items-center justify-between"><div>' +
        '<p class="text-sm text-slate-500">Consultas nuevas</p>' +
        '<p class="text-3xl font-bold text-orange-500">' + consultasSinLeer + '</p></div>' +
        '<div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">💬</div></div>' +
        '<a href="#consultas" class="text-xs text-brand mt-2 inline-block hover:underline">Ver consultas</a></div>' +
    '</div>' +

    '<div class="grid lg:grid-cols-2 gap-6">' +
      '<div class="bg-white rounded-xl border border-slate-200">' +
        '<div class="p-4 border-b border-slate-200"><h2 class="font-bold">Ultimos registros</h2></div>' +
        '<div class="p-4"><ul class="space-y-3">' + registrosRecientes + '</ul></div></div>' +

      '<div class="bg-white rounded-xl border border-slate-200">' +
        '<div class="p-4 border-b border-slate-200"><h2 class="font-bold">Ultimas consultas</h2></div>' +
        '<div class="p-4"><ul class="space-y-3">' + consultasRecientes + '</ul></div></div>' +
    '</div>';
}

// ============================================
// PRESTADORES
// ============================================
function renderPrestadores(container) {
  var rows = ARCADIA_DATA.prestadores.map(function(p, index) {
    var cat = getCategoriaById(p.categoria);
    return '<tr class="border-b border-slate-100 hover:bg-slate-50">' +
      '<td class="py-3 px-4"><div class="flex items-center gap-3">' +
        '<img src="' + escapeHtml(p.foto) + '" class="w-10 h-10 rounded-full object-cover">' +
        '<div><p class="font-medium">' + escapeHtml(p.nombre) + '</p>' +
        '<p class="text-xs text-slate-500">' + escapeHtml(p.localidad) + '</p></div></div></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + (cat ? cat.icono + ' ' + escapeHtml(cat.nombre) : '-') + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-yellow-500">★</span> ' + p.rating + '</td>' +
      '<td class="py-3 px-4">' + (p.verificado ?
        '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verificado</span>' :
        '<span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Sin verificar</span>') + '</td>' +
      '<td class="py-3 px-4">' + (p.disponible ?
        '<span class="text-green-500">●</span> Disponible' :
        '<span class="text-slate-400">○</span> No disponible') + '</td>' +
      '<td class="py-3 px-4"><div class="flex gap-2">' +
        '<button onclick="editPrestador(' + p.id + ')" class="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">Editar</button>' +
        '<button onclick="toggleVerificado(\'prestador\', ' + index + ')" class="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded">' +
        (p.verificado ? 'Quitar' : 'Verificar') + '</button></div></td></tr>';
  }).join('');

  container.innerHTML =
    '<div class="bg-white rounded-xl border border-slate-200">' +
      '<div class="p-4 border-b border-slate-200 flex items-center justify-between">' +
        '<div><h2 class="font-bold">Prestadores registrados</h2>' +
        '<p class="text-sm text-slate-500">' + ARCADIA_DATA.prestadores.length + ' prestadores en total</p></div>' +
        '<button class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg">+ Agregar</button></div>' +
      '<div class="overflow-x-auto"><table class="w-full">' +
        '<thead class="bg-slate-50"><tr>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Prestador</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Categoria</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Rating</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Estado</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Disponibilidad</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Acciones</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div></div>';
}

// ============================================
// COMERCIOS
// ============================================
function renderComercios(container) {
  var rows = ARCADIA_DATA.comercios.map(function(c, index) {
    return '<tr class="border-b border-slate-100 hover:bg-slate-50">' +
      '<td class="py-3 px-4"><div class="flex items-center gap-3">' +
        '<img src="' + escapeHtml(c.foto) + '" class="w-10 h-10 rounded-lg object-cover">' +
        '<div><p class="font-medium">' + escapeHtml(c.nombre) + '</p>' +
        '<p class="text-xs text-slate-500">' + escapeHtml(c.direccion) + ', ' + escapeHtml(c.localidad) + '</p></div></div></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + escapeHtml(c.rubro) + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + escapeHtml(c.telefono) + '</span></td>' +
      '<td class="py-3 px-4">' + (c.verificado ?
        '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verificado</span>' :
        '<span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Sin verificar</span>') + '</td>' +
      '<td class="py-3 px-4"><div class="flex gap-2">' +
        '<button class="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">Editar</button>' +
        '<button onclick="toggleVerificado(\'comercio\', ' + index + ')" class="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded">' +
        (c.verificado ? 'Quitar' : 'Verificar') + '</button></div></td></tr>';
  }).join('');

  container.innerHTML =
    '<div class="bg-white rounded-xl border border-slate-200">' +
      '<div class="p-4 border-b border-slate-200 flex items-center justify-between">' +
        '<div><h2 class="font-bold">Comercios registrados</h2>' +
        '<p class="text-sm text-slate-500">' + ARCADIA_DATA.comercios.length + ' comercios en total</p></div>' +
        '<button class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg">+ Agregar</button></div>' +
      '<div class="overflow-x-auto"><table class="w-full">' +
        '<thead class="bg-slate-50"><tr>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Comercio</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Rubro</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Telefono</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Estado</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Acciones</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div></div>';
}

// ============================================
// CAPACITACIONES
// ============================================
function renderCapacitaciones(container) {
  var rows = ARCADIA_DATA.capacitaciones.map(function(c) {
    var porcentaje = Math.round((c.inscritos / c.cupos) * 100);
    return '<tr class="border-b border-slate-100 hover:bg-slate-50">' +
      '<td class="py-3 px-4"><div><p class="font-medium">' + escapeHtml(c.titulo) + '</p>' +
        '<p class="text-xs text-slate-500">' + escapeHtml(c.instructor) + '</p></div></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + escapeHtml(c.categoria) + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + new Date(c.inicio).toLocaleDateString('es-AR') + '</span></td>' +
      '<td class="py-3 px-4"><div class="flex items-center gap-2">' +
        '<div class="w-20 bg-slate-200 rounded-full h-2">' +
        '<div class="bg-brand h-2 rounded-full" style="width: ' + porcentaje + '%"></div></div>' +
        '<span class="text-xs text-slate-500">' + c.inscritos + '/' + c.cupos + '</span></div></td>' +
      '<td class="py-3 px-4"><span class="font-medium">$' + c.precio.toLocaleString() + '</span></td>' +
      '<td class="py-3 px-4"><div class="flex gap-2">' +
        '<button class="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">Editar</button>' +
        '<button class="text-xs px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded">Inscritos</button></div></td></tr>';
  }).join('');

  container.innerHTML =
    '<div class="bg-white rounded-xl border border-slate-200">' +
      '<div class="p-4 border-b border-slate-200 flex items-center justify-between">' +
        '<div><h2 class="font-bold">Capacitaciones</h2>' +
        '<p class="text-sm text-slate-500">' + ARCADIA_DATA.capacitaciones.length + ' cursos activos</p></div>' +
        '<button class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg">+ Nueva</button></div>' +
      '<div class="overflow-x-auto"><table class="w-full">' +
        '<thead class="bg-slate-50"><tr>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Curso</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Categoria</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Inicio</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Inscriptos</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Precio</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Acciones</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div></div>';
}

// ============================================
// TRABAJOS
// ============================================
function renderTrabajos(container) {
  var rows = ARCADIA_DATA.trabajos.map(function(t) {
    return '<tr class="border-b border-slate-100 hover:bg-slate-50">' +
      '<td class="py-3 px-4"><div><p class="font-medium">' + escapeHtml(t.titulo) + '</p>' +
        '<p class="text-xs text-slate-500">' + escapeHtml(t.empresa) + '</p></div></td>' +
      '<td class="py-3 px-4"><span class="text-xs bg-red-100 text-brand px-2 py-1 rounded-full">' + escapeHtml(t.tipo) + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + escapeHtml(t.localidad) + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + new Date(t.fecha).toLocaleDateString('es-AR') + '</span></td>' +
      '<td class="py-3 px-4">' + (t.activo ?
        '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Activo</span>' :
        '<span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Inactivo</span>') + '</td>' +
      '<td class="py-3 px-4"><div class="flex gap-2">' +
        '<button class="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">Editar</button>' +
        '<button class="text-xs px-2 py-1 ' + (t.activo ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700') + ' rounded">' +
        (t.activo ? 'Desactivar' : 'Activar') + '</button></div></td></tr>';
  }).join('');

  container.innerHTML =
    '<div class="bg-white rounded-xl border border-slate-200">' +
      '<div class="p-4 border-b border-slate-200 flex items-center justify-between">' +
        '<div><h2 class="font-bold">Ofertas de trabajo</h2>' +
        '<p class="text-sm text-slate-500">' + ARCADIA_DATA.trabajos.length + ' ofertas</p></div>' +
        '<button class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg">+ Nueva</button></div>' +
      '<div class="overflow-x-auto"><table class="w-full">' +
        '<thead class="bg-slate-50"><tr>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Puesto</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Tipo</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Localidad</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Fecha</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Estado</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Acciones</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div></div>';
}

// ============================================
// REGISTROS
// ============================================
function renderRegistros(container) {
  var pendientes = AdminState.registros.filter(function(r) { return r.estado === 'pendiente'; }).length;

  container.innerHTML =
    '<div class="bg-white rounded-xl border border-slate-200">' +
      '<div class="p-4 border-b border-slate-200">' +
        '<div class="flex items-center justify-between">' +
          '<div><h2 class="font-bold">Registros</h2>' +
          '<p class="text-sm text-slate-500">' + pendientes + ' pendientes de aprobacion</p></div>' +
          '<div class="flex gap-2">' +
            '<select id="filtro-estado" onchange="filterRegistros()" class="text-sm border border-slate-200 rounded-lg px-3 py-1">' +
              '<option value="">Todos</option><option value="pendiente">Pendientes</option>' +
              '<option value="aprobado">Aprobados</option><option value="rechazado">Rechazados</option></select>' +
            '<select id="filtro-tipo" onchange="filterRegistros()" class="text-sm border border-slate-200 rounded-lg px-3 py-1">' +
              '<option value="">Todos</option><option value="vecino">Vecinos</option>' +
              '<option value="prestador">Prestadores</option><option value="comercio">Comercios</option></select>' +
          '</div></div></div>' +
      '<div class="overflow-x-auto"><table class="w-full">' +
        '<thead class="bg-slate-50"><tr>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Solicitante</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Tipo</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Localidad</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Fecha</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Estado</th>' +
          '<th class="text-left py-3 px-4 text-sm font-medium text-slate-600">Acciones</th></tr></thead>' +
        '<tbody id="registros-tbody">' + renderRegistrosRows(AdminState.registros) + '</tbody></table></div></div>';
}

function renderRegistrosRows(registros) {
  return registros.map(function(r, idx) {
    var realIdx = AdminState.registros.indexOf(r);
    var statusClass = r.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                     r.estado === 'aprobado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
    var tipoIcon = r.tipo === 'vecino' ? '👤' : r.tipo === 'prestador' ? '👷' : '🏪';
    var nombre = escapeHtml(r.nombre ? r.nombre + ' ' + (r.apellido || '') : r.nombre_comercio);

    return '<tr class="border-b border-slate-100 hover:bg-slate-50">' +
      '<td class="py-3 px-4"><div class="flex items-center gap-3">' +
        '<span class="text-2xl">' + tipoIcon + '</span>' +
        '<div><p class="font-medium">' + nombre + '</p>' +
        '<p class="text-xs text-slate-500">' + escapeHtml(r.email) + '</p></div></div></td>' +
      '<td class="py-3 px-4"><span class="text-xs bg-slate-100 px-2 py-1 rounded-full capitalize">' + escapeHtml(r.tipo) + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + escapeHtml(r.localidad || '-') + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-sm">' + new Date(r.fecha).toLocaleDateString('es-AR') + '</span></td>' +
      '<td class="py-3 px-4"><span class="text-xs px-2 py-1 rounded-full ' + statusClass + '">' + escapeHtml(r.estado) + '</span></td>' +
      '<td class="py-3 px-4"><div class="flex gap-2">' +
        '<button onclick="verRegistro(' + realIdx + ')" class="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">Ver</button>' +
        (r.estado === 'pendiente' ?
          '<button onclick="aprobarRegistro(' + realIdx + ')" class="text-xs px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded">Aprobar</button>' +
          '<button onclick="rechazarRegistro(' + realIdx + ')" class="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded">Rechazar</button>'
        : '') + '</div></td></tr>';
  }).join('');
}

// ============================================
// CONSULTAS
// ============================================
function renderConsultas(container) {
  var sinLeer = AdminState.consultas.filter(function(c) { return !c.leida; }).length;
  var consultasHTML = AdminState.consultas.map(function(c, index) {
    return '<div class="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ' + (c.leida ? '' : 'bg-red-50') + '" onclick="verConsulta(' + index + ')">' +
      '<div class="flex items-start gap-4">' +
        '<div class="w-2 h-2 rounded-full mt-2 flex-shrink-0 ' + (c.leida ? 'bg-slate-300' : 'bg-brand') + '"></div>' +
        '<div class="flex-1"><div class="flex items-center justify-between mb-1">' +
          '<p class="font-medium">' + escapeHtml(c.asunto) + '</p>' +
          '<span class="text-xs text-slate-500">' + new Date(c.fecha).toLocaleDateString('es-AR') + '</span></div>' +
          '<p class="text-sm text-slate-600">' + escapeHtml(c.nombre) + ' - ' + escapeHtml(c.email) + '</p>' +
          '<p class="text-sm text-slate-500 mt-1 line-clamp-1">' + escapeHtml(c.mensaje) + '</p></div></div></div>';
  }).join('');

  container.innerHTML =
    '<div class="bg-white rounded-xl border border-slate-200">' +
      '<div class="p-4 border-b border-slate-200 flex items-center justify-between">' +
        '<div><h2 class="font-bold">Consultas recibidas</h2>' +
        '<p class="text-sm text-slate-500">' + sinLeer + ' sin leer</p></div>' +
        '<button onclick="marcarTodasLeidas()" class="text-sm text-brand hover:underline">Marcar todas leidas</button></div>' +
      '<div>' + consultasHTML + '</div></div>';
}

// ============================================
// ACCIONES
// ============================================
function aprobarRegistro(index) {
  AdminState.registros[index].estado = 'aprobado';
  localStorage.setItem('arcadia_registros', JSON.stringify(AdminState.registros));
  updateBadges();
  renderRegistros(document.getElementById('admin-content'));
  showToast('Registro aprobado');
}

function rechazarRegistro(index) {
  AdminState.registros[index].estado = 'rechazado';
  localStorage.setItem('arcadia_registros', JSON.stringify(AdminState.registros));
  updateBadges();
  renderRegistros(document.getElementById('admin-content'));
  showToast('Registro rechazado');
}

function verRegistro(index) {
  var r = AdminState.registros[index];
  var detalles = '<p class="py-2 border-b"><strong>Tipo:</strong> ' + escapeHtml(r.tipo) + '</p>' +
    '<p class="py-2 border-b"><strong>Nombre:</strong> ' + escapeHtml(r.nombre || r.nombre_comercio) + '</p>' +
    '<p class="py-2 border-b"><strong>Email:</strong> ' + escapeHtml(r.email) + '</p>' +
    '<p class="py-2 border-b"><strong>Telefono:</strong> ' + escapeHtml(r.telefono) + '</p>' +
    '<p class="py-2 border-b"><strong>Localidad:</strong> ' + escapeHtml(r.localidad || '-') + '</p>' +
    (r.descripcion ? '<p class="py-2 border-b"><strong>Descripcion:</strong> ' + escapeHtml(r.descripcion) + '</p>' : '') +
    '<p class="py-2"><strong>Fecha:</strong> ' + new Date(r.fecha).toLocaleString('es-AR') + '</p>';

  showModal('<h2 class="text-xl font-bold mb-4">Detalle del registro</h2>' +
    '<div class="text-sm mb-4">' + detalles + '</div>' +
    '<div class="flex gap-2">' +
    (r.estado === 'pendiente' ?
      '<button onclick="aprobarRegistro(' + index + '); closeModal();" class="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium">Aprobar</button>' +
      '<button onclick="rechazarRegistro(' + index + '); closeModal();" class="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium">Rechazar</button>' : '') +
    '<button onclick="closeModal()" class="flex-1 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium">Cerrar</button></div>');
}

function verConsulta(index) {
  var c = AdminState.consultas[index];
  c.leida = true;
  localStorage.setItem('arcadia_consultas', JSON.stringify(AdminState.consultas));
  updateBadges();

  showModal('<h2 class="text-xl font-bold mb-2">' + escapeHtml(c.asunto) + '</h2>' +
    '<p class="text-sm text-slate-500 mb-4">' + escapeHtml(c.nombre) + ' - ' + escapeHtml(c.email) + '</p>' +
    '<div class="bg-slate-50 rounded-lg p-4 mb-4"><p class="text-sm">' + escapeHtml(c.mensaje) + '</p></div>' +
    '<div class="flex gap-2">' +
    '<a href="mailto:' + escapeHtml(c.email) + '" class="flex-1 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg font-medium text-center">Responder</a>' +
    '<button onclick="closeModal()" class="flex-1 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium">Cerrar</button></div>');

  renderConsultas(document.getElementById('admin-content'));
}

function marcarTodasLeidas() {
  AdminState.consultas.forEach(function(c) { c.leida = true; });
  localStorage.setItem('arcadia_consultas', JSON.stringify(AdminState.consultas));
  updateBadges();
  renderConsultas(document.getElementById('admin-content'));
  showToast('Todas marcadas como leidas');
}

function toggleVerificado(tipo, index) {
  if (tipo === 'prestador') {
    ARCADIA_DATA.prestadores[index].verificado = !ARCADIA_DATA.prestadores[index].verificado;
    renderPrestadores(document.getElementById('admin-content'));
  } else if (tipo === 'comercio') {
    ARCADIA_DATA.comercios[index].verificado = !ARCADIA_DATA.comercios[index].verificado;
    renderComercios(document.getElementById('admin-content'));
  }
  showToast('Verificacion actualizada');
}

function filterRegistros() {
  var estado = document.getElementById('filtro-estado').value;
  var tipo = document.getElementById('filtro-tipo').value;
  var filtered = AdminState.registros.filter(function(r) {
    return (!estado || r.estado === estado) && (!tipo || r.tipo === tipo);
  });
  document.getElementById('registros-tbody').innerHTML = renderRegistrosRows(filtered);
}

// ============================================
// DATOS DE EJEMPLO
// ============================================
function generateSampleRegistros() {
  AdminState.registros = [
    { id: 1, tipo: 'prestador', nombre: 'Miguel', apellido: 'Fernandez', email: 'miguel@email.com', telefono: '294-4551111', localidad: 'El Bolson', categoria: 'plomeria', descripcion: 'Plomero con 5 años de experiencia', estado: 'pendiente', fecha: '2026-01-24T10:00:00' },
    { id: 2, tipo: 'comercio', nombre_comercio: 'Libreria del Valle', nombre: 'Ana', apellido: 'Lopez', email: 'libreria@email.com', telefono: '294-4552222', localidad: 'Lago Puelo', rubro: 'Libreria', direccion: 'Av. Principal 456', estado: 'pendiente', fecha: '2026-01-23T15:30:00' },
    { id: 3, tipo: 'vecino', nombre: 'Carolina', apellido: 'Ruiz', email: 'caro@email.com', telefono: '294-4553333', localidad: 'El Hoyo', estado: 'aprobado', fecha: '2026-01-22T09:00:00' },
    { id: 4, tipo: 'prestador', nombre: 'Facundo', apellido: 'Diaz', email: 'facu@email.com', telefono: '294-4554444', localidad: 'El Bolson', categoria: 'electricidad', descripcion: 'Electricista matriculado', estado: 'pendiente', fecha: '2026-01-21T14:00:00' },
    { id: 5, tipo: 'comercio', nombre_comercio: 'Verduleria Organica', nombre: 'Martin', apellido: 'Sosa', email: 'verduleria@email.com', telefono: '294-4555555', localidad: 'El Bolson', rubro: 'Verduleria', direccion: 'Calle 5 #123', estado: 'rechazado', fecha: '2026-01-20T11:00:00' },
    { id: 6, tipo: 'vecino', nombre: 'Lucia', apellido: 'Gomez', email: 'lucia@email.com', telefono: '294-4556666', localidad: 'Cholila', estado: 'aprobado', fecha: '2026-01-19T16:00:00' }
  ];
  localStorage.setItem('arcadia_registros', JSON.stringify(AdminState.registros));
}

function generateSampleConsultas() {
  AdminState.consultas = [
    { id: 1, nombre: 'Pedro Martinez', email: 'pedro@email.com', asunto: 'Consulta sobre registro de comercio', mensaje: 'Hola, tengo un emprendimiento de pasteleria y me gustaria saber como puedo registrarme en la plataforma.', fecha: '2026-01-25T09:30:00', leida: false },
    { id: 2, nombre: 'Maria Gonzalez', email: 'maria@email.com', asunto: 'Problema con mi perfil', mensaje: 'No puedo actualizar mi foto de perfil. Cuando intento subir una imagen me da error.', fecha: '2026-01-24T14:00:00', leida: false },
    { id: 3, nombre: 'Juan Carlos Perez', email: 'jc@email.com', asunto: 'Sugerencia de nueva categoria', mensaje: 'Me gustaria sugerir agregar la categoria Herreria ya que hay varios herreros en la zona.', fecha: '2026-01-23T11:00:00', leida: true },
    { id: 4, nombre: 'Laura Sanchez', email: 'laura@email.com', asunto: 'Inscripcion en capacitacion', mensaje: 'Quiero inscribirme en el curso de electricidad pero dice que esta completo.', fecha: '2026-01-22T10:00:00', leida: true }
  ];
  localStorage.setItem('arcadia_consultas', JSON.stringify(AdminState.consultas));
}

// ============================================
// UTILIDADES
// ============================================
function showModal(content) {
  var modal = document.createElement('div');
  modal.id = 'admin-modal';
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = '<div class="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-auto">' + content + '</div>';
  modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
  document.body.appendChild(modal);
}

function closeModal() {
  var modal = document.getElementById('admin-modal');
  if (modal) modal.remove();
}

function showToast(message) {
  var toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);
}

// Exponer funciones globalmente
window.closeModal = closeModal;
window.aprobarRegistro = aprobarRegistro;
window.rechazarRegistro = rechazarRegistro;
window.verRegistro = verRegistro;
window.verConsulta = verConsulta;
window.marcarTodasLeidas = marcarTodasLeidas;
window.toggleVerificado = toggleVerificado;
window.filterRegistros = filterRegistros;
