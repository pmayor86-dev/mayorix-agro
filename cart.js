const CART_KEY = "mayorixAgroCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(name, unit = "Basket") {
  if (!name) return;

  const cart = getCart();
  const existing = cart.find(
    item => item.name === name && item.unit === unit
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: crypto.randomUUID(),
      name,
      unit,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();

  alert(`${name} added to your cart.`);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll("[data-cart-count]").forEach(element => {
    element.textContent = count;
  });
}

function renderCart() {
  const container = document.getElementById("cartContents");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="card">
        <h2>Your cart is empty</h2>
        <p>Explore our produce catalogue to start an order.</p>
        <a class="btn btn-primary" href="products.html">
          Explore products
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="card">
      ${cart.map((item, index) => `
        <div class="cart-item">
          <div>
            <h3>${escapeCartText(item.name)}</h3>
            <p>Unit: ${escapeCartText(item.unit)}</p>
            <label>
              Quantity
              <input
                type="number"
                min="1"
                max="10000"
                value="${item.quantity}"
                data-cart-quantity="${index}"
              >
            </label>
          </div>

          <button
            type="button"
            class="btn btn-secondary"
            data-remove-cart="${index}"
          >
            Remove
          </button>
        </div>
      `).join("")}

      <hr>
      <p><strong>${cart.reduce((sum, item) => sum + item.quantity, 0)}</strong> total units requested</p>
      <p>Price: To be confirmed</p>
      <p>Availability: To be confirmed</p>
    </div>
  `;
}

function escapeCartText(value) {
  const element = document.createElement("span");
  element.textContent = String(value);
  return element.innerHTML;
}

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add-to-cart]");

  if (addButton) {
    addToCart(
      addButton.dataset.productName,
      addButton.dataset.unit || "Basket"
    );
  }

  const removeButton = event.target.closest("[data-remove-cart]");

  if (removeButton) {
    const cart = getCart();
    cart.splice(Number(removeButton.dataset.removeCart), 1);
    saveCart(cart);
    renderCart();
    updateCartCount();
  }
});

document.addEventListener("change", event => {
  const input = event.target.closest("[data-cart-quantity]");
  if (!input) return;

  const index = Number(input.dataset.cartQuantity);
  const quantity = Number(input.value);

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10000) {
    alert("Enter a whole quantity between 1 and 10,000.");
    renderCart();
    return;
  }

  const cart = getCart();

  if (cart[index]) {
    cart[index].quantity = quantity;
    saveCart(cart);
    updateCartCount();
    renderCart();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;