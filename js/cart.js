// ============================================
// SPORTKIT SN — cart.js
// Gestion du panier (localStorage)
// ============================================

const CART_KEY = 'sportkit_cart';
const WISH_KEY = 'sportkit_wish';

// ── Panier ────────────────────────────────
export const getCart  = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
export const saveCart = c  => { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateBadge(); };

export function addToCart(produit) {
  const cart = getCart();
  const idx  = cart.findIndex(x => x.id === produit.id);
  if (idx > -1) cart[idx].qty += 1;
  else cart.push({ ...produit, qty: 1 });
  saveCart(cart);
  showCartToast(`✅ ${produit.nom} ajouté au panier`);
}

export function changeQty(id, delta) {
  const cart = getCart();
  const idx  = cart.findIndex(x => x.id === id);
  if (idx > -1) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
  }
  saveCart(cart);
}

export function removeFromCart(id) {
  saveCart(getCart().filter(x => x.id !== id));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateBadge();
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.prix * item.qty, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

export function updateBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = getCartCount();
}

// ── Wishlist ──────────────────────────────
export const getWish  = () => JSON.parse(localStorage.getItem(WISH_KEY) || '[]');
export const saveWish = w  => localStorage.setItem(WISH_KEY, JSON.stringify(w));

export function toggleWish(produit, btn) {
  const wish = getWish();
  const idx  = wish.findIndex(x => x.id === produit.id);
  if (idx > -1) {
    wish.splice(idx, 1);
    if (btn) { btn.innerHTML = '<i class="bi bi-heart"></i>'; btn.style.color = ''; }
    showCartToast('Retiré de ta sélection', '#FF3B30');
  } else {
    wish.push(produit);
    if (btn) { btn.innerHTML = '<i class="bi bi-heart-fill"></i>'; btn.style.color = '#FF3B30'; }
    showCartToast('❤️ Ajouté à ta sélection', '#FF3B30');
  }
  saveWish(wish);
}

export function removeFromWish(id) {
  saveWish(getWish().filter(x => x.id !== id));
}

// ── Rendu panier sidebar ──────────────────
export function renderCartSidebar() {
  const cart    = getCart();
  const body    = document.getElementById('cartBody');
  const totalEl = document.getElementById('cartTotal');
  if (!body) return;

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty-msg">
        <i class="bi bi-cart3"></i>
        <div style="font-size:15px;font-weight:800;margin-bottom:4px">Panier vide</div>
        <div style="font-size:13px">Ajoute des produits pour commencer</div>
      </div>`;
    if (totalEl) totalEl.textContent = '0';
    return;
  }

  let total = 0;
  body.innerHTML = cart.map(it => {
    total += it.prix * it.qty;
    return `
      <div class="citem">
        <img src="${it.image || 'https://via.placeholder.com/64'}" class="citem-img" alt="${it.nom}">
        <div style="flex:1">
          <div class="citem-name">${it.nom}</div>
          <div class="citem-price">${it.prix.toLocaleString()} FCFA</div>
          <div class="citem-qty">
            <button class="qbtn" onclick="window.cartChangeQty('${it.id}',-1)">−</button>
            <span class="qnum">${it.qty}</span>
            <button class="qbtn" onclick="window.cartChangeQty('${it.id}',1)">+</button>
            <button class="qbtn" onclick="window.cartRemove('${it.id}')"
              style="margin-left:6px;color:#FF3B30">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
  if (totalEl) totalEl.textContent = total.toLocaleString();
}

// ── Initialiser sidebar ───────────────────
export function initCartSidebar() {
  updateBadge();

  const cartBtn     = document.getElementById('cartBtn');
  const cartClose   = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartSidebar = document.getElementById('cartSidebar');

  if (!cartBtn || !cartSidebar) return;

  const open  = () => { cartSidebar.classList.add('open'); cartOverlay?.classList.add('open'); document.body.style.overflow = 'hidden'; renderCartSidebar(); };
  const close = () => { cartSidebar.classList.remove('open'); cartOverlay?.classList.remove('open'); document.body.style.overflow = ''; };

  cartBtn.onclick     = open;
  cartClose?.addEventListener('click', close);
  cartOverlay?.addEventListener('click', close);

  // Exposer globalement pour les boutons inline
  window.cartChangeQty = (id, d) => { changeQty(id, d); renderCartSidebar(); };
  window.cartRemove    = id       => { removeFromCart(id); renderCartSidebar(); };
  window.addToCart     = addToCart;
  window.toggleWish    = toggleWish;
}

// ── Toast interne ─────────────────────────
function showCartToast(msg, color = '#22c55e') {
  let stack = document.getElementById('toastStack');
  if (!stack) return;
  const t = document.createElement('div');
  t.className = 'tst';
  t.innerHTML = `<div class="tst-dot" style="background:${color}"></div><span>${msg}</span>`;
  stack.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}