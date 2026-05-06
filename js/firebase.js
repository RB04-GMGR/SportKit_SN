// ============================================
// SPORTKIT SN — Configuration Firebase
// ============================================
// NE JAMAIS PARTAGER CE FICHIER PUBLIQUEMENT
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ─── Configuration ───────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDQo0JvBPuJlrC4zeynhU1_sb0he5rKtFc",
  authDomain: "sportkit-sn.firebaseapp.com",
  projectId: "sportkit-sn",
  storageBucket: "sportkit-sn.firebasestorage.app",
  messagingSenderId: "619214960191",
  appId: "1:619214960191:web:442eda9bfac65fb5c8ea8a"
};

// ─── Initialisation ──────────────────────────
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// ============================================
// 📦 PRODUITS
// ============================================

// Récupérer tous les produits
export async function getProduits() {
  try {
    const snapshot = await getDocs(collection(db, "produits"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur getProduits:", error);
    return [];
  }
}

// Récupérer les produits vedettes (page accueil)
export async function getProduitsVedettes() {
  try {
    const q = query(collection(db, "produits"), where("vedette", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur getProduitsVedettes:", error);
    return [];
  }
}

// Récupérer les produits par catégorie
export async function getProduitsByCategorie(categorie) {
  try {
    const q = query(collection(db, "produits"), where("categorie", "==", categorie));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur getProduitsByCategorie:", error);
    return [];
  }
}

// Récupérer un seul produit par ID
export async function getProduitById(id) {
  try {
    const docRef = doc(db, "produits", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Erreur getProduitById:", error);
    return null;
  }
}

// Ajouter un produit (admin)
export async function ajouterProduit(produit) {
  try {
    const docRef = await addDoc(collection(db, "produits"), {
      ...produit,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Erreur ajouterProduit:", error);
    return null;
  }
}

// Modifier un produit (admin)
export async function modifierProduit(id, data) {
  try {
    const docRef = doc(db, "produits", id);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    return true;
  } catch (error) {
    console.error("Erreur modifierProduit:", error);
    return false;
  }
}

// Supprimer un produit (admin)
export async function supprimerProduit(id) {
  try {
    await deleteDoc(doc(db, "produits", id));
    return true;
  } catch (error) {
    console.error("Erreur supprimerProduit:", error);
    return false;
  }
}

// ============================================
// 🛒 COMMANDES
// ============================================

// Ajouter une commande
export async function ajouterCommande(commande) {
  try {
    const docRef = await addDoc(collection(db, "commandes"), {
      ...commande,
      statut: "nouveau",
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Erreur ajouterCommande:", error);
    return null;
  }
}

// Récupérer toutes les commandes (admin)
export async function getCommandes() {
  try {
    const snapshot = await getDocs(collection(db, "commandes"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur getCommandes:", error);
    return [];
  }
}

// Modifier le statut d'une commande (admin)
export async function updateStatutCommande(id, statut) {
  try {
    const docRef = doc(db, "commandes", id);
    await updateDoc(docRef, { statut, updatedAt: new Date().toISOString() });
    return true;
  } catch (error) {
    console.error("Erreur updateStatutCommande:", error);
    return false;
  }
}

// ============================================
// 🖼️ IMAGES (Storage)
// ============================================

// Upload une image produit
export async function uploadImage(file, produitId) {
  try {
    const storageRef = ref(storage, `produits/${produitId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Erreur uploadImage:", error);
    return null;
  }
}

// ============================================
// 🔐 AUTHENTIFICATION ADMIN
// ============================================

// Connexion admin
export async function loginAdmin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur login:", error);
    return null;
  }
}

// Déconnexion admin
export async function logoutAdmin() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Erreur logout:", error);
    return false;
  }
}

// Vérifier si admin est connecté
export function onAdminAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// ─── Exports globaux ─────────────────────────
export { db, auth, storage };