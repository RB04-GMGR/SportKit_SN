// ============================================
// SPORTKIT SN — app.js
// Logique principale partagée entre les pages
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQo0JvBPuJlrC4zeynhU1_sb0he5rKtFc",
  authDomain: "sportkit-sn.firebaseapp.com",
  projectId: "sportkit-sn",
  storageBucket: "sportkit-sn.firebasestorage.app",
  messagingSenderId: "619214960191",
  appId: "1:619214960191:web:442eda9bfac65fb5c8ea8a"
};

export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);

// ── Produits ──────────────────────────────
export async function getProduits() {  try {
    const snap = await getDocs(collection(db, "produits"));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { console.error("getProduits:", e); return []; }
}

export async function getProduitsByCategorie(cat) {
  try {
    const q = query(collection(db,"produits"), where("categorie","==",cat));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { console.error("getByCategorie:", e); return []; }
}

// ── Rendu carte produit ───────────────────
export function renderCard(p) {
  const hp = p.comparePrice && p.comparePrice > p.prix;
  const r  = hp ? Math.round((1 - p.prix / p.comparePrice) * 100) : 0;
  const sp = JSON.stringify(p).replace(/"/g, '&quot;');
  const stock = p.stock > 0
    ? (p.stock <= 3 ? '<span class="pbadge pbadge-dark">Presque épuisé</span>' : '<span class="pbadge pbadge-green">Disponible</span>')
    : '<span class="pbadge pbadge-red">Rupture</span>';
  return `
    <div class="prod-card" onclick="window.location.href='produit.html?id=${p.id}'">
      <div class="prod-img-wrap">
        <img src="${p.image || 'https://via.placeholder.com/400x400/F5F6FA/0D6EFD?text=SportKit'}"
             alt="${p.nom}" loading="lazy">
        <div class="prod-badges">
          ${stock}
          ${hp  ? `<span class="pbadge pbadge-red">-${r}%</span>` : ''}
          ${p.nouveau ? '<span class="pbadge pbadge-blue">Nouveau</span>' : ''}
        </div>
        <button class="prod-wish"
          onclick="event.stopPropagation();toggleWish(${sp},this)"
          title="Ajouter à ma sélection">
          <i class="bi bi-heart"></i>
        </button>
      </div>
      <div class="prod-body">
        <div class="prod-cat">${p.categorie || ''}</div>
        <div class="prod-name">${p.nom}</div>
        <div class="prod-price-row">
          <span class="price-main">${(p.prix || 0).toLocaleString()}</span>
          <span class="price-fcfa">FCFA</span>
          ${hp ? `<span class="price-old">${p.comparePrice.toLocaleString()}</span>
                  <span class="price-off">-${r}%</span>` : ''}
        </div>
        <div class="prod-actions">
          <a href="produit.html?id=${p.id}" class="btn-voir"
             onclick="event.stopPropagation()">
            <i class="bi bi-eye"></i> Voir
          </a>
          <button class="btn-panier"
            onclick="event.stopPropagation();addToCart(${sp})"
            title="Ajouter au panier">
            <i class="bi bi-bag-plus"></i>
          </button>
        </div>
      </div>
    </div>`;
}

// ── Toast global ──────────────────────────
export function showToast(msg, color = '#22c55e') {
  let stack = document.getElementById('toastStack');
  if (!stack) { stack = document.createElement('div'); stack.id = 'toastStack'; stack.className = 'toast-stack'; document.body.appendChild(stack); }
  const t = document.createElement('div');
  t.className = 'tst';
  t.innerHTML = `<div class="tst-dot" style="background:${color}"></div><span>${msg}</span>`;
  stack.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}

// ── Splash ────────────────────────────────
export function initSplash() {
  window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    if (!splash) return;
    if (sessionStorage.getItem('splashShown')) {
      splash.classList.add('gone');
    } else {
      sessionStorage.setItem('splashShown', '1');
      setTimeout(() => splash.classList.add('gone'), 1400);
    }
  });
}