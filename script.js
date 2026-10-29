
"use strict";

/* MAYORIX AGRO — SHARED WEBSITE JAVASCRIPT */

const CART_KEY = "mayorix_agro_cart_v1";
const DELIVERY_KEY = "mayorix_agro_delivery_v1";

const navigation = [
  ["Home", "index.html"],
  ["Products", "products.html"],
  ["Bulk Supply", "bulk-supply.html"],
  ["Source Produce", "sourcing.html"],
  ["Delivery", "delivery.html"],
  ["About Us", "about.html"],
  ["Contact", "contact.html"]
];

/* Catalogue examples. Availability and prices are not guaranteed. */

const products = [
  {
    id: "tomatoes",
    name: "Tomatoes",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",
    description: "Tomato supply enquiries for traders, homes and food businesses.",
    units: ["Basket", "Crate"]
  },
  {
    id: "pepper",
    name: "Pepper",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=900&q=80",
    description: "Ask about pepper availability, quality and quantity.",
    units: ["Basket", "Crate"]
  },
  {
    id: "okra",
    name: "Okra",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=80",
    description: "Produce enquiries for households, traders and food businesses.",
    units: ["Basket", "Crate"]
  },
  {
    id: "garden-eggs",
    name: "Garden Eggs",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",
    description: "Request current availability and a quotation.",
    units: ["Basket", "Crate"]
  },
  {
    id: "cabbage",
    name: "Cabbage",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=900&q=80",
    description: "Enquire about seasonal cabbage supply.",
    units: ["Basket", "Crate"]
  },
  {
    id: "other-produce",
    name: "Other Produce",
    category: "other",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    description: "Ask about other produce and sourcing requirements.",
    units: ["Basket", "Crate"]
  }
];

function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCart() {
  const saved = readStorage(CART_KEY, []);
  return Array.isArray(saved) ? saved : [];
}

function saveCart(cart) {
  writeStorage(CART_KEY, cart);
  updateCartCount();
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach(element => {
    element.textContent = getCartCount();
  });
}

/* Shared header */

function renderHeader() {
  const target = $("#siteHeader");
  if (!target) return;

  const currentPage = location.pathname.split("/").pop() || "index.html";

  target.innerHTML = `
    <div class="announcement">
      Fresh Produce. Reliable Supply. Bigger Markets.
    </div>

    <header class="site-header">
      <div class="container header-inner">
        <a href="index.html" class="brand" aria-label="MAYORIX AGRO homepage">
          <span class="brand-mark">M</span>
          <span class="brand-text">
            <strong>MAYORIX AGRO</strong>
            <small>Agriculture Without Boundaries</small>
          </span>
        </a>

        <button class="menu-toggle" type="button"
          aria-label="Open navigation menu"
          aria-expanded="false" aria-controls="mainNav">
          ☰
        </button>

        <nav class="main-nav" id="mainNav" aria-label="Main navigation">
          ${navigation.map(([label, href]) => `
            <a href="${href}"
              ${currentPage === href ? 'aria-current="page"' : ""}>
              ${label}
            </a>
          `).join("")}
        </nav>

        <div class="header-actions">
          <a class="cart-link" href="cart.html">
            Cart <span class="cart-count" data-cart-count>0</span>
          </a>
          <a class="btn btn-primary" href="checkout.html">Sign in</a>
        </div>
      </div>
    </header>
  `;

  const button = $(".menu-toggle", target);
  const nav = $("#mainNav", target);

  button.addEventListener("click", () => {
    const opened = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(opened));
    button.setAttribute(
      "aria-label",
      opened ? "Close navigation menu" : "Open navigation menu"
    );
  });
}

/* Shared footer */

