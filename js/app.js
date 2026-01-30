// ============================================
// ARCADIA - Aplicación Principal
// Diseño Moderno/Tech - Bosque + Lago
// ============================================

const AppState = {
  currentPage: 'home',
  user: null,
  filters: {
    categoria: null,
    localidad: null,
    busqueda: ''
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const savedUser = localStorage.getItem('arcadia_user');
  if (savedUser) {
    AppState.user = JSON.parse(savedUser);
  }

  handleNavigation();
  window.addEventListener('hashchange', handleNavigation);

  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 600 });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function handleNavigation() {
  const hash = window.location.hash.slice(1) || 'home';
  const [page, param] = hash.split('/');

  AppState.currentPage = page;
  window.scrollTo(0, 0);
  renderPage(page, param);
  updateActiveNav(page);
}

function renderPage(page, param) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  switch (page) {
    case 'home': renderHome(mainContent); break;
    case 'servicios': renderServicios(mainContent, param); break;
    case 'prestador': renderPrestador(mainContent, param); break;
    case 'comercios': renderComercios(mainContent); break;
    case 'comercio': renderComercio(mainContent, param); break;
    case 'capacitaciones': renderCapacitaciones(mainContent); break;
    case 'capacitacion': renderCapacitacion(mainContent, param); break;
    case 'trabajo': renderTrabajo(mainContent); break;
    case 'registro': renderRegistro(mainContent, param); break;
    case 'nosotros': renderNosotros(mainContent); break;
    default: renderHome(mainContent);
  }

  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

function updateActiveNav(page) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('text-primary', 'font-semibold');
    if (link.getAttribute('href') === '#' + page) {
      link.classList.add('text-primary', 'font-semibold');
    }
  });
}

// ============================================
// RENDER: HOME
// ============================================
function renderHome(container) {
  const categoriasHTML = ARCADIA_DATA.categorias.map((cat, i) =>
    '<a href="#servicios/' + cat.id + '" class="group card-angular p-5 text-center" data-aos="zoom-in" data-aos-delay="' + (i * 50) + '">' +
      '<span class="text-4xl mb-3 block group-hover:scale-110 transition-transform">' + cat.icono + '</span>' +
      '<span class="font-display font-semibold text-slate-700 group-hover:text-primary">' + cat.nombre + '</span>' +
    '</a>'
  ).join('');

  const prestadoresDestacados = ARCADIA_DATA.prestadores.filter(p => p.destacado).slice(0, 4).map((p, i) => {
    const cat = getCategoriaById(p.categoria);
    return '<a href="#prestador/' + p.id + '" class="group card-angular overflow-hidden" data-aos="fade-up" data-aos-delay="' + (i * 100) + '">' +
      '<div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">' +
        '<img src="' + p.foto + '" alt="' + p.nombre + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
        (p.verificado ? '<span class="absolute top-3 right-3 tag-angular bg-emerald-500 text-white">Verificado</span>' : '') +
        (!p.disponible ? '<span class="absolute top-3 left-3 tag-angular bg-slate-500 text-white">No disponible</span>' : '') +
      '</div>' +
      '<div class="p-5">' +
        '<div class="flex items-center gap-2 mb-2">' +
          '<span class="text-lg">' + (cat ? cat.icono : '') + '</span>' +
          '<span class="text-sm text-slate-500">' + (cat ? cat.nombre : '') + '</span>' +
        '</div>' +
        '<h3 class="font-display font-bold text-lg group-hover:text-teal-600 transition-colors">' + p.nombre + '</h3>' +
        '<p class="text-sm text-slate-500 mb-3">' + p.localidad + '</p>' +
        '<div class="flex items-center justify-between">' +
          '<div class="flex items-center gap-1">' +
            '<span class="text-amber-500">★</span>' +
            '<span class="font-semibold">' + p.rating + '</span>' +
            '<span class="text-slate-400 text-sm">(' + p.trabajos + ')</span>' +
          '</div>' +
          '<span class="text-slate-400 text-sm">' + p.precio + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }).join('');

  const comerciosDestacados = ARCADIA_DATA.comercios.filter(c => c.destacado).slice(0, 3).map((c, i) =>
    '<a href="#comercio/' + c.id + '" class="group card-angular overflow-hidden" data-aos="fade-up" data-aos-delay="' + (i * 100) + '">' +
      '<div class="aspect-video bg-slate-100 relative overflow-hidden">' +
        '<img src="' + c.foto + '" alt="' + c.nombre + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
        (c.verificado ? '<span class="absolute top-3 right-3 tag-angular bg-emerald-500 text-white">Verificado</span>' : '') +
      '</div>' +
      '<div class="p-5">' +
        '<span class="text-sm text-accent font-semibold">' + c.rubro + '</span>' +
        '<h3 class="font-display font-bold text-lg group-hover:text-teal-600 transition-colors">' + c.nombre + '</h3>' +
        '<p class="text-sm text-slate-500 mb-2">' + c.localidad + ' - ' + c.direccion + '</p>' +
        '<p class="text-sm text-slate-600 line-clamp-2">' + c.descripcion + '</p>' +
      '</div>' +
    '</a>'
  ).join('');

  const capacitacionesDestacadas = ARCADIA_DATA.capacitaciones.filter(c => c.destacado).slice(0, 3).map((c, i) =>
    '<a href="#capacitacion/' + c.id + '" class="group card-angular p-6" data-aos="fade-up" data-aos-delay="' + (i * 100) + '">' +
      '<div class="flex items-center gap-3 mb-4">' +
        '<img src="' + c.instructorFoto + '" alt="' + c.instructor + '" class="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20">' +
        '<div>' +
          '<p class="font-display font-semibold">' + c.instructor + '</p>' +
          '<p class="text-sm text-accent">' + c.categoria + '</p>' +
        '</div>' +
      '</div>' +
      '<h3 class="font-display font-bold text-lg mb-2 group-hover:text-teal-600">' + c.titulo + '</h3>' +
      '<p class="text-sm text-slate-600 mb-4 line-clamp-2">' + c.descripcion + '</p>' +
      '<div class="flex items-center justify-between text-sm">' +
        '<span class="text-slate-500">' + c.duracion + ' - ' + c.modalidad + '</span>' +
        '<span class="font-bold text-teal-600">$' + c.precio.toLocaleString() + '</span>' +
      '</div>' +
      '<div class="mt-4 pt-4 border-t border-slate-100">' +
        '<div class="flex items-center justify-between text-sm">' +
          '<span class="text-slate-500">' + c.inscritos + '/' + c.cupos + ' inscriptos</span>' +
          '<span class="' + (c.inscritos >= c.cupos ? 'text-red-500' : 'text-emerald-600') + ' font-medium">' +
            (c.inscritos >= c.cupos ? 'Completo' : 'Cupos disponibles') +
          '</span>' +
        '</div>' +
      '</div>' +
    '</a>'
  ).join('');

  const trabajosDestacados = ARCADIA_DATA.trabajos.filter(t => t.destacado).slice(0, 4).map((t, i) =>
    '<div class="card-angular p-5" data-aos="fade-up" data-aos-delay="' + (i * 100) + '">' +
      '<div class="flex items-start justify-between mb-3">' +
        '<div>' +
          '<span class="tag-angular bg-amber-100 text-amber-500 mb-2">' + t.tipo + '</span>' +
          '<h3 class="font-display font-bold text-lg">' + t.titulo + '</h3>' +
          '<p class="text-sm text-slate-500">' + t.empresa + ' - ' + t.localidad + '</p>' +
        '</div>' +
      '</div>' +
      '<p class="text-sm text-slate-600 mb-4 line-clamp-2">' + t.descripcion + '</p>' +
      '<a href="#trabajo" class="text-accent font-semibold text-sm hover:text-primary transition-colors">Ver mas →</a>' +
    '</div>'
  ).join('');

  container.innerHTML =
    '<!-- Hero -->' +
    '<section class="gradient-hero">' +
      '<div class="max-w-6xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">' +
        '<div data-aos="fade-right">' +
          '<span class="tag-angular bg-accent/10 text-accent mb-6 inline-block">' +
            'La comunidad digital de la Comarca Andina' +
          '</span>' +
          '<h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">' +
            'Conectamos <span class="text-teal-600">oficios, comercios</span> y vecinos' +
          '</h1>' +
          '<p class="text-slate-600 text-lg mb-8 max-w-lg">' +
            'Encontra el servicio que necesitas, descubri comercios locales, ' +
            'capacitate en oficios y accede a oportunidades de trabajo.' +
          '</p>' +
          '<div class="flex flex-wrap gap-4">' +
            '<a href="#servicios" class="btn-primary">' +
              '<span class="flex items-center gap-2">Buscar servicios <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>' +
            '</a>' +
            '<a href="#registro/prestador" class="btn-secondary">' +
              'Ofrecer mis servicios' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<div data-aos="fade-left" class="hidden lg:block">' +
          '<div class="relative">' +
            '<div class="absolute -top-8 -left-8 w-64 h-64 gradient-accent opacity-20 blur-3xl"></div>' +
            '<div class="relative grid grid-cols-2 gap-4">' +
              '<div class="space-y-4">' +
                '<div class="card-angular p-4">' +
                  '<div class="flex items-center gap-3 mb-2">' +
                    '<span class="text-2xl">🔧</span>' +
                    '<span class="font-display font-semibold">Plomeria</span>' +
                  '</div>' +
                  '<p class="text-sm text-slate-500">15 prestadores</p>' +
                '</div>' +
                '<div class="card-angular p-4">' +
                  '<div class="flex items-center gap-3 mb-2">' +
                    '<span class="text-2xl">⚡</span>' +
                    '<span class="font-display font-semibold">Electricidad</span>' +
                  '</div>' +
                  '<p class="text-sm text-slate-500">12 prestadores</p>' +
                '</div>' +
              '</div>' +
              '<div class="space-y-4 mt-8">' +
                '<div class="card-angular p-4">' +
                  '<div class="flex items-center gap-3 mb-2">' +
                    '<span class="text-2xl">🏗️</span>' +
                    '<span class="font-display font-semibold">Construccion</span>' +
                  '</div>' +
                  '<p class="text-sm text-slate-500">23 prestadores</p>' +
                '</div>' +
                '<div class="card-angular p-4">' +
                  '<div class="flex items-center gap-3 mb-2">' +
                    '<span class="text-2xl">💻</span>' +
                    '<span class="font-display font-semibold">Informatica</span>' +
                  '</div>' +
                  '<p class="text-sm text-slate-500">8 prestadores</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- Categorias -->' +
    '<section class="bg-white py-20">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<div class="text-center mb-12" data-aos="fade-up">' +
          '<h2 class="font-display text-3xl sm:text-4xl font-bold mb-4">Que servicio <span class="text-teal-600">necesitas</span>?</h2>' +
          '<p class="text-slate-600 max-w-2xl mx-auto">Explora nuestras categorias y encontra al profesional indicado</p>' +
        '</div>' +
        '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">' +
          categoriasHTML +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- Prestadores -->' +
    '<section class="bg-slate-50 py-20">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<div class="flex items-center justify-between mb-12">' +
          '<div data-aos="fade-right">' +
            '<h2 class="font-display text-3xl font-bold mb-2">Prestadores <span class="text-teal-600">destacados</span></h2>' +
            '<p class="text-slate-600">Profesionales verificados y con excelentes calificaciones</p>' +
          '</div>' +
          '<a href="#servicios" class="hidden sm:flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors" data-aos="fade-left">' +
            'Ver todos <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</a>' +
        '</div>' +
        '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">' +
          prestadoresDestacados +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- Como funciona -->' +
    '<section class="gradient-dark text-white py-20">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<div class="text-center mb-16" data-aos="fade-up">' +
          '<h2 class="font-display text-3xl sm:text-4xl font-bold mb-4">Como funciona <span class="text-teal-300">Arcadia</span>?</h2>' +
          '<p class="text-slate-300">Simple, directo y sin vueltas</p>' +
        '</div>' +
        '<div class="grid md:grid-cols-3 gap-8">' +
          '<div class="text-center" data-aos="fade-up" data-aos-delay="0">' +
            '<div class="w-16 h-16 bg-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">' +
              '<span class="text-2xl font-bold">1</span>' +
            '</div>' +
            '<h3 class="font-display font-bold text-xl mb-3">Busca</h3>' +
            '<p class="text-slate-300">Encontra el servicio o comercio que necesitas en tu zona</p>' +
          '</div>' +
          '<div class="text-center" data-aos="fade-up" data-aos-delay="100">' +
            '<div class="w-16 h-16 bg-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">' +
              '<span class="text-2xl font-bold">2</span>' +
            '</div>' +
            '<h3 class="font-display font-bold text-xl mb-3">Contacta</h3>' +
            '<p class="text-slate-300">Comunicate directo con el prestador o comercio</p>' +
          '</div>' +
          '<div class="text-center" data-aos="fade-up" data-aos-delay="200">' +
            '<div class="w-16 h-16 bg-cyan-600 rounded-full mx-auto mb-6 flex items-center justify-center">' +
              '<span class="text-2xl font-bold">3</span>' +
            '</div>' +
            '<h3 class="font-display font-bold text-xl mb-3">Califica</h3>' +
            '<p class="text-slate-300">Deja tu opinion y ayuda a la comunidad</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- Comercios -->' +
    '<section class="bg-white py-20">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<div class="flex items-center justify-between mb-12">' +
          '<div data-aos="fade-right">' +
            '<h2 class="font-display text-3xl font-bold mb-2">Comercios <span class="text-emerald-700">locales</span></h2>' +
            '<p class="text-slate-600">Apoya a los comercios de tu comunidad</p>' +
          '</div>' +
          '<a href="#comercios" class="hidden sm:flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors" data-aos="fade-left">' +
            'Ver todos <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</a>' +
        '</div>' +
        '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">' +
          comerciosDestacados +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- Capacitaciones -->' +
    '<section class="bg-slate-50 py-20">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<div class="flex items-center justify-between mb-12">' +
          '<div data-aos="fade-right">' +
            '<h2 class="font-display text-3xl font-bold mb-2">Capacitaciones en <span class="text-teal-600">oficios</span></h2>' +
            '<p class="text-slate-600">Aprende de los que saben</p>' +
          '</div>' +
          '<a href="#capacitaciones" class="hidden sm:flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors" data-aos="fade-left">' +
            'Ver todas <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</a>' +
        '</div>' +
        '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">' +
          capacitacionesDestacadas +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- Trabajo -->' +
    '<section class="bg-white py-20">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<div class="flex items-center justify-between mb-12">' +
          '<div data-aos="fade-right">' +
            '<h2 class="font-display text-3xl font-bold mb-2">Oportunidades de <span class="text-emerald-700">trabajo</span></h2>' +
            '<p class="text-slate-600">Trabajo real, sin vueltas</p>' +
          '</div>' +
          '<a href="#trabajo" class="hidden sm:flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors" data-aos="fade-left">' +
            'Ver todas <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</a>' +
        '</div>' +
        '<div class="grid sm:grid-cols-2 gap-6">' +
          trabajosDestacados +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- Stats -->' +
    '<section class="bg-teal-600 py-16">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">' +
          '<div data-aos="zoom-in">' +
            '<p class="font-display text-5xl font-bold mb-2">' + ARCADIA_DATA.stats.prestadores + '+</p>' +
            '<p class="text-white/70">Prestadores</p>' +
          '</div>' +
          '<div data-aos="zoom-in" data-aos-delay="100">' +
            '<p class="font-display text-5xl font-bold mb-2">' + ARCADIA_DATA.stats.comercios + '+</p>' +
            '<p class="text-white/70">Comercios</p>' +
          '</div>' +
          '<div data-aos="zoom-in" data-aos-delay="200">' +
            '<p class="font-display text-5xl font-bold mb-2">' + ARCADIA_DATA.stats.usuarios + '+</p>' +
            '<p class="text-white/70">Usuarios</p>' +
          '</div>' +
          '<div data-aos="zoom-in" data-aos-delay="300">' +
            '<p class="font-display text-5xl font-bold mb-2">' + ARCADIA_DATA.stats.trabajosRealizados + '+</p>' +
            '<p class="text-white/70">Trabajos</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<!-- CTA -->' +
    '<section class="gradient-dark text-white py-20">' +
      '<div class="max-w-3xl mx-auto px-4 text-center">' +
        '<h2 class="font-display text-3xl sm:text-4xl font-bold mb-6" data-aos="fade-up">Queres ser parte de <span class="text-teal-300">Arcadia</span>?</h2>' +
        '<p class="text-slate-300 mb-10 text-lg" data-aos="fade-up" data-aos-delay="100">' +
          'Sumate como vecino, prestador de servicios o comercio. Juntos construimos la economia local.' +
        '</p>' +
        '<div class="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">' +
          '<a href="#registro/vecino" class="px-6 py-3 bg-white text-slate-800 font-semibold rounded-md hover:bg-slate-100 transition-colors">' +
            'Registrarme como vecino' +
          '</a>' +
          '<a href="#registro/prestador" class="btn-primary">' +
            'Ofrecer mis servicios' +
          '</a>' +
          '<a href="#registro/comercio" class="px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-md hover:border-white/70 transition-colors">' +
            'Registrar mi comercio' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</section>';
}

