// ── Carga el menú desde el JSON y gestiona la carta ──────────────

let menuData = null;

async function cargarMenu() {
  try {
    const res = await fetch('content/menu.json');
    menuData = await res.json();
    construirCarta();
  } catch (e) {
    console.error('No se pudo cargar el menú:', e);
  }
}

function construirCarta() {
  const { categorias } = menuData;

  // 1. Tabs de categoría
  const tabsContainer = document.getElementById('categoria-tabs');
  categorias.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' activo' : '');
    btn.dataset.id = cat.id;
    btn.innerHTML = `${cat.icono} ${cat.nombre}`;
    btn.addEventListener('click', () => cambiarCategoria(cat.id));
    tabsContainer.appendChild(btn);
  });

  // 2. Mostrar primera categoría
  mostrarPlatos(categorias[0].id);
}

function cambiarCategoria(id) {
  // Actualizar tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('activo', btn.dataset.id === id);
  });

  // Mostrar platos con animación
  const grid = document.getElementById('grid-platos');
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(8px)';
  grid.style.transition = 'opacity 0.2s, transform 0.2s';

  setTimeout(() => {
    mostrarPlatos(id);
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 180);
}

function mostrarPlatos(categoriaId) {
  const categoria = menuData.categorias.find(c => c.id === categoriaId);
  const grid = document.getElementById('grid-platos');
  grid.innerHTML = '';

  categoria.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card-plato';

    const fotoHTML = item.foto
      ? `<img src="${item.foto}" alt="${item.nombre}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=foto-placeholder>${categoria.icono}</span>'">`
      : `<span class="foto-placeholder">${categoria.icono}</span>`;

    card.innerHTML = `
      <div class="foto-wrapper">${fotoHTML}</div>
      <div class="info">
        <div class="nombre">${item.nombre}</div>
        <div class="descripcion">${item.descripcion}</div>
        <div class="precio">${parseFloat(item.precio).toFixed(2)} €</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Navbar activo al hacer scroll ─────────────────────────────────

function actualizarNavActivo() {
  const secciones = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  let actual = '';

  secciones.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) actual = sec.id;
  });

  links.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === actual);
  });
}

// ── Scroll suave para links internos ──────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Cargar carta
  if (document.getElementById('categoria-tabs')) cargarMenu();

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  // Navbar activo
  window.addEventListener('scroll', actualizarNavActivo, { passive: true });
  actualizarNavActivo();

  // Cerrar menú móvil al pulsar un enlace
  const navbarCollapse = document.getElementById('navbarNav');
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        document.querySelector('.navbar-toggler').click();
      }
    });
  });

  // Formulario de contacto (placeholder)
  const form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-enviar');
      btn.textContent = '¡Mensaje enviado!';
      btn.style.background = '#2d7a4f';
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
});
