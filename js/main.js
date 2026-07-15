/* Shared site behaviour: nav, cart, toast — used on every page */
const CART_KEY = 'sabra_cart_v1';
const WISHLIST_KEY = 'sabra_wishlist_v1';
const WHATSAPP_NUMBER = '201000000000';

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function loadWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch (e) { return []; }
}
function saveWishlist(list) { localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); }

function getCartWithDetails() {
  const cart = loadCart();
  return cart
    .map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return product ? Object.assign({}, product, { qty: item.qty }) : null;
    })
    .filter(Boolean);
}

function cartTotalItems() {
  return loadCart().reduce((sum, i) => sum + i.qty, 0);
}
function cartTotalPrice() {
  return getCartWithDetails().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function addToCart(id, qty = 1) {
  const cart = loadCart();
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  updateCartUI();
  const product = PRODUCTS.find(p => p.id === id);
  showToast(`تمت إضافة "${product ? product.name : 'المنتج'}" إلى السلة`);
}

function removeFromCart(id) {
  saveCart(loadCart().filter(i => i.id !== id));
  updateCartUI();
}

function changeQty(id, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter(i => i.id !== id));
  } else {
    saveCart(cart);
  }
  updateCartUI();
}

function toggleWishlist(id) {
  let list = loadWishlist();
  if (list.includes(id)) list = list.filter(w => w !== id);
  else list.push(id);
  saveWishlist(list);
  document.querySelectorAll(`[data-wishlist="${id}"]`).forEach(btn => btn.classList.toggle('active'));
}

/* ---------- Rendering helpers ---------- */
function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += Icon(i <= Math.round(rating) ? 'star' : 'starOutline');
  }
  return html;
}

function productCardHTML(p) {
  const wishActive = loadWishlist().includes(p.id) ? 'active' : '';
  const oldPrice = p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : '';
  const badge = p.badge ? `<span class="product-badge">${p.badge}</span>` : (!p.inStock ? `<span class="product-badge stock-out">غير متوفر</span>` : '');
  return `
  <article class="product-card" data-id="${p.id}" data-cat="${p.category}" data-price="${p.price}" data-name="${p.name}">
    <div class="product-media" style="background:${p.grad}">
      ${badge}
      <button class="wishlist-btn ${wishActive}" data-wishlist="${p.id}" onclick="toggleWishlist('${p.id}')" aria-label="إضافة للمفضلة">${Icon('heart')}</button>
      <div style="color:#0a5c8a">${Icon(p.icon)}</div>
    </div>
    <div class="product-body">
      <div class="product-cat">${getCategoryLabel(p.category)}</div>
      <h3>${p.name}</h3>
      <div class="product-rating">${renderStars(p.rating)}<span>(${p.reviews})</span></div>
      <p class="product-desc">${p.desc}</p>
      <div class="product-footer">
        <div class="product-price">${formatPrice(p.price)}${oldPrice}</div>
        <button class="add-cart-btn" ${p.inStock ? '' : 'disabled'} onclick="addToCart('${p.id}')" aria-label="أضف للسلة">${Icon('cart')}</button>
      </div>
    </div>
  </article>`;
}

/* ---------- Cart drawer ---------- */
function renderCartDrawer() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!container) return;
  const items = getCartWithDetails();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        ${Icon('cart')}
        <h4>سلتك فارغة</h4>
        <p>ابدأ بتصفح المنتجات وأضف ما يناسبك</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';
  container.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-media" style="background:${item.grad}">${Icon(item.icon)}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        <div class="qty-stepper">
          <button onclick="changeQty('${item.id}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="حذف">${Icon('close')}</button>
    </div>
  `).join('');

  const total = cartTotalPrice();
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  if (subtotalEl) subtotalEl.textContent = formatPrice(total);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function updateCartUI() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const count = cartTotalItems();
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  renderCartDrawer();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  closeMobileNav();
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.remove('open');
}

function checkoutWhatsApp() {
  const items = getCartWithDetails();
  if (items.length === 0) return;
  let msg = 'مرحباً صبرة لأنظمة التبريد، أرغب في طلب المنتجات التالية:%0A%0A';
  items.forEach(i => {
    msg += `- ${i.name} × ${i.qty} = ${formatPrice(i.price * i.qty)}%0A`;
  });
  msg += `%0Aالإجمالي: ${formatPrice(cartTotalPrice())}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function hydrateIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = Icon(el.dataset.icon);
  });
  (root || document).querySelectorAll('[data-stars]').forEach(el => {
    el.innerHTML = renderStars(parseFloat(el.dataset.stars));
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  hydrateIcons();
  updateCartUI();

  const cartBtn = document.getElementById('cartToggle');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  const cartCloseBtn = document.getElementById('cartClose');
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

  const menuBtn = document.getElementById('menuToggle');
  if (menuBtn) menuBtn.addEventListener('click', openMobileNav);
  const mobileNavClose = document.getElementById('mobileNavClose');
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeCart);

  const overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', closeCart);

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkoutWhatsApp);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