// ============================================
// RENDER: SERVICIOS
// ============================================
function renderServicios(container, categoriaId) {
  const categoria = categoriaId ? getCategoriaById(categoriaId) : null;
  const prestadores = categoriaId ? getPrestadoresByCategoria(categoriaId) : ARCADIA_DATA.prestadores;
  const ubicacion = ARCADIA_DATA.ubicacionUsuario;

  const categoriasLinks = ARCADIA_DATA.categorias.map(cat =>
    '<li>' +
      '<a href="#servicios/' + cat.id + '" class="flex items-center gap-2 px-3 py-2 transition-colors ' + (categoriaId === cat.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-50') + '">' +
        '<span>' + cat.icono + '</span>' +
        '<span>' + cat.nombre + '</span>' +
      '</a>' +
    '</li>'
  ).join('');

  const localidadesOptions = ARCADIA_DATA.localidades.map(loc =>
    '<option value="' + loc + '"' + (loc === ubicacion.localidad ? ' selected' : '') + '>' + loc + '</option>'
  ).join('');

  const prestadoresHTML = prestadores.map(p => renderPrestadorCard(p)).join('');

  container.innerHTML =
    '<section class="bg-slate-50 min-h-screen py-8">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">Servicios</span>' +
          (categoria ? '<span class="mx-2 text-slate-400">/</span><span class="text-primary">' + categoria.nombre + '</span>' : '') +
        '</nav>' +

        '<div class="flex flex-col md:flex-row gap-8">' +
          '<aside class="md:w-64 flex-shrink-0">' +
            '<div class="card-angular p-5 sticky top-20">' +
              // Ubicación actual
              '<div class="ubicacion-actual mb-4">' +
                '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />' +
                  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />' +
                '</svg>' +
                '<span>Tu ubicación: <strong>' + ubicacion.localidad + '</strong></span>' +
              '</div>' +

              '<h3 class="font-display font-bold mb-4">Categorias</h3>' +
              '<ul class="space-y-1">' +
                '<li>' +
                  '<a href="#servicios" class="block px-3 py-2 transition-colors ' + (!categoriaId ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-50') + '">' +
                    'Todas' +
                  '</a>' +
                '</li>' +
                categoriasLinks +
              '</ul>' +
              '<hr class="my-4 border-slate-200">' +
              '<h3 class="font-display font-bold mb-4">Filtrar por localidad</h3>' +
              '<select id="filtro-localidad" class="w-full input-angular px-3 py-2 text-sm bg-white">' +
                '<option value="">Todas las localidades</option>' +
                localidadesOptions +
              '</select>' +
            '</div>' +
          '</aside>' +

          '<main class="flex-1">' +
            '<div class="flex items-center justify-between mb-6">' +
              '<h1 class="font-display text-2xl font-bold">' +
                (categoria ? categoria.icono + ' ' + categoria.nombre : 'Todos los servicios') +
              '</h1>' +
              '<span class="text-slate-500">' + prestadores.length + ' prestadores</span>' +
            '</div>' +

            // Mapa
            '<div class="card-angular mb-6 overflow-hidden">' +
              '<div class="p-4 border-b border-slate-200 flex items-center justify-between">' +
                '<h3 class="font-display font-semibold flex items-center gap-2">' +
                  '<span>📍</span> Mapa de prestadores' +
                '</h3>' +
                '<button id="toggle-mapa" class="text-sm text-accent hover:text-accent-dark transition-colors">' +
                  'Ocultar mapa' +
                '</button>' +
              '</div>' +
              '<div id="mapa-container">' +
                '<div id="mapa-servicios"></div>' +
              '</div>' +
            '</div>' +

            '<div class="mb-6">' +
              '<input type="text" id="buscar-prestador" placeholder="Buscar por nombre o servicio..." class="w-full input-angular px-4 py-3 bg-white">' +
            '</div>' +

            '<div class="grid sm:grid-cols-2 gap-4" id="lista-prestadores">' +
              prestadoresHTML +
            '</div>' +

            (prestadores.length === 0 ?
              '<div class="text-center py-12">' +
                '<p class="text-4xl mb-4">🔍</p>' +
                '<p class="text-slate-500">No hay prestadores en esta categoria todavia</p>' +
                '<a href="#registro/prestador" class="inline-block mt-4 text-accent font-medium hover:text-primary">Queres ofrecer tus servicios?</a>' +
              '</div>'
            : '') +
          '</main>' +
        '</div>' +
      '</div>' +
    '</section>';

  // Inicializar mapa
  initMapaServicios(prestadores);

  // Toggle mapa
  var toggleBtn = document.getElementById('toggle-mapa');
  var mapaContainer = document.getElementById('mapa-container');
  if (toggleBtn && mapaContainer) {
    toggleBtn.addEventListener('click', function() {
      if (mapaContainer.style.display === 'none') {
        mapaContainer.style.display = 'block';
        toggleBtn.textContent = 'Ocultar mapa';
        if (window.mapaServicios) {
          window.mapaServicios.invalidateSize();
        }
      } else {
        mapaContainer.style.display = 'none';
        toggleBtn.textContent = 'Mostrar mapa';
      }
    });
  }

  // Búsqueda
  const buscarInput = document.getElementById('buscar-prestador');
  if (buscarInput) {
    buscarInput.addEventListener('input', function(e) {
      filterPrestadores(e.target.value, categoriaId);
    });
  }

  // Filtro por localidad
  var filtroLocalidad = document.getElementById('filtro-localidad');
  if (filtroLocalidad) {
    filtroLocalidad.addEventListener('change', function(e) {
      filterPrestadoresByLocalidad(e.target.value, categoriaId);
    });
  }
}

// ============================================
// MAPA DE SERVICIOS
// ============================================
function initMapaServicios(prestadores) {
  var mapaEl = document.getElementById('mapa-servicios');
  if (!mapaEl || typeof L === 'undefined') return;

  var ubicacion = ARCADIA_DATA.ubicacionUsuario;

  // Crear mapa centrado en la ubicación del usuario
  var mapa = L.map('mapa-servicios').setView([ubicacion.lat, ubicacion.lng], 12);

  // Capa de tiles (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  // Icono personalizado para el usuario
  var iconoUsuario = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background:#0d9488;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  // Marcador de ubicación del usuario
  L.marker([ubicacion.lat, ubicacion.lng], { icon: iconoUsuario })
    .addTo(mapa)
    .bindPopup('<strong>Tu ubicación</strong><br>' + ubicacion.localidad);

  // Icono para prestadores
  var iconoPrestador = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background:#2d5a47;width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  // Agregar marcadores de prestadores
  prestadores.forEach(function(p) {
    if (p.lat && p.lng) {
      var cat = getCategoriaById(p.categoria);
      var popupContent =
        '<div style="min-width:180px;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
            '<img src="' + p.foto + '" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">' +
            '<div>' +
              '<strong style="display:block;">' + p.nombre + '</strong>' +
              '<span style="font-size:12px;color:#6b7280;">' + (cat ? cat.icono + ' ' + cat.nombre : '') + '</span>' +
            '</div>' +
          '</div>' +
          '<div style="font-size:13px;color:#374151;margin-bottom:8px;">' +
            '★ ' + p.rating + ' · ' + p.trabajos + ' trabajos' +
          '</div>' +
          '<a href="#prestador/' + p.id + '" style="display:inline-block;background:#0d9488;color:white;padding:6px 12px;border-radius:4px;font-size:12px;text-decoration:none;">Ver perfil</a>' +
        '</div>';

      L.marker([p.lat, p.lng], { icon: iconoPrestador })
        .addTo(mapa)
        .bindPopup(popupContent);
    }
  });

  // Guardar referencia global para poder invalidar tamaño después
  window.mapaServicios = mapa;
}

function filterPrestadoresByLocalidad(localidad, categoriaId) {
  var results = categoriaId ? getPrestadoresByCategoria(categoriaId) : ARCADIA_DATA.prestadores;

  if (localidad) {
    results = results.filter(function(p) {
      return p.localidad === localidad;
    });
  }

  var container = document.getElementById('lista-prestadores');
  if (container) {
    container.innerHTML = results.map(function(p) { return renderPrestadorCard(p); }).join('');
  }

  // Actualizar mapa
  if (window.mapaServicios) {
    window.mapaServicios.remove();
  }
  initMapaServicios(results);
}

function renderPrestadorCard(p) {
  const categoria = getCategoriaById(p.categoria);
  return '<a href="#prestador/' + p.id + '" class="group card-angular p-4 flex gap-4">' +
      '<img src="' + p.foto + '" alt="' + p.nombre + '" class="w-20 h-20 object-cover flex-shrink-0 rounded-lg">' +
      '<div class="flex-1 min-w-0">' +
        '<div class="flex items-center gap-2 mb-1">' +
          (p.verificado ? '<span class="text-emerald-500 text-xs font-semibold">✓ Verificado</span>' : '') +
          (!p.disponible ? '<span class="text-slate-400 text-xs">No disponible</span>' : '') +
        '</div>' +
        '<h3 class="font-display font-bold group-hover:text-accent transition-colors truncate">' + p.nombre + '</h3>' +
        '<p class="text-sm text-slate-500">' + (categoria ? categoria.icono : '') + ' ' + (categoria ? categoria.nombre : '') + ' - ' + p.localidad + '</p>' +
        '<div class="flex items-center gap-2 mt-2">' +
          '<span class="text-amber-500 text-sm">★ ' + p.rating + '</span>' +
          '<span class="text-slate-400 text-sm">(' + p.trabajos + ' trabajos)</span>' +
          '<span class="text-slate-400 text-sm ml-auto">' + p.precio + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
}

function filterPrestadores(query, categoriaId) {
  var results = categoriaId ? getPrestadoresByCategoria(categoriaId) : ARCADIA_DATA.prestadores;

  // Aplicar filtro de localidad si está seleccionado
  var filtroLocalidad = document.getElementById('filtro-localidad');
  if (filtroLocalidad && filtroLocalidad.value) {
    results = results.filter(function(p) {
      return p.localidad === filtroLocalidad.value;
    });
  }

  if (query) {
    var q = query.toLowerCase();
    results = results.filter(function(p) {
      return p.nombre.toLowerCase().indexOf(q) !== -1 ||
        p.descripcion.toLowerCase().indexOf(q) !== -1 ||
        p.servicios.some(function(s) { return s.toLowerCase().indexOf(q) !== -1; });
    });
  }

  var container = document.getElementById('lista-prestadores');
  if (container) {
    container.innerHTML = results.map(function(p) { return renderPrestadorCard(p); }).join('');
  }

  // Actualizar mapa con resultados filtrados
  if (window.mapaServicios) {
    window.mapaServicios.remove();
  }
  initMapaServicios(results);
}

// ============================================
// RENDER: PRESTADOR
// ============================================
function renderPrestador(container, id) {
  var p = getPrestadorById(id);
  if (!p) {
    container.innerHTML = '<div class="text-center py-20"><h2 class="font-display text-2xl font-bold">Prestador no encontrado</h2></div>';
    return;
  }

  var categoria = getCategoriaById(p.categoria);
  var serviciosHTML = p.servicios.map(function(s) {
    return '<span class="tag-angular bg-slate-100 text-slate-700">' + s + '</span>';
  }).join('');

  container.innerHTML =
    '<section class="bg-slate-50 py-8">' +
      '<div class="max-w-4xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<a href="#servicios" class="text-slate-500 hover:text-primary">Servicios</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<a href="#servicios/' + p.categoria + '" class="text-slate-500 hover:text-primary">' + (categoria ? categoria.nombre : '') + '</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">' + p.nombre + '</span>' +
        '</nav>' +

        '<div class="card-angular overflow-hidden">' +
          '<div class="bg-teal-600 p-8 text-white">' +
            '<div class="flex flex-col sm:flex-row gap-6 items-start sm:items-center">' +
              '<img src="' + p.foto + '" alt="' + p.nombre + '" class="w-24 h-24 object-cover rounded-xl ring-4 ring-white/30">' +
              '<div class="flex-1">' +
                '<div class="flex items-center gap-2 mb-1">' +
                  (p.verificado ? '<span class="tag-angular bg-emerald-500 text-white">Verificado</span>' : '') +
                  (p.destacado ? '<span class="tag-angular bg-warm text-white">★ Destacado</span>' : '') +
                '</div>' +
                '<h1 class="font-display text-2xl sm:text-3xl font-bold">' + p.nombre + '</h1>' +
                '<p class="text-white/70">' + (categoria ? categoria.icono : '') + ' ' + (categoria ? categoria.nombre : '') + ' - ' + p.localidad + '</p>' +
              '</div>' +
              '<div class="text-right">' +
                '<div class="flex items-center gap-1 text-2xl mb-1">' +
                  '<span class="text-amber-500">★</span>' +
                  '<span class="font-bold">' + p.rating + '</span>' +
                '</div>' +
                '<p class="text-white/70 text-sm">' + p.trabajos + ' trabajos</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="p-8">' +
            '<div class="grid md:grid-cols-3 gap-8">' +
              '<div class="md:col-span-2 space-y-6">' +
                '<div>' +
                  '<h2 class="font-display font-bold text-lg mb-3">Sobre mi</h2>' +
                  '<p class="text-slate-600">' + p.descripcion + '</p>' +
                '</div>' +
                '<div>' +
                  '<h2 class="font-display font-bold text-lg mb-3">Servicios</h2>' +
                  '<div class="flex flex-wrap gap-2">' + serviciosHTML + '</div>' +
                '</div>' +
                '<div>' +
                  '<h2 class="font-display font-bold text-lg mb-4">Opiniones</h2>' +
                  '<div class="space-y-4">' +
                    '<div class="bg-slate-50 p-4 rounded-lg">' +
                      '<div class="flex items-center gap-2 mb-2">' +
                        '<span class="text-amber-500">★★★★★</span>' +
                        '<span class="text-sm text-slate-500">hace 2 semanas</span>' +
                      '</div>' +
                      '<p class="text-slate-600">"Excelente trabajo, muy profesional y puntual. Lo recomiendo."</p>' +
                      '<p class="text-sm text-slate-500 mt-2">— Juan P., El Bolson</p>' +
                    '</div>' +
                    '<div class="bg-slate-50 p-4 rounded-lg">' +
                      '<div class="flex items-center gap-2 mb-2">' +
                        '<span class="text-amber-500">★★★★★</span>' +
                        '<span class="text-sm text-slate-500">hace 1 mes</span>' +
                      '</div>' +
                      '<p class="text-slate-600">"Resolvio el problema rapido y a buen precio."</p>' +
                      '<p class="text-sm text-slate-500 mt-2">— Maria L., Lago Puelo</p>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              '<div>' +
                '<div class="bg-slate-50 p-5 rounded-xl sticky top-20">' +
                  '<div class="text-center mb-4">' +
                    '<span class="font-display text-3xl font-bold">' + p.precio + '</span>' +
                    '<p class="text-slate-500 text-sm">Rango de precios</p>' +
                  '</div>' +
                  '<div class="space-y-3">' +
                    '<a href="tel:' + p.telefono + '" class="btn-primary w-full text-center block">' +
                      '📞 Llamar' +
                    '</a>' +
                    '<a href="https://wa.me/549' + p.telefono.replace(/-/g, '') + '" target="_blank" class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-center block rounded-md transition-colors">' +
                      '💬 WhatsApp' +
                    '</a>' +
                  '</div>' +
                  '<div class="mt-4 pt-4 border-t border-slate-200">' +
                    '<p class="text-sm text-center">' +
                      (p.disponible
                        ? '<span class="text-emerald-600 font-medium">● Disponible ahora</span>'
                        : '<span class="text-slate-400">○ No disponible</span>') +
                    '</p>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
}

// ============================================
// RENDER: COMERCIOS
// ============================================
function renderComercios(container) {
  var comerciosHTML = ARCADIA_DATA.comercios.map(function(c) {
    return '<a href="#comercio/' + c.id + '" class="group card-angular overflow-hidden">' +
      '<div class="aspect-video bg-slate-100 relative overflow-hidden">' +
        '<img src="' + c.foto + '" alt="' + c.nombre + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
        (c.verificado ? '<span class="absolute top-3 right-3 tag-angular bg-emerald-500 text-white">Verificado</span>' : '') +
      '</div>' +
      '<div class="p-5">' +
        '<span class="text-sm text-accent font-semibold">' + c.rubro + '</span>' +
        '<h3 class="font-display font-bold text-lg group-hover:text-primary transition-colors">' + c.nombre + '</h3>' +
        '<p class="text-sm text-slate-500 mb-2">' + c.localidad + ' - ' + c.direccion + '</p>' +
        '<p class="text-sm text-slate-600 line-clamp-2">' + c.descripcion + '</p>' +
      '</div>' +
    '</a>';
  }).join('');

  container.innerHTML =
    '<section class="bg-slate-50 min-h-screen py-8">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">Comercios</span>' +
        '</nav>' +

        '<div class="flex items-center justify-between mb-8">' +
          '<div>' +
            '<h1 class="font-display text-3xl font-bold mb-2">Comercios <span class="text-teal-600">locales</span></h1>' +
            '<p class="text-slate-600">Directorio de comercios de la Comarca Andina</p>' +
          '</div>' +
          '<a href="#registro/comercio" class="hidden sm:block btn-primary"><span>Registrar mi comercio</span></a>' +
        '</div>' +

        '<div class="mb-6">' +
          '<input type="text" id="buscar-comercio" placeholder="Buscar comercio..." class="w-full input-angular px-4 py-3 bg-white">' +
        '</div>' +

        '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" id="lista-comercios">' +
          comerciosHTML +
        '</div>' +
      '</div>' +
    '</section>';

  var buscarInput = document.getElementById('buscar-comercio');
  if (buscarInput) {
    buscarInput.addEventListener('input', function(e) {
      var results = searchComercios(e.target.value);
      var listaHTML = results.map(function(c) {
        return '<a href="#comercio/' + c.id + '" class="group card-angular overflow-hidden">' +
          '<div class="aspect-video bg-slate-100 relative overflow-hidden">' +
            '<img src="' + c.foto + '" alt="' + c.nombre + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
            (c.verificado ? '<span class="absolute top-3 right-3 tag-angular bg-emerald-500 text-white">Verificado</span>' : '') +
          '</div>' +
          '<div class="p-5">' +
            '<span class="text-sm text-accent font-semibold">' + c.rubro + '</span>' +
            '<h3 class="font-display font-bold text-lg group-hover:text-primary">' + c.nombre + '</h3>' +
            '<p class="text-sm text-slate-500 mb-2">' + c.localidad + '</p>' +
          '</div>' +
        '</a>';
      }).join('');
      document.getElementById('lista-comercios').innerHTML = listaHTML;
    });
  }
}

// ============================================
// RENDER: COMERCIO
// ============================================
function renderComercio(container, id) {
  var c = getComercioById(id);
  if (!c) {
    container.innerHTML = '<div class="text-center py-20"><h2 class="font-display text-2xl font-bold">Comercio no encontrado</h2></div>';
    return;
  }

  container.innerHTML =
    '<section class="bg-slate-50 py-8">' +
      '<div class="max-w-4xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<a href="#comercios" class="text-slate-500 hover:text-primary">Comercios</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">' + c.nombre + '</span>' +
        '</nav>' +

        '<div class="card-angular overflow-hidden">' +
          '<div class="aspect-[21/9] bg-slate-100 relative">' +
            '<img src="' + c.foto + '" alt="' + c.nombre + '" class="w-full h-full object-cover">' +
            (c.verificado ? '<span class="absolute top-4 right-4 tag-angular bg-emerald-500 text-white">Comercio verificado</span>' : '') +
          '</div>' +
          '<div class="p-8">' +
            '<span class="tag-angular bg-accent/10 text-accent mb-3">' + c.rubro + '</span>' +
            '<h1 class="font-display text-3xl font-bold mb-2">' + c.nombre + '</h1>' +
            '<p class="text-slate-500 mb-6">' + c.localidad + ' - ' + c.direccion + '</p>' +
            '<p class="text-slate-600 mb-8">' + c.descripcion + '</p>' +
            '<div class="grid sm:grid-cols-2 gap-4 mb-8">' +
              '<div class="bg-slate-50 p-4 rounded-lg">' +
                '<h3 class="font-display font-semibold mb-2">🕐 Horario</h3>' +
                '<p class="text-slate-600">' + c.horario + '</p>' +
              '</div>' +
              '<div class="bg-slate-50 p-4 rounded-lg">' +
                '<h3 class="font-display font-semibold mb-2">📍 Direccion</h3>' +
                '<p class="text-slate-600">' + c.direccion + ', ' + c.localidad + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="flex flex-wrap gap-3">' +
              '<a href="tel:' + c.telefono + '" class="btn-primary">📞 Llamar</a>' +
              '<a href="https://wa.me/' + c.whatsapp + '" target="_blank" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition-colors">💬 WhatsApp</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
}

// ============================================
// RENDER: CAPACITACIONES
// ============================================
function renderCapacitaciones(container) {
  var capacitacionesHTML = ARCADIA_DATA.capacitaciones.map(function(c) {
    return '<a href="#capacitacion/' + c.id + '" class="group card-angular p-6">' +
      '<div class="flex items-center gap-3 mb-4">' +
        '<img src="' + c.instructorFoto + '" alt="' + c.instructor + '" class="w-14 h-14 rounded-full object-cover ring-2 ring-accent/20">' +
        '<div>' +
          '<p class="font-display font-semibold">' + c.instructor + '</p>' +
          '<p class="text-sm text-accent">' + c.categoria + '</p>' +
        '</div>' +
      '</div>' +
      '<h3 class="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">' + c.titulo + '</h3>' +
      '<p class="text-sm text-slate-600 mb-4 line-clamp-2">' + c.descripcion + '</p>' +
      '<div class="space-y-2 text-sm">' +
        '<div class="flex justify-between"><span class="text-slate-500">Duracion</span><span class="font-medium">' + c.duracion + '</span></div>' +
        '<div class="flex justify-between"><span class="text-slate-500">Modalidad</span><span class="font-medium">' + c.modalidad + '</span></div>' +
        '<div class="flex justify-between"><span class="text-slate-500">Inicio</span><span class="font-medium">' + new Date(c.inicio).toLocaleDateString('es-AR') + '</span></div>' +
      '</div>' +
      '<div class="mt-4 pt-4 border-t border-slate-100">' +
        '<div class="flex items-center justify-between">' +
          '<span class="font-display text-2xl font-bold text-teal-600">$' + c.precio.toLocaleString() + '</span>' +
          '<span class="' + (c.inscritos >= c.cupos ? 'text-red-500' : 'text-emerald-600') + ' text-sm font-medium">' +
            (c.inscritos >= c.cupos ? 'Completo' : (c.cupos - c.inscritos) + ' cupos') +
          '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }).join('');

  container.innerHTML =
    '<section class="bg-slate-50 min-h-screen py-8">' +
      '<div class="max-w-6xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">Capacitaciones</span>' +
        '</nav>' +
        '<div class="mb-8">' +
          '<h1 class="font-display text-3xl font-bold mb-2">Capacitaciones en <span class="text-teal-600">oficios</span></h1>' +
          '<p class="text-slate-600">Aprende de los que saben. Cursos practicos dictados por profesionales de la zona.</p>' +
        '</div>' +
        '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">' +
          capacitacionesHTML +
        '</div>' +
      '</div>' +
    '</section>';
}

// ============================================
// RENDER: CAPACITACION
// ============================================
function renderCapacitacion(container, id) {
  var c = getCapacitacionById(id);
  if (!c) {
    container.innerHTML = '<div class="text-center py-20"><h2 class="font-display text-2xl font-bold">Capacitacion no encontrada</h2></div>';
    return;
  }

  var contenidosHTML = c.contenidos.map(function(item) {
    return '<li class="flex items-center gap-2"><span class="text-accent">✓</span><span>' + item + '</span></li>';
  }).join('');

  var requisitosHTML = c.requisitos.map(function(req) {
    return '<li class="flex items-center gap-2"><span class="text-slate-400">•</span><span class="text-slate-600">' + req + '</span></li>';
  }).join('');

  container.innerHTML =
    '<section class="bg-slate-50 py-8">' +
      '<div class="max-w-4xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<a href="#capacitaciones" class="text-slate-500 hover:text-primary">Capacitaciones</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">' + c.titulo + '</span>' +
        '</nav>' +

        '<div class="card-angular overflow-hidden">' +
          '<div class="bg-teal-600 p-8 text-white">' +
            '<span class="tag-angular bg-white/20 text-white mb-4 inline-block rounded">' + c.categoria + '</span>' +
            '<h1 class="font-display text-3xl font-bold mb-4">' + c.titulo + '</h1>' +
            '<div class="flex items-center gap-4">' +
              '<img src="' + c.instructorFoto + '" alt="' + c.instructor + '" class="w-12 h-12 rounded-full ring-2 ring-white/30">' +
              '<div>' +
                '<p class="font-semibold">Instructor: ' + c.instructor + '</p>' +
                '<p class="text-white/70 text-sm">' + c.lugar + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="p-8">' +
            '<div class="grid md:grid-cols-3 gap-8">' +
              '<div class="md:col-span-2 space-y-6">' +
                '<div>' +
                  '<h2 class="font-display font-bold text-lg mb-3">Descripcion</h2>' +
                  '<p class="text-slate-600">' + c.descripcion + '</p>' +
                '</div>' +
                '<div>' +
                  '<h2 class="font-display font-bold text-lg mb-3">Contenidos</h2>' +
                  '<ul class="space-y-2">' + contenidosHTML + '</ul>' +
                '</div>' +
                '<div>' +
                  '<h2 class="font-display font-bold text-lg mb-3">Requisitos</h2>' +
                  '<ul class="space-y-2">' + requisitosHTML + '</ul>' +
                '</div>' +
              '</div>' +

              '<div>' +
                '<div class="bg-slate-50 p-5 rounded-xl sticky top-20">' +
                  '<div class="text-center mb-4">' +
                    '<span class="font-display text-3xl font-bold text-teal-600">$' + c.precio.toLocaleString() + '</span>' +
                  '</div>' +
                  '<div class="space-y-3 text-sm mb-4">' +
                    '<div class="flex justify-between"><span class="text-slate-500">Duracion</span><span class="font-medium">' + c.duracion + '</span></div>' +
                    '<div class="flex justify-between"><span class="text-slate-500">Modalidad</span><span class="font-medium">' + c.modalidad + '</span></div>' +
                    '<div class="flex justify-between"><span class="text-slate-500">Inicio</span><span class="font-medium">' + new Date(c.inicio).toLocaleDateString('es-AR') + '</span></div>' +
                    '<div class="flex justify-between"><span class="text-slate-500">Cupos</span><span class="font-medium">' + c.inscritos + '/' + c.cupos + '</span></div>' +
                  '</div>' +
                  '<div class="w-full bg-slate-200 h-2 rounded-full mb-4">' +
                    '<div class="bg-teal-500 h-2 rounded-full" style="width: ' + ((c.inscritos/c.cupos)*100) + '%"></div>' +
                  '</div>' +
                  '<button onclick="inscribirCapacitacion(' + c.id + ')" class="' + (c.inscritos >= c.cupos ? 'bg-slate-300 cursor-not-allowed rounded-md py-3' : 'btn-primary') + ' w-full text-center" ' + (c.inscritos >= c.cupos ? 'disabled' : '') + '>' +
                    (c.inscritos >= c.cupos ? 'Sin cupos' : 'Inscribirme') +
                  '</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
}

function inscribirCapacitacion(id) {
  alert('Gracias por tu interes! Te contactaremos pronto para completar la inscripcion.');
}

// ============================================
// RENDER: TRABAJO
// ============================================
function renderTrabajo(container) {
  var trabajosHTML = ARCADIA_DATA.trabajos.filter(function(t) { return t.activo; }).map(function(t) {
    var requisitosHTML = t.requisitos.map(function(r) { return '<li>• ' + r + '</li>'; }).join('');
    var beneficiosHTML = t.beneficios.map(function(b) { return '<li>• ' + b + '</li>'; }).join('');

    return '<div class="card-angular p-6">' +
      '<div class="flex flex-wrap items-start justify-between gap-4 mb-4">' +
        '<div>' +
          '<span class="tag-angular bg-amber-100 text-amber-500 mb-2">' + t.tipo + '</span>' +
          '<h2 class="font-display text-xl font-bold">' + t.titulo + '</h2>' +
          '<p class="text-slate-500">' + t.empresa + ' - ' + t.localidad + '</p>' +
        '</div>' +
        '<span class="text-sm text-slate-400">' + new Date(t.fecha).toLocaleDateString('es-AR') + '</span>' +
      '</div>' +
      '<p class="text-slate-600 mb-4">' + t.descripcion + '</p>' +
      '<div class="grid sm:grid-cols-2 gap-4 mb-4">' +
        '<div><h3 class="font-display font-semibold text-sm mb-2">Requisitos</h3><ul class="text-sm text-slate-600 space-y-1">' + requisitosHTML + '</ul></div>' +
        '<div><h3 class="font-display font-semibold text-sm mb-2">Beneficios</h3><ul class="text-sm text-slate-600 space-y-1">' + beneficiosHTML + '</ul></div>' +
      '</div>' +
      '<div class="flex items-center gap-4 pt-4 border-t border-slate-100">' +
        '<a href="mailto:' + t.contacto + '" class="btn-primary"><span>Postularme</span></a>' +
        '<span class="text-sm text-slate-500">' + t.contacto + '</span>' +
      '</div>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<section class="bg-slate-50 min-h-screen py-8">' +
      '<div class="max-w-4xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">Trabajo</span>' +
        '</nav>' +
        '<div class="mb-8">' +
          '<h1 class="font-display text-3xl font-bold mb-2">Oportunidades de <span class="text-emerald-700">trabajo</span></h1>' +
          '<p class="text-slate-600">Trabajo real en la Comarca. Sin vueltas.</p>' +
        '</div>' +
        '<div class="space-y-6">' + trabajosHTML + '</div>' +
        '<div class="mt-8 card-angular p-8 text-center">' +
          '<h3 class="font-display font-bold text-lg mb-2">Tenes una oportunidad laboral?</h3>' +
          '<p class="text-slate-600 mb-4">Publica tu busqueda y llega a toda la comunidad</p>' +
          '<a href="#registro/trabajo" class="btn-primary inline-block"><span>Publicar busqueda</span></a>' +
        '</div>' +
      '</div>' +
    '</section>';
}

// ============================================
// RENDER: REGISTRO
// ============================================
function renderRegistro(container, tipo) {
  tipo = tipo || 'vecino';
  var tipos = {
    vecino: { titulo: 'Registrate como vecino', desc: 'Accede a servicios, comercios y beneficios exclusivos' },
    prestador: { titulo: 'Ofrece tus servicios', desc: 'Llega a mas clientes y hace crecer tu trabajo' },
    comercio: { titulo: 'Registra tu comercio', desc: 'Digitaliza tu negocio y llega a toda la comarca' }
  };

  var info = tipos[tipo] || tipos.vecino;

  container.innerHTML =
    '<section class="bg-slate-50 min-h-screen py-8">' +
      '<div class="max-w-xl mx-auto px-4">' +
        '<nav class="text-sm mb-6">' +
          '<a href="#home" class="text-slate-500 hover:text-primary">Inicio</a>' +
          '<span class="mx-2 text-slate-400">/</span>' +
          '<span class="text-slate-700">Registro</span>' +
        '</nav>' +

        '<div class="flex gap-2 mb-6">' +
          '<a href="#registro/vecino" class="flex-1 py-2 px-4 text-center font-medium transition-colors ' + (tipo === 'vecino' ? 'btn-primary' : 'btn-secondary') + '">' +
            (tipo === 'vecino' ? '<span>Vecino</span>' : 'Vecino') +
          '</a>' +
          '<a href="#registro/prestador" class="flex-1 py-2 px-4 text-center font-medium transition-colors ' + (tipo === 'prestador' ? 'btn-primary' : 'btn-secondary') + '">' +
            (tipo === 'prestador' ? '<span>Prestador</span>' : 'Prestador') +
          '</a>' +
          '<a href="#registro/comercio" class="flex-1 py-2 px-4 text-center font-medium transition-colors ' + (tipo === 'comercio' ? 'btn-primary' : 'btn-secondary') + '">' +
            (tipo === 'comercio' ? '<span>Comercio</span>' : 'Comercio') +
          '</a>' +
        '</div>' +

        '<div class="card-angular p-8">' +
          '<h1 class="font-display text-2xl font-bold mb-2">' + info.titulo + '</h1>' +
          '<p class="text-slate-600 mb-6">' + info.desc + '</p>' +

          '<form id="form-registro" class="space-y-4">' +
            renderFormularioRegistro(tipo) +
            '<div class="pt-4">' +
              '<button type="submit" class="btn-primary w-full"><span>Registrarme</span></button>' +
            '</div>' +
            '<p class="text-xs text-slate-500 text-center">Al registrarte aceptas nuestros <a href="#" class="text-accent hover:underline">terminos</a></p>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</section>';

  var formEl = document.getElementById('form-registro');
  if (formEl) {
    formEl.addEventListener('submit', function(e) {
      e.preventDefault();
      handleRegistro(tipo, new FormData(e.target));
    });
  }
}

function renderFormularioRegistro(tipo) {
  var localidadesOptions = ARCADIA_DATA.localidades.map(function(loc) {
    return '<option value="' + loc + '">' + loc + '</option>';
  }).join('');

  var camposComunes =
    '<div class="grid sm:grid-cols-2 gap-4">' +
      '<div><label class="block text-sm font-medium mb-1">Nombre *</label><input name="nombre" type="text" required class="w-full input-angular px-4 py-2 bg-white"></div>' +
      '<div><label class="block text-sm font-medium mb-1">Apellido *</label><input name="apellido" type="text" required class="w-full input-angular px-4 py-2 bg-white"></div>' +
    '</div>' +
    '<div><label class="block text-sm font-medium mb-1">Email *</label><input name="email" type="email" required class="w-full input-angular px-4 py-2 bg-white"></div>' +
    '<div><label class="block text-sm font-medium mb-1">Telefono *</label><input name="telefono" type="tel" required placeholder="294-4XXXXXX" class="w-full input-angular px-4 py-2 bg-white"></div>' +
    '<div><label class="block text-sm font-medium mb-1">Localidad *</label><select name="localidad" required class="w-full input-angular px-4 py-2 bg-white"><option value="">Selecciona</option>' + localidadesOptions + '</select></div>';

  if (tipo === 'vecino') return camposComunes;

  if (tipo === 'prestador') {
    var categoriasOptions = ARCADIA_DATA.categorias.map(function(cat) {
      return '<option value="' + cat.id + '">' + cat.icono + ' ' + cat.nombre + '</option>';
    }).join('');

    return camposComunes +
      '<div><label class="block text-sm font-medium mb-1">Categoria *</label><select name="categoria" required class="w-full input-angular px-4 py-2 bg-white"><option value="">Selecciona</option>' + categoriasOptions + '</select></div>' +
      '<div><label class="block text-sm font-medium mb-1">Descripcion *</label><textarea name="descripcion" required rows="3" placeholder="Contanos tus servicios..." class="w-full input-angular px-4 py-2 bg-white"></textarea></div>' +
      '<div><label class="block text-sm font-medium mb-1">Experiencia (años)</label><input name="experiencia" type="number" min="0" class="w-full input-angular px-4 py-2 bg-white"></div>';
  }

  if (tipo === 'comercio') {
    return '<div><label class="block text-sm font-medium mb-1">Nombre del comercio *</label><input name="nombre_comercio" type="text" required class="w-full input-angular px-4 py-2 bg-white"></div>' +
      '<div><label class="block text-sm font-medium mb-1">Rubro *</label><input name="rubro" type="text" required placeholder="Ej: Ferreteria" class="w-full input-angular px-4 py-2 bg-white"></div>' +
      camposComunes +
      '<div><label class="block text-sm font-medium mb-1">Direccion *</label><input name="direccion" type="text" required class="w-full input-angular px-4 py-2 bg-white"></div>' +
      '<div><label class="block text-sm font-medium mb-1">Descripcion *</label><textarea name="descripcion" required rows="3" class="w-full input-angular px-4 py-2 bg-white"></textarea></div>' +
      '<div><label class="block text-sm font-medium mb-1">Horario</label><input name="horario" type="text" placeholder="Lun a Sab 9 a 18hs" class="w-full input-angular px-4 py-2 bg-white"></div>';
  }

  return camposComunes;
}

function handleRegistro(tipo, formData) {
  var data = {};
  formData.forEach(function(value, key) { data[key] = value; });
  data.tipo = tipo;
  data.fecha = new Date().toISOString();
  data.id = Date.now();

  var registros = JSON.parse(localStorage.getItem('arcadia_registros') || '[]');
  registros.push(data);
  localStorage.setItem('arcadia_registros', JSON.stringify(registros));

  showModal(
    '<div class="text-center">' +
      '<div class="text-6xl mb-4">🎉</div>' +
      '<h2 class="font-display text-2xl font-bold mb-2">Registro exitoso!</h2>' +
      '<p class="text-slate-600 mb-6">Gracias por unirte a Arcadia. Te contactaremos pronto.</p>' +
      '<button onclick="closeModal()" class="btn-primary"><span>Entendido</span></button>' +
    '</div>'
  );
}

// ============================================
// RENDER: NOSOTROS
// ============================================
function renderNosotros(container) {
  container.innerHTML =
    '<section class="bg-white py-16">' +
      '<div class="max-w-4xl mx-auto px-4">' +
        '<h1 class="font-display text-4xl font-bold mb-6 text-center">Sobre <span class="text-teal-600">Arcadia</span></h1>' +
        '<p class="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">' +
          'La comunidad digital de la Comarca Andina. Conectamos oficios, comercios y vecinos.' +
        '</p>' +

        '<div class="grid md:grid-cols-2 gap-6 mb-12">' +
          '<div class="card-angular p-6">' +
            '<h3 class="font-display font-bold text-xl mb-3">🎯 Nuestra mision</h3>' +
            '<p class="text-slate-600">Resolver problemas reales de la economia cotidiana en la Comarca Andina, conectando a quienes saben hacer con quienes necesitan.</p>' +
          '</div>' +
          '<div class="card-angular p-6">' +
            '<h3 class="font-display font-bold text-xl mb-3">🌱 Nuestros valores</h3>' +
            '<p class="text-slate-600">Transparencia, competencia justa, cumplimiento y proteccion tanto del usuario como del trabajador.</p>' +
          '</div>' +
        '</div>' +

        '<h2 class="font-display text-2xl font-bold mb-6">Que hace diferente a Arcadia?</h2>' +
        '<ul class="space-y-4 mb-12">' +
          '<li class="flex gap-3"><span class="text-accent text-xl">✓</span><div><strong>Soberania digital:</strong> Servidor propio, datos locales, control total.</div></li>' +
          '<li class="flex gap-3"><span class="text-accent text-xl">✓</span><div><strong>Economia real:</strong> No prometemos unicornios. Prometemos laburo posible.</div></li>' +
          '<li class="flex gap-3"><span class="text-accent text-xl">✓</span><div><strong>Educacion aplicada:</strong> Capacitacion en oficios orientada a la practica.</div></li>' +
          '<li class="flex gap-3"><span class="text-accent text-xl">✓</span><div><strong>Criterios de calidad:</strong> Defendemos al buen laburante del improvisado.</div></li>' +
        '</ul>' +

        '<div class="bg-teal-600 text-white p-8 text-center rounded-xl">' +
          '<h2 class="font-display text-2xl font-bold mb-4">Queres ser parte?</h2>' +
          '<p class="text-white/80 mb-6">Sumate como vecino, prestador de servicios o comercio.</p>' +
          '<a href="#registro" class="inline-block px-6 py-3 bg-white text-teal-700 font-bold rounded-md hover:bg-slate-100 transition-colors">Registrarme ahora</a>' +
        '</div>' +
      '</div>' +
    '</section>';
}

// ============================================
// UTILIDADES
// ============================================
function showModal(content) {
  var modal = document.createElement('div');
  modal.id = 'modal-overlay';
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = '<div class="bg-white p-8 max-w-md w-full rounded-xl shadow-xl" onclick="event.stopPropagation()">' + content + '</div>';
  modal.addEventListener('click', closeModal);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var modal = document.getElementById('modal-overlay');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

window.closeModal = closeModal;
window.inscribirCapacitacion = inscribirCapacitacion;
