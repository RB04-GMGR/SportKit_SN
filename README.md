# 🏋️ SportKit SN

> **Tout pour performer** — La boutique en ligne d'équipements sportifs au Sénégal

![SportKit SN](https://img.shields.io/badge/SportKit-SN-0D6EFD?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-En%20développement-f59e0b?style=for-the-badge)
![Mobile First](https://img.shields.io/badge/Mobile-First-22c55e?style=for-the-badge)

---

## 🎯 À propos du projet

**SportKit SN** est une boutique e-commerce spécialisée dans la vente d'équipements sportifs au Sénégal. Le projet cible en priorité les pratiquants d'arts martiaux, de flag football et de fitness, avec une vision d'élargissement à tous les sports.

### Problématique
Les sportifs sénégalais peinent à trouver des équipements de qualité localement. SportKit SN répond à ce besoin en proposant une plateforme moderne, mobile-first, adaptée au marché local (paiement en FCFA, livraison partout au Sénégal).

---

## ✨ Fonctionnalités

### Site client
- 🏠 Page d'accueil avec hero section et produits vedettes
- 📦 Catalogue produits avec filtres par catégorie
- 🔍 Page produit individuelle avec galerie photos
- 🛒 Panier complet (ajout, modification, suppression)
- 📱 100% responsive — optimisé mobile
- 📞 Page contact avec formulaire + lien WhatsApp

### Panel Admin
- 🔐 Authentification sécurisée (Firebase Auth)
- 📊 Dashboard avec statistiques en temps réel
- ➕ Ajout / modification / suppression de produits
- 📋 Gestion des commandes (nouveau → en cours → livré)
- 🖼️ Upload d'images produits
- 🏷️ Gestion des promotions et catégories

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
|---|---|
| HTML5 | Structure des pages |
| CSS3 | Design, animations, thème sombre |
| Bootstrap 5 | Grille responsive, composants UI |
| JavaScript (Vanilla) | Logique front-end |
| Firebase Firestore | Base de données cloud |
| Firebase Auth | Authentification admin |
| Netlify | Hébergement et déploiement |

---

## 📁 Structure du projet

```
sportkit-sn/
│
├── index.html          # Page d'accueil
├── produits.html       # Catalogue produits
├── produit.html        # Page produit individuel
├── panier.html         # Panier
├── contact.html        # Contact
├── README.md
│
├── admin/
│   ├── index.html      # Login admin
│   ├── dashboard.html  # Tableau de bord
│   ├── produits.html   # Gestion produits
│   └── commandes.html  # Gestion commandes
│
├── css/
│   └── style.css       # Styles globaux
│
├── js/
│   ├── firebase.js     # Config Firebase
│   ├── app.js          # Logique principale
│   └── cart.js         # Gestion panier
│
├── data/
│   └── products.json   # Données produits (dev)
│
└── assets/
    ├── images/
    └── icons/
```

---

## 🚀 Installation & lancement local

### Prérequis
- [Visual Studio Code](https://code.visualstudio.com/)
- Extension **Live Server** (VSCode)
- Compte [Firebase](https://firebase.google.com/)

### Étapes

```bash
# 1. Cloner le repo
git clone https://github.com/TON_USERNAME/sportkit-sn.git

# 2. Ouvrir dans VSCode
code sportkit-sn

# 3. Lancer avec Live Server
# Clic droit sur index.html → "Open with Live Server"
```

### Configuration Firebase
1. Créer un projet sur [Firebase Console](https://console.firebase.google.com/)
2. Activer **Firestore Database**
3. Activer **Authentication** (Email/Password)
4. Copier la config dans `js/firebase.js`

---

## 🌍 Déploiement

Le site est déployé automatiquement via **Netlify** à chaque push sur la branche `main`.

🔗 **Site en ligne** : [sportkit-sn.netlify.app](https://sportkit-sn.netlify.app)

---

## 📊 Roadmap

- [x] Structure du projet
- [x] Documentation GitHub
- [ ] Configuration Firebase
- [ ] Page d'accueil
- [ ] Catalogue produits
- [ ] Page produit
- [ ] Panier
- [ ] Panel Admin
- [ ] Déploiement Netlify
- [ ] Domaine personnalisé `.sn`

---

## 👩‍💻 Auteure

Développé avec passion par une pratiquante d'arts martiaux sénégalaise.

> *"Équipez-vous. Dépassez-vous."* — SportKit SN

---

## 📄 Licence

Ce projet est sous licence MIT — libre d'utilisation avec attribution.