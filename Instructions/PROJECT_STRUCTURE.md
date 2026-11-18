# Structure du Projet — La Maison des Petits Loups (V1)

Ce document fournit une cartographie détaillée de l'arborescence du projet **La Maison des Petits Loups (LMDPL)**. L'application est construite avec **Next.js 15+ (App Router)** et utilise **Sanity CMS** pour la gestion de contenu, ainsi que **Nodemailer** pour les notifications transactionnelles.

---

## 📁 Racine du Projet

* `src/` : Code source complet de l'application (pages, composants, logique métier).
* `public/` : Fichiers statiques servis directement par le serveur web (images, logos, favicon).
* `Instructions/` : Documentation fonctionnelle, guides d'installation, règles métier et spécifications V1.
* `sanity.config.ts` : Configuration de l'espace Sanity Studio (plugins, vision, desk structure).
* `sanity.cli.ts` : Configuration de l'outil en ligne de commande Sanity.
* `next.config.ts` : Configuration Next.js (optimisation des images distantes Sanity).
* `package.json` : Dépendances et scripts de build.

---

## 💻 Code Source (`src/`)

### 1. Application & Routage (`src/app/`)

* **`(site)/`** : Groupe de routes publiques partageant le même layout (Header avec panier, Footer, polices) :
  * `page.tsx` : Page d'accueil avec vitrine, carrousel de nouveautés et **bannière ou duo de cartes de campagnes saisonnières**.
  * `boutique/` :
    * `page.tsx` : Catalogue complet des jouets et livres avec **barre de filtrage par tranche d'âge** et boutons Click & Collect.
    * `[slug]/page.tsx` : Fiche détaillée d'un produit avec sélecteur de quantité et ajout direct au panier.
  * `creer-liste/page.tsx` : Interface de création d'une liste de cadeaux avec **3 occasions** (Anniversaire, Naissance, Autre occasion).
  * `liste/[slug]/page.tsx` : Consultation publique d'une liste de cadeaux, réservation groupée multi-articles et **bannière d'archivage automatique J+15**.
  * `selections/[slug]/page.tsx` : Page thématique d'une campagne promotionnelle calendaire (Halloween, Noël, Pâques, Rentrée).
  * `ateliers/` : Liste et pages de détail (`[slug]`) des ateliers à l'année et stages vacances.
  * `anniversaires/page.tsx` : Présentation des formules d'animation d'anniversaires.
  * `contact/page.tsx` : Horaires, formulaire de contact et plan de la boutique.
  * `layout.tsx` : Structure globale HTML, métadonnées SEO, Navbar et Footer.
* **`api/`** : Endpoints serveur (Serverless Routes) :
  * `click-and-collect/route.ts` : Validation de commande panier, génération du code `CC-JJMM-XXXX` et envoi des doubles emails OVH (boutique et client).
  * `gift-lists/route.ts` : Création et listing des listes de cadeaux.
  * `gift-lists/[slug]/route.ts` : Récupération d'une liste avec calcul Just-in-Time du statut archivé (`isArchived`).
  * `gift-lists/[slug]/reserve/route.ts` : Réservation atomique multi-articles (anti-doublon), vérification du statut non-archivé et envoi des emails de notification.
  * `contact/route.ts` : Traitement des messages envoyés depuis la page contact.
* **`studio/[[...tool]]/page.tsx`** : Montage de l'interface Sanity Studio sur `/studio`.

---

### 2. Composants React (`src/components/`)

* **`Shop/`** :
  * `CartDrawer.tsx` : Tiroir latéral de gestion du panier Click & Collect et formulaire de réservation.
  * `ProductCard.tsx` : Carte produit réutilisable avec affichage du prix, badge coup de cœur et bouton panier.
  * `ShopProductGrid.tsx` : Grille dynamique intégrant la barre de filtres par tranche d'âge (*Pills*).
  * `ProductActions.tsx` : Boutons interactifs sur les fiches produits.
