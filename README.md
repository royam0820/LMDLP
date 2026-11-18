# La Maison des Petits Loups — Site Web & Services V1

Plateforme web de **La Maison des Petits Loups**, boutique de jouets chaleureuse, concept store pour enfants et ateliers créatifs situés à Puteaux (92800).

Ce projet est une application moderne construite avec **Next.js 15+ (App Router)**, connectée à **Sanity CMS** pour la gestion de contenu et au serveur **SMTP OVH** pour les notifications transactionnelles en direct.

---

## 🚀 Tech Stack

- **Framework** : [Next.js 15+](https://nextjs.org/) (App Router, React 19)
- **CMS Headless** : [Sanity.io](https://www.sanity.io/) (Schémas typés, requêtes GROQ)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Langage** : TypeScript
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Messagerie & Notifications** : Nodemailer via SMTP sécurisé OVH (`ssl0.ovh.net:465`)
- **Déploiement cible** : [Vercel](https://vercel.com/)

---

## ✨ Nouvelles Fonctionnalités Majeures (V1)

La version 1 enrichit le site vitrine initial avec des services digitaux conçus pour le commerce de proximité :

### 1. 🛍️ Click & Collect (Retrait Boutique)
- **Panier interactif latéral (`CartDrawer`)** accessible sur l'ensemble du site avec badge de notification dans le Header.
- Sélection des quantités, calcul dynamique du montant total et résumé des articles.
- Formulaire de commande rapide : Nom, téléphone au standard français (`06 12 34 56 78`), email, date et créneau de retrait (matin/après-midi), mot pour la boutique.
- **Identifiant de commande lisible** au format `CC-JJMM-XXXX` (ex: `CC-2210-8K4P`), optimisé pour les post-it de préparation en boutique.
- **Double email automatique** via SMTP OVH :
  - Notification instantanée à la boutique (`royam0820@gmail.com`) avec tableau détaillé des articles et bouton d'appel en 1 clic.
  - Confirmation bienveillante au client avec récapitulatif, adresse (14 rue de l'Oasis, Puteaux) et horaires.

### 2. 🎁 Listes de Cadeaux Multi-Occasions
- **3 occasions personnalisées** créables en quelques clics (`/creer-liste`) :
  - 🎂 **Fête d'Anniversaire** : sélecteur rapide de l'âge fêté (1 à 12 ans) et date de la fête.
  - 👶 **Naissance & Bébé** : date de naissance ou terme prévu, petit mot d'accueil.
  - 🎁 **Autre occasion** : adapté à tous les temps forts familiaux (Baptême, Bar Mitzvah, L'Aïd, Noël, Communion...).
- **Interface responsive** : 3 cartes alignées sur desktop (`md:grid-cols-3`) et empilées sur mobile.
- **Sélection facile dans le catalogue Sanity** avec filtrage par âge.
- **Partage simplifié** : URL pérenne sécurisée (`https://lmdpl.fr/liste/[slug]`), boutons directs WhatsApp et SMS avec messages pré-rédigés.
- **Réservation groupée multi-articles** : les proches peuvent cocher plusieurs cadeaux en une seule fois.
- **Garantie « Zéro Doublon »** : verrouillage atomique côté serveur pour éviter les collisions concurrentes.
- **Mots doux & doubles emails** : transmission des messages d'affection de la famille et confirmation par email à la boutique et à l'offrant.

### 3. 📦 Archivage Automatique à J+15
- **Règle convenue** : les listes restent actives et ouvertes aux commandes jusqu'à **15 jours après la date de l'événement** (`eventDate + 15 jours`).
- **Zéro erreur 404** : l'URL de la liste reste consultable pour toujours afin de préserver les souvenirs des familles et les mots doux reçus.
- **Bannière d'information ambrée** indiquant la clôture des réservations.
- **Double verrouillage de sécurité** : boutons d'ajout désactivés côté interface et blocage strict par l'API (rejet HTTP 400).
- **Évaluation temps réel (Just-in-Time)** côté serveur : aucun cron job complexe nécessaire.

### 4. 📅 Campagnes Promotionnelles Calendaires (Sélections Événementielles)
- Gestion en totale autonomie par Véronique depuis Sanity Studio (`seasonalCampaign`).
- Programmation des dates de début/fin et sélection de produits par références (sans duplication).
- **5 thèmes graphiques immersifs** avec illustrations SVG dédiées :
  - 🎃 **Halloween** (orange citrouille, violet, badges chauve-souris)
  - 🎄 **Noël** (rouge chaleureux, vert sapin, flocons de cristal sculptés)
  - 🌸 **Pâques** (vert printanier, jaune doux, marguerites et petits œufs)
  - 🎒 **Rentrée** (bleu écolier, jaune moutarde, cartables et crayons)
  - ✨ **Défaut** (palette pastel douce identitaire de la boutique)
- **Affichage dynamique en page d'accueil** :
  - Bannière pleine largeur avec découpe ondulée ("scalloped wave") si 1 campagne est active.
  - **Duo de cartes côte à côte** équilibrées si 2 campagnes sont actives en simultané.
- **Pages dédiées `/selections/[slug]`** pour valoriser chaque sélection.
- Mises à jour instantanées sur le site sans latence de cache (`useCdn: false`, `force-dynamic`).

### 5. 🏷️ Filtrage des Articles par Tranches d'Âge
- Barre de boutons ergonomiques ("Pills") en tête de boutique :
  - `[ Tous les âges ]`
  - `[ 🍼 0-12 mois ]`
  - `[ 🧸 1-3 ans ]`
  - `[ 🎨 3-6 ans ]`
  - `[ 🧩 6 ans et + ]`
- Menu de sélection normalisé dans Sanity Studio pour Véronique (zéro faute de frappe, 1 clic).

---

## 🏛️ Fonctionnalités du Socle Initial (V0)

- **Accueil** : Vitrine dynamique, carrousel des nouveautés et avis clients.
- **Ateliers & Stages** :
  - Distinction entre *Ateliers à l'année* et *Stages Vacances*.
  - Partenariat mis en valeur avec **Codeacademy123**.
  - Pages de détail `/ateliers/[slug]` avec ratio d'image 16:9 optimisé.
- **Anniversaires** : Formules, tarifs et demande de réservation en boutique.
- **Témoignages** : Avis clients gérés dans Sanity et affichés dynamiquement.
- **Contact & Accès** : Coordonnées, horaires d'ouverture et intégration cartographique de la boutique à Puteaux.

---

## 🛠️ Installation & Démarrage Local

### Pré-requis
- Node.js 18+ (ou 20+) installé.
- Compte Sanity configuré.

### 1. Installation des dépendances
```bash
git clone <votre-repo>
cd LMDPL
npm install
```

### 2. Variables d'environnement (`.env.local`)
Créez un fichier `.env.local` à la racine :

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="votre_project_id"
NEXT_PUBLIC_SANITY_DATASET="development"   # ou production
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Envoi des emails via SMTP OVH
SMTP_HOST="ssl0.ovh.net"
SMTP_PORT="465"
SMTP_USER="contact@lmdpl.fr"
SMTP_PASSWORD="votre_mot_de_passe_ovh"
BOUTIQUE_NOTIFICATION_EMAIL="royam0820@gmail.com"
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
- Le site est accessible sur [http://localhost:3000](http://localhost:3000)
- L'administration Sanity Studio est accessible sur [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 📝 Gestion de Contenu (Sanity Studio)

L'interface de gestion permet de tout administrer sans toucher au code :

| Schéma Sanity | Usage |
| :--- | :--- |
| **Campagnes Calendaires** (`seasonalCampaign`) | Création des temps forts (Halloween, Noël, Pâques, Rentrée), sélection de thème, dates et produits. |
| **Produits** (`product`) | Catalogue des jouets et livres, tranches d'âge prédéfinies, coups de cœur boutique. |
| **Ateliers** (`atelier`) | Cours hebdomadaires et stages vacances avec dates, description et photos 16:9. |
| **Page d'Accueil** (`homePage`) | Gestion de la vitrine, sous-titres et visuels principaux. |
| **Page Anniversaires** (`anniversaryPage`) | Tarifs, formules d'animation et descriptifs d'anniversaires. |
| **Témoignages** (`testimonial`) | Avis des familles publiés sur le site. |

---

## 📂 Structure du Code Source

```text
src/
├── app/
│   ├── (site)/                  # Pages publiques (Layout commun)
│   │   ├── page.tsx             # Accueil & duo de campagnes promotionnelles
│   │   ├── boutique/            # Boutique avec filtrage d'âge & Click & Collect
│   │   ├── creer-liste/         # Création d'une liste de cadeaux (3 occasions)
│   │   ├── liste/[slug]/        # Page publique de liste & réservation multi-cadeaux
│   │   ├── selections/[slug]/   # Vitrine thématique des campagnes calendaires
│   │   ├── ateliers/            # Ateliers à l'année et stages vacances
│   │   ├── anniversaires/       # Formules anniversaires enfants
│   │   └── contact/             # Contact, horaires et plan d'accès
│   ├── api/
│   │   ├── click-and-collect/   # Réservation panier & envoi emails OVH
│   │   ├── gift-lists/          # Gestion API et réservations anti-doublon
│   │   └── contact/             # Formulaire de contact
│   └── studio/                  # Interface d'administration Sanity Studio
├── components/
│   ├── GiftLists/               # Modales, cartes d'occasion, formulaires de liste
│   ├── Home/                    # Teasers saisonniers, carrousels, vitrine
│   ├── Shop/                    # CartDrawer, boutons panier, grille filtrable
│   ├── Header.tsx               # Navigation principale & icône panier
│   └── Footer.tsx               # Liens pratiques et mentions
├── context/
│   └── CartContext.tsx          # Gestion globale du panier Click & Collect
├── data/
│   └── gift-lists.json          # Stockage local des listes et réservations
├── lib/
│   ├── ageCategories.ts         # Définition des univers d'âge
│   ├── campaignThemes.tsx       # Moteur graphique des 5 thèmes saisonniers
│   ├── formatPhone.ts           # Normalisation des numéros de téléphone
│   ├── getSeasonalCampaign.ts   # Requêtes optimisées Sanity
│   └── giftLists.ts             # Logique des listes & calcul archivage J+15
└── sanity/
    ├── schemaTypes/             # Définition des schémas de données Sanity
    └── structure.ts             # Organisation du menu Sanity Studio
```

---

## 📚 Documentation Détaillée

Pour approfondir chaque sujet, consultez les dossiers de documentation :
- [Documentation Fonctionnelle & Technique V1](Instructions/DOCUMENTATION_V1.md)
- [Guide d'Archivage des Listes de Cadeaux (J+15)](Instructions/archivage-liste-cadeaux)
- [Configuration du Domaine & DNS](Instructions/DOMAIN_SETUP.md)
- [Configuration de Sanity Studio](Instructions/SANITY_SETUP.md)
- [Guide de Référencement & SEO](Instructions/SEO_GUIDE.md)

---

## 🚀 Déploiement en Production (Vercel)

Le projet est configuré pour un déploiement continu sur **Vercel** via GitHub.
1. Connecter le dépôt GitHub au tableau de bord Vercel.
2. Configurer les variables d'environnement listées dans la section `Variables d'environnement`.
3. Le déploiement s'exécute automatiquement à chaque push sur la branche `main`.
