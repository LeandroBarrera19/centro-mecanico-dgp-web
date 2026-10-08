// Comportamiento del sitio, compartido por todas las páginas. Cada parte
// revisa que su elemento exista, porque no todas las páginas tienen todo.
// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
function closeMobileMenu() {
  navMobile.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
}
// Escape cierra el menú abierto y devuelve el foco al botón que lo abre.
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMobile.classList.contains('open')) {
    closeMobileMenu();
    navToggle.focus();
  }
});
// Al ensanchar la ventana con el menú abierto quedaban los dos menús
// visibles a la vez (P-042). Se cierra cuando el botón deja de mostrarse,
// que es la condición que fija el CSS: así el ancho de corte vive en un solo
// lugar y no hay que repetirlo acá.
window.addEventListener('resize', () => {
  if (navMobile.classList.contains('open') &&
      getComputedStyle(navToggle).display === 'none') {
    closeMobileMenu();
  }
}, { passive: true });

// Service tabs (patrón de pestañas WAI-ARIA: solo la pestaña activa entra
// en el recorrido con Tab; entre pestañas se pasa con las flechas, Inicio y
// Fin)
const tabBtns = [...document.querySelectorAll('.tab-btn')];
const tabPanels = document.querySelectorAll('.tab-panel');
// La dirección de cada pestaña: el botón pestana-mecanica es #servicios-mecanica.
const direccion = btn => '#servicios-' + btn.id.replace('pestana-', '');
function activarPestana(btn) {
  tabBtns.forEach(b => {
    const activa = b === btn;
    b.classList.toggle('active', activa);
    b.setAttribute('aria-selected', activa);
    b.tabIndex = activa ? 0 : -1;
  });
  tabPanels.forEach(p => p.classList.toggle('active', p.id === btn.getAttribute('aria-controls')));
}
tabBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    activarPestana(btn);
    // La pestaña queda en la dirección, para poder compartirla. replaceState
    // no desplaza la página ni suma una entrada al historial.
    history.replaceState(null, '', direccion(btn));
  });
  btn.addEventListener('keydown', e => {
    const n = tabBtns.length;
    const destino = {
      ArrowRight: tabBtns[(i + 1) % n],
      ArrowLeft: tabBtns[(i - 1 + n) % n],
      Home: tabBtns[0],
      End: tabBtns[n - 1],
    }[e.key];
    if (!destino) return;
    e.preventDefault();
    destino.focus();
    destino.click();
  });
});
// Una dirección #servicios-<pestaña>, al cargar o al cambiar (enlaces del
// pie, "Atrás", "Adelante"), abre esa pestaña. El desplazamiento lo hace el
// navegador, hasta la marca .ancla-pestana.
function pestanaDesdeDireccion() {
  const btn = tabBtns.find(b => direccion(b) === location.hash);
  if (btn) activarPestana(btn);
}
window.addEventListener('hashchange', pestanaDesdeDireccion);
pestanaDesdeDireccion();

// Fade-in on scroll (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Franja de marcas: la cinta avanza sola y se puede arrastrar con el mouse,
// deslizar con el dedo, correr con el trackpad o con las flechas del
// teclado, para los dos lados. Se frena con el mouse encima o con el foco
// del teclado, y fuera de pantalla no gasta cuadros. El grupo de logos va
// dos veces: la posición se toma módulo el ancho de un grupo, así el empalme
// no se ve en ninguna dirección. Con movimiento reducido (también si se
// activa con la página abierta) queda quieta y el CSS la pasa a filas.
const cinta = document.getElementById('cintaMarcas');
if (cinta) {
  const ventana = cinta.querySelector('.brands-ventana');
  const pista = cinta.querySelector('.brands-pista');
  const grupo = pista.querySelector('.brands-grupo');
  const reducido = matchMedia('(prefers-reduced-motion: reduce)');
  const VUELTA = 38;     // s para recorrer un grupo entero, como la animación anterior
  const ESPERA = 1500;   // ms quieta después de un deslizamiento táctil o de trackpad
  const PASO = 80;       // px por cada flecha del teclado
  let x = 0, anterior = 0, cuadro = 0, visible = false, encima = false;
  let arrastre = null, quietaHasta = 0;

  const ancho = () => grupo.offsetWidth;
  const ubicar = () => {
    const w = ancho();
    if (w) x = ((x % w) + w) % w;
    pista.style.transform = reducido.matches ? '' : `translateX(${-x}px)`;
  };
  const paso = ahora => {
    const dt = anterior ? Math.min(ahora - anterior, 100) : 0;
    anterior = ahora;
    const frenada = arrastre || encima || cinta.matches(':focus-visible') || ahora < quietaHasta;
    if (!frenada) {
      x += ancho() / VUELTA * dt / 1000;
      ubicar();
    }
    cuadro = requestAnimationFrame(paso);
  };
  const arrancar = () => {
    if (!cuadro && visible && !reducido.matches) { anterior = 0; cuadro = requestAnimationFrame(paso); }
  };
  const parar = () => { cancelAnimationFrame(cuadro); cuadro = 0; };
  // Solo es una parada del teclado mientras se mueve.
  const preparar = () => {
    if (reducido.matches) {
      parar();
      cinta.removeAttribute('tabindex');
      pista.style.transform = '';
    } else {
      cinta.tabIndex = 0;
      ubicar();
      arrancar();
    }
  };
  reducido.addEventListener('change', preparar);

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    visible ? arrancar() : parar();
  }).observe(ventana);

  ventana.addEventListener('mouseenter', () => { encima = true; });
  ventana.addEventListener('mouseleave', () => { encima = false; });

  ventana.addEventListener('pointerdown', e => {
    if (e.button !== 0 || reducido.matches) return;
    arrastre = { id: e.pointerId, desde: e.clientX, x0: x };
    ventana.setPointerCapture(e.pointerId);
    ventana.classList.add('arrastrando');
  });
  ventana.addEventListener('pointermove', e => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    x = arrastre.x0 - (e.clientX - arrastre.desde);
    ubicar();
  });
  const soltar = e => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    arrastre = null;
    ventana.classList.remove('arrastrando');
    if (e.pointerType !== 'mouse') quietaHasta = performance.now() + ESPERA;
  };
  ventana.addEventListener('pointerup', soltar);
  ventana.addEventListener('pointercancel', soltar);

  // Trackpad o rueda horizontal; la rueda vertical sigue moviendo la página.
  ventana.addEventListener('wheel', e => {
    if (reducido.matches || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    x += e.deltaX;
    ubicar();
    quietaHasta = performance.now() + ESPERA;
  }, { passive: false });

  cinta.addEventListener('keydown', e => {
    if (reducido.matches || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    x += e.key === 'ArrowRight' ? PASO : -PASO;
    ubicar();
  });

  addEventListener('resize', ubicar);
  preparar();
}

if (!menosMovimiento) {
  // Cifras del inicio: suben desde cero hasta el valor escrito en el HTML,
  // que es el que queda al final. Sin JavaScript o con movimiento reducido
  // se ve el valor directamente.
  const cifras = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      cifras.unobserve(entrada.target);
      const el = entrada.target;
      const final = el.textContent;
      const m = final.match(/^(\+?)(\d+)(?:,(\d+))?(%?)$/);
      if (!m) return;
      const decimales = m[3] ? m[3].length : 0;
      const objetivo = parseFloat(m[2] + '.' + (m[3] || '0'));
      const inicio = performance.now();
      const paso = ahora => {
        const t = Math.min((ahora - inicio) / 1300, 1);
        const v = objetivo * (1 - Math.pow(1 - t, 3));
        el.textContent = t < 1 ? m[1] + v.toFixed(decimales).replace('.', ',') + m[4] : final;
        if (t < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-num').forEach(el => cifras.observe(el));

  // Texto que se llena al bajar (Aurora): las palabras pasan de gris claro
  // al color del texto a medida que el párrafo sube por la pantalla. El
  // texto no cambia: solo se envuelve cada palabra en un <span>.
  document.querySelectorAll('.texto-llenado').forEach(p => {
    const palabras = p.textContent.trim().split(/\s+/);
    p.textContent = '';
    palabras.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'palabra';
      span.textContent = w;
      p.append(span, i < palabras.length - 1 ? ' ' : '');
    });
    p.classList.add('llenando');
    const spans = [...p.querySelectorAll('.palabra')];
    let pedido = false;
    const actualizar = () => {
      pedido = false;
      const r = p.getBoundingClientRect();
      const avance = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
      const n = Math.round(Math.max(0, Math.min(1, avance)) * spans.length);
      spans.forEach((s, i) => s.classList.toggle('llena', i < n));
    };
    addEventListener('scroll', () => { if (!pedido) { pedido = true; requestAnimationFrame(actualizar); } }, { passive: true });
    actualizar();
  });
}

// Año del copyright
document.getElementById('anio-copyright').textContent = new Date().getFullYear();

// Deslizante de productos (repuestos.html): las flechas corren la fila casi
// un ancho de pantalla y se desactivan en cada punta.
const pista = document.getElementById('productosPista');
if (pista) {
  const flechas = document.querySelectorAll('.productos-flecha');
  const actualizarFlechas = () => {
    const max = pista.scrollWidth - pista.clientWidth - 2;
    flechas.forEach(b => { b.disabled = b.dataset.dir === '-1' ? pista.scrollLeft <= 2 : pista.scrollLeft >= max; });
  };
  flechas.forEach(b => b.addEventListener('click', () => {
    pista.scrollBy({ left: Number(b.dataset.dir) * pista.clientWidth * 0.8, behavior: menosMovimiento ? 'auto' : 'smooth' });
  }));
  pista.addEventListener('scroll', actualizarFlechas, { passive: true });
  addEventListener('resize', actualizarFlechas, { passive: true });
  actualizarFlechas();
}