function renderFooter() {
  const target = $("#siteFooter");
  if (!target) return;

  target.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="footer-brand" href="index.html">MAYORIX AGRO</a>
          <p>
            Connecting customers with fresh produce through clear quotations,
            informed decisions and a growing agricultural vision.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <a href="products.html">Products</a>
          <a href="bulk-supply.html">Bulk Supply</a>
          <a href="sourcing.html">Source Produce</a>
        </div>

        <div>
          <h3>Customer service</h3>
          <a href="delivery.html">Delivery</a>
          <a href="contact.html">Contact Us</a>
          <a href="cart.html">Shopping Cart</a>
        </div>

        <div>
          <h3>Orders</h3>
          <a href="checkout.html">Sign in / Create account</a>
          <a href="delivery.html">Delivery details</a>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>© ${new Date().getFullYear()} MAYORIX AGRO. All rights reserved.</p>
        <p>Prices and availability are confirmed before an order is accepted.</p>
      </div>
    </footer>
  `;
}

/* Product catalogue */

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.style.display='none'">
        <span class="product-badge">Confirm availability</span>
      </div>

      <div class="product-info">
        <p class="product-category">${escapeHTML(product.category)}</p>
        <h3>${escapeHTML(product.name)}</h3>
        <p class="product-description">${escapeHTML(product.description)}</p>
        <p class="product-price">Price: Request current quotation</p>

        <label class="product-unit-label">
          Selling unit
          <select data-unit-for="${product.id}">
            ${product.units.map(unit => `
              <option value="${unit}">${unit}</option>
            `).join("")}
          </select>
        </label>

        <div class="product-actions">
          <button type="button" class="btn btn-primary"
            data-add-product="${product.id}">
            Add to Cart
          </button>
          <a class="text-link"
            href="contact.html?product=${encodeURIComponent(product.name)}">
            Request a quote
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(list = products) {
  const grid = $("#productGrid");
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No matching products</h3>
        <p>Try another search or category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(productCard).join("");
}

function setupProductFilters() {
  const search = $("#productSearch");
  const buttons = document.querySelectorAll("[data-product-filter]");
  let category = "all";

  function applyFilters() {
    const query = (search?.value || "").trim().toLowerCase();

    const result = products.filter(product => {
      const matchesQuery =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesQuery && matchesCategory;
    });

    renderProducts(result);
  }

  search?.addEventListener("input", applyFilters);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      category = button.dataset.productFilter;

      buttons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      applyFilters();
    });
  });
}

/* Cart operations */

function addToCart(productId, unit) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(
    item => item.productId === productId && item.unit === unit
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      unit,
      quantity: 1
    });
  }

  saveCart(cart);
  alert(`${product.name} added to your cart.`);
}

function renderCart() {
  const target = $("#cartContents");
  if (!target) return;

  const cart = getCart();

  if (!cart.length) {
    target.innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty</h2>
        <p>Explore our catalogue to start an order.</p>
        <a class="btn btn-primary" href="products.html">Explore products</a>
      </div>
    `;
    return;
  }

  target.innerHTML = `
    <div class="cart-list">
      ${cart.map((item, index) => `
        <article class="cart-item">
          <div>
            <h3>${escapeHTML(item.name)}</h3>
            <p>Unit: ${escapeHTML(item.unit)}</p>
            <p>Price: To be confirmed</p>
          </div>

          <label>
            <span class="product-unit-label">Quantity</span>
            <input type="number" min="1" max="10000" step="1"
              value="${item.quantity}" data-cart-quantity="${index}">
          </label>

          <button class="btn btn-outline" type="button"
            data-remove-item="${index}">
            Remove
          </button>
        </article>
      `).join("")}
    </div>

    <div class="cart-summary">
      <h3>Order summary</h3>
      <p>Total units requested: <strong>${getCartCount()}</strong></p>
      <p>Product prices: To be confirmed</p>
      <p>Delivery cost: To be confirmed</p>
      <p class="form-note">
        This is a request for a quotation, not a final bill.
      </p>
    </div>
  `;
}

function setupCartEvents() {
  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-product]");

    if (addButton) {
      const productId = addButton.dataset.addProduct;
      const unitSelect = document.querySelector(
        `[data-unit-for="${productId}"]`
      );

      addToCart(productId, unitSelect?.value || "Basket");
    }

    const removeButton = event.target.closest("[data-remove-item]");

    if (removeButton) {
      const cart = getCart();
      cart.splice(Number(removeButton.dataset.removeItem), 1);
      saveCart(cart);
      renderCart();
    }
  });

  document.addEventListener("change", event => {
    const input = event.target.closest("[data-cart-quantity]");
    if (!input) return;

    const index = Number(input.dataset.cartQuantity);
    const quantity = Number(input.value);
    const cart = getCart();

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10000) {
      alert("Enter a whole quantity from 1 to 10,000.");
      renderCart();
      return;
    }

    if (!cart[index]) return;

    cart[index].quantity = quantity;
    saveCart(cart);
    renderCart();
  });
}

/* Delivery form */

function setupDeliveryForm() {
  const form = $("#deliveryForm");
  if (!form) return;

  const saved = readStorage(DELIVERY_KEY, {});

  Object.entries(saved).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field && typeof value === "string") field.value = value;
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    writeStorage(DELIVERY_KEY, data);

    location.href = "checkout.html";
  });
}

/* Checkout prototype */

function setupCheckout() {
  const target = $("#checkoutSummary");
  if (target) {
    const cart = getCart();

    if (!cart.length) {
      target.innerHTML = `
        <div class="notice">
          Your cart is empty. <a href="products.html">Choose produce first.</a>
        </div>
      `;
    } else {
      target.innerHTML = `
        <div class="cart-summary">
          <h3>Items requested</h3>
          ${cart.map(item => `
            <p>${escapeHTML(item.name)} — ${item.quantity}
            ${escapeHTML(item.unit)}${item.quantity > 1 ? "s" : ""}</p>
          `).join("")}
          <hr>
          <p>Final prices and delivery costs: To be confirmed.</p>
        </div>
      `;
    }
  }

  const accountForm = $("#accountForm");
  const message = $("#accountMessage");

  if (accountForm) {
    accountForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!accountForm.reportValidity()) return;

      if (message) {
        message.textContent =
          "This website is still a frontend prototype. Secure account creation " +
          "is not connected yet, so no account has been created and no password " +
          "has been saved. Backend authentication must be implemented before launch.";
      }
    });
  }
}

/* Contact form: prepare a draft only */

function setupContactForm() {
  const params = new URLSearchParams(location.search);
  const product = params.get("product");
  const field = document.querySelector('[name="product"]');

  if (product && field) {
    if (field.tagName === "SELECT") {
      const option = Array.from(field.options).find(item =>
        item.value.toLowerCase() === product.toLowerCase() ||
        item.textContent.trim().toLowerCase() === product.toLowerCase()
      );

      if (option) field.value = option.value;
      else field.value = "Other";
    } else {
      field.value = product;
    }
  }

  const form = $("#contactForm");
  const result = $("#formResult");

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());

    if (result) {
      result.textContent =
        "Your details are ready in this prototype, but they have not been sent. " +
        "A backend or connected form service is needed to deliver enquiries.";
    }

    console.info("Contact form preview:", data);
  });
}

/* Start all shared features */

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  updateCartCount();
  renderProducts();
  setupProductFilters();
  setupCartEvents();
  renderCart();
  setupDeliveryForm();
  setupCheckout();
  setupContactForm();
});