* **`GiftLists/`** :
  * `CreateListForm.tsx` : Formulaire de création de liste avec les 3 cartes d'occasion responsive.
  * `GiftListDetail.tsx` : Vue publique de la liste avec gestion de l'archivage et des statuts réservés.
  * `MultiGiftReservationModal.tsx` : Panier de sélection multiple et formulaire de réservation invité avec mot doux.
  * `OccasionBadge.tsx` : Badge coloré visuel identifiant le type d'événement.
  * `ShareModal.tsx` : Fenêtre de partage direct 1-clic (WhatsApp, SMS, copie de lien).
* **`Home/`** :
  * `SeasonalCampaignTeaser.tsx` : Bannière adaptative affichant 1 campagne en solo ou 2 campagnes en **duo de cartes côte à côte**, avec découpe festonnée ("scalloped wave").
  * `ProductCarousel.tsx` : Carrousel interactif des nouveautés.
* **`Header.tsx`** : Barre de navigation supérieure avec lien boutique, ateliers, anniversaires, contact et **icône panier avec compteur d'articles**.
* **`Footer.tsx`** : Pied de page avec horaires, adresse, liens légaux et informations pratiques.
* **`StudioWrapper.tsx`** : Enveloppe de compatibilité pour Sanity Studio sous React 19.
* **`JsonLd.tsx`** : Balisage Schema.org pour le référencement naturel local (Google My Business / Maps).

---

### 3. Contexte & Gestion d'État (`src/context/`)

* **`CartContext.tsx`** : Contexte React fournissant l'état du panier d'achat Click & Collect (`items`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalCount`, `totalAmount`). Persistance automatique dans le `localStorage` du navigateur.

---

### 4. Données & Persistance (`src/data/`)

* **`gift-lists.json`** : Stockage local structuré des listes de cadeaux créées et de leurs réservations associées.
* **`products.ts`** : Définition des types et données statiques de repli.

---

### 5. Bibliothèques Utilitaires & Logique Métier (`src/lib/`)

* **`campaignThemes.tsx`** : Moteur de rendu visuel des 5 thèmes de campagne (Halloween, Noël, Pâques, Rentrée, Défaut) comprenant palettes de couleurs et illustrations SVG immersives.
* **`getSeasonalCampaign.ts`** : Requêtes GROQ Sanity pour extraire les campagnes actives avec `useCdn: false` pour un affichage immédiat.
* **`giftLists.ts`** : Gestionnaire des listes de cadeaux (lecture/écriture sécurisée, recherche par slug, calcul de la règle d'archivage à J+15).
* **`ageCategories.ts`** : Définition des 4 univers d'âge pour la boutique et Sanity.
* **`formatPhone.ts`** : Formatage des numéros de téléphone au standard français (`06 12 34 56 78`).
* **`getProducts.ts` & `getProduct.ts`** : Requêtes d'extraction des produits depuis Sanity.
* **`getAteliers.ts`** : Requêtes d'extraction des ateliers et stages vacances.

---

### 6. Sanity CMS (`src/sanity/`)

* **`schemaTypes/`** :
  * `seasonalCampaignType.ts` : Définition du schéma des campagnes promotionnelles (titre, dates, thème radio, activation, références produits).
  * `productType.ts` : Schéma produit intégrant le sélecteur d'âge normalisé.
  * `atelierType.ts` : Schéma des ateliers et stages vacances.
  * `homePage.ts` : Singleton pour les réglages de la page d'accueil.
  * `anniversaryPage.ts` : Singleton pour les tarifs et descriptions d'anniversaires.
  * `testimonialType.ts` : Schéma des avis clients.
* **`structure.ts`** : Arborescence personnalisée du menu Sanity Studio.
* **`queries.ts`** : Ensemble des requêtes GROQ centralisées.
* **`lib/client.ts`** : Client de connexion Sanity configuré.
