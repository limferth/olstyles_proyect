const products = [
  {
    name: "Training Core Tee",
    description: "Camiseta deportiva ligera para sesiones intensas y uso diario.",
    image: "https://i.imgur.com/i111zdT.jpeg",
    tag: "Nuevo"
  },
  {
    name: "Performance Fit Set",
    description: "Conjunto funcional con ajuste comodo para movilidad total.",
    image: "https://i.imgur.com/0BcjYgy.jpeg",
    tag: "Top"
  },
  {
    name: "OL Active Denim",
    description: "Estilo urbano con resistencia para una rutina activa.",
    image: "./assets_ol/photo3.jpg",
    tag: "Estilo"
  },
  {
    name: "Recovery Sport Layer",
    description: "Capa versatil para calentar, entrenar y mantener presencia.",
    image: "https://i.imgur.com/1JAwSre.jpeg",
    tag: "Pro"
  },
  {
    name: "Zapatos deportivos de calidad",
    description: "Practica tu deporte con los mejores Tenises,del mercado",
    image: "https://i.imgur.com/xaSLneh.jpeg",
    tag: "shoes"
  },
  {
    name: "Poleras de compresion",
    description: "Las poleras de compresion que es tu aliado favorito, para ganar",
    image: "https://i.imgur.com/vFOkcCk.jpeg",
    tag: "Estrella"
  }
];

const productGrid = document.querySelector("[data-products]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = products.map((product) => `
    <article class="product-card reveal">
      <div class="product-card__media">
        <img src="${product.image}" alt="${product.name}" width="328" height="512" loading="lazy">
        <span class="product-card__tag">${product.tag}</span>
      </div>
      <div class="product-card__body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a class="button button--primary" href="#contacto" aria-label="Consultar ${product.name}">Consultar</a>
      </div>
    </article>
  `).join("");
}

function setupMenu() {
  if (!menu || !menuToggle) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function setupHeader() {
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach((element) => observer.observe(element));
}

renderProducts();
setupMenu();
setupHeader();
setupReveal();

if (year) {
  year.textContent = new Date().getFullYear();
}
