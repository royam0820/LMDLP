# Documentation des Développements V1 — La Maison des Petits Loups

Ce document synthétise l'ensemble des fonctionnalités et architectures techniques développées pour la **Version 1 (V1)** du site web de **La Maison des Petits Loups** (Puteaux). 

> **Statut :** Prêt pour revue avec Véronique avant mise en production (GitHub / Vercel).

---

## Sommaire

1. [Vue d'ensemble de la V1](#1-vue-densemble-de-la-v1)
2. [Click & Collect (Retrait Boutique)](#2-click--collect-retrait-boutique)
3. [Listes de Cadeaux (Anniversaire, Naissance & Autre occasion)](#3-listes-de-cadeaux-anniversaire-naissance--autre-occasion)
4. [Archivage Automatique des Listes de Cadeaux (J+15)](#4-archivage-automatique-des-listes-de-cadeaux-j15)
5. [Campagnes Promotionnelles Calendaires (Sélections Événementielles)](#5-campagnes-promotionnelles-calendaires-sélections-événementielles)
6. [Filtrage des Articles par Tranches d'Âge](#6-filtrage-des-articles-par-tranches-dâge)
7. [Architecture Technique & Fichiers Clés](#7-architecture-technique--fichiers-clés)
8. [Configuration & Variables d'Environnement](#8-configuration--variables-denvironnement)
9. [Procédure de Déploiement Vercel](#9-procédure-de-déploiement-vercel)

---

## 1. Vue d'ensemble de la V1

La version 1 enrichit le site vitrine initial (V0) de quatre modules majeurs conçus pour dynamiser l'activité de la boutique physique, faciliter le parcours d'achat local et offrir une autonomie totale à la gérante dans Sanity Studio :

* **Click & Collect :** Réservation d'articles en ligne avec retrait et paiement sur place à Puteaux.
* **Listes de Cadeaux universelles :** Création et partage de listes pour 3 types d'événements (Anniversaire, Naissance, Autre occasion), réservation groupée multi-articles et anti-doublon.
* **Archivage automatique respectueux à J+15 :** Clôture douce des réservations sans erreur 404, préservant les souvenirs et mots doux des proches.
* **Campagnes Calendaires thématiques :** Mise en avant saisonnière (Halloween, Noël, Pâques, Rentrée, Défaut) avec affichage en solo ou en duo de cartes sur la page d'accueil.
* **Navigation par Tranches d'Âge :** Filtres interactifs par univers d'âge sur la boutique et dans Sanity.

---

## 2. Click & Collect (Retrait Boutique)

### 2.1 Objectif
Permettre aux clients du quartier ou aux parents pressés de réserver des jouets et livres en quelques clics sur le site, puis de venir les retirer et les régler directement à la boutique (14 rue de l'Oasis, Puteaux).

### 2.2 Parcours Utilisateur
1. **Ajout au Panier :**
   * Depuis la page `/boutique`, chaque carte produit propose un bouton d'ajout au panier.
   * L'icône de panier dans le Header s'anime et affiche un badge avec le nombre d'articles.
2. **Tiroir Panier (`CartDrawer`) :**
   * S'ouvre sur le côté droit sans bloquer la navigation.
   * Ajustement des quantités (+/-), suppression d'articles, calcul dynamique du total.
3. **Formulaire de Réservation :**
   * Nom & Prénom du client.
   * Numéro de téléphone (reformaté automatiquement au standard français : `06 12 34 56 78`).
   * Adresse email.
   * Date et créneau de retrait souhaité (matin ou après-midi).
   * Note optionnelle (ex: « Merci de préparer un emballage cadeau »).
4. **Numéro de Réservation Lisible :**
   * Format conçu pour être noté facilement sur un post-it en boutique : `CC-JJMM-XXXX` (ex: `CC-2210-8K4P`).
5. **Double Notification par Email (SMTP OVH) :**
   * **À la boutique (`royam0820@gmail.com`) :** Tableau récapitulatif détaillé des articles, montant total, coordonnées complètes du client, bouton cliquable pour l'appeler en 1 clic.
   * **Au client :** Email de confirmation chaleureux récapitulant sa commande, l'adresse de la boutique et les horaires d'ouverture.

---

## 3. Listes de Cadeaux (Anniversaire, Naissance & Autre occasion)

### 3.1 Objectif
Offrir aux familles une alternative chaleureuse, locale et personnalisée aux listes de grandes enseignes, avec retrait en boutique pour les proches.

### 3.2 Création de la Liste (`/creer-liste`)
L'interface propose désormais **3 occasions** présentées sur une seule ligne sur grand écran (`md:grid-cols-3`) et empilées élégamment sur smartphone :

1. 🎂 **Fête d'Anniversaire** (Carte festive ambrée) :
   * Prénom de l'enfant.
   * Sélecteur rapide d'âge en 1 clic (*1 an, 2 ans, 3 ans... jusqu'à 12 ans*).
   * Date de la fête.
2. 👶 **Naissance & Bébé** (Carte douce vert sauge) :
   * Prénom du bébé (ou « Bébé à venir »).
   * Date de naissance ou terme prévu.
   * Message de bienvenue aux proches.
3. 🎁 **Autre occasion** (Carte violette festive) :
   * Idéale pour tous les temps forts familiaux : Baptême, Bar Mitzvah, L'Aïd, Noël, Fête de famille, Communion...
   * Titre personnalisé de l'événement et date.
   * Message chaleureux adapté.

### 3.3 Sélection des Produits
* Intégration en direct avec le catalogue Sanity.
* Filtres par âge pour sélectionner des jouets adaptés en quelques clics.
* Génération d'une URL pérenne et soignée (ex: `https://lmdpl.fr/liste/raphael-7-ans`).

### 3.4 Partage Facilité
* Bouton « Copier le lien » avec notification visuelle.
* Bouton **WhatsApp** : ouvre directement l'application avec un message pré-rédigé engageant.
* Bouton **SMS** : prêt à être envoyé aux parrains, marraines et grands-parents.

### 3.5 Réservation Multi-Articles & Mécanisme Zéro Doublon
* **Sélection Multiple :** Un proche peut cocher 1, 2 ou plusieurs cadeaux disponibles sur la liste.
* **Panier de Réservation Dédié :** Affiche le sous-total et permet de retirer un article avant validation.
* **Formulaire Unique Invité :** Nom, Prénom, Email, Téléphone, créneau de retrait et **mot doux d'affection** pour l'enfant/les parents.
* **Sécurité Anti-Doublon :** La réservation est atomique côté serveur. Dès qu'un cadeau est validé, il passe instantanément en statut *« Offert par [Prénom] »* et ne peut plus être sélectionné par un autre proche.
* **Double Email Automatique :**
  * Email à la boutique avec la liste des articles à mettre de côté.
  * Email de confirmation au proche avec le détail de sa réservation et le mot doux qu'il a rédigé.

---

## 4. Archivage Automatique des Listes de Cadeaux (J+15)

### 4.1 Règle Métier Validée
* **Durée de vie active :** La liste reste ouverte aux réservations jusqu'à **15 jours après la date de l'événement** (`eventDate + 15 jours`).
* **Justification :** 15 jours est le délai idéal pour permettre aux retardataires d'offrir leur cadeau sans bloquer indéfiniment les articles en boutique.

### 4.2 Comportement à Échéance
* **Zéro Erreur 404 :** L'URL de la liste reste accessible à vie. Les parents peuvent toujours la consulter et relire les petits mots doux reçus.
* **Bannière d'Information Ambrée :**
  > *« 📦 Liste archivée : L'événement a eu lieu il y a plus de 15 jours. Les réservations sont désormais clôturées. Merci à tous les participants ! »*
* **Boutons Neutralisés :** Les boutons de réservation sont désactivés avec le libellé *« Liste archivée »*.

### 4.3 Architecture Technique en Production
* **Évaluation Just-in-Time (Temps Réel) :** Aucun script planifié (Cron) n'est nécessaire. À chaque visite d'une liste, le serveur compare `new Date()` avec `archiveDate`. Si la date est dépassée, la liste est flaggée archivée à la volée.
* **Sécurité Serveur (API `/api/gift-lists/[slug]/reserve`) :** Rejet immédiat en HTTP 400 si une requête POST tente de réserver un article sur une liste expirée.
* **Flexibilité :** Si un parent reporte sa fête, il suffit de modifier `eventDate` pour que la liste redevienne instantanément active.

---

## 5. Campagnes Promotionnelles Calendaires (Sélections Événementielles)

### 5.1 Objectif
Permettre à Véronique de rythmer la page d'accueil au gré des saisons et événements de l'année, en totale autonomie depuis Sanity Studio, sans toucher au code.

### 5.2 Gestion dans Sanity Studio (`seasonalCampaign`)
Dans l'interface Sanity, Véronique dispose d'un document complet :
* **Titre & Sous-titre :** Ex. *« Les petits trésors de rentrée »*, *« La magie d'Halloween »*.
* **Dates de Validité :** `Date de début` et `Date de fin` pour affichage programmable.
* **Activation manuelle :** Interrupteur Activer/Désactiver.
* **Sélection de Produits :** Choix direct parmi les fiches produits existantes (par références, sans duplication).
* **Sélecteur de Thème Visuel (Radio) :**
  * 🎃 **Halloween :** Palette orange citrouille et violet nuit, badges citrouilles et petites chauves-souris.
  * 🎄 **Noël :** Rouge bordeaux festif et vert sapin, flocons de cristal sculptés en SVG.
  * 🌸 **Pâques :** Vert tendre printanier et jaune poussin, marguerites et œufs décoratifs.
  * 🎒 **Rentrée :** Bleu écolier et jaune moutarde, petits cartables et crayons de couleur.
  * ✨ **Défaut :** Tons pastel doux signatures de la boutique.

### 5.3 Affichage Intelligent sur la Page d'Accueil (`SeasonalCampaignTeaser`)
* **Si 1 campagne est active :** Affichage d'une grande bannière immersive pleine largeur avec découpe ondulée ("scalloped wave").
* **Si 2 campagnes sont actives simultanément :** Affichage automatisé en **duo de cartes côte à côte** équilibrées, permettant par exemple de combiner la *Rentrée* et *Halloween* en automne.
* **Pages Dédiées :** Chaque campagne dispose de sa propre page vitrine (`/selections/[slug]`).
* **Performance en Direct :** Requêtes configurées avec `useCdn: false` et `force-dynamic` pour que les modifications faites dans Sanity soient visibles immédiatement sur le site sans attendre l'invalidation du cache CDN.
* **Prévisualisation URL :** Possibilité de forcer l'affichage d'un thème avec le paramètre `?theme=halloween` (ou `noel`, `paques`, `rentree`).

---

## 6. Filtrage des Articles par Tranches d'Âge

### 6.1 Côté Boutique (`/boutique`)
Une barre ergonomique de boutons arrondis ("Pills") permet de filtrer les articles instantanément sans rechargement de page :
* `[ Tous les âges ]`
* `[ 🍼 0-12 mois ]` — Naissance & Éveil
* `[ 🧸 1-3 ans ]` — Premiers pas & Découverte
* `[ 🎨 3-6 ans ]` — Imagination & Maternelle
* `[ 🧩 6 ans et + ]` — Créativité & Jeux de société

### 6.2 Côté Sanity Studio
Le champ d'âge libre a été remplacé par un menu déroulant normalisé dans le schéma `productType.ts`. Cela garantit :
* Zéro faute de frappe pour Véronique.
* Une catégorisation uniforme de tous les nouveaux articles.
* Une rétrocompatibilité totale avec les anciens articles déjà enregistrés.

---

## 7. Architecture Technique & Fichiers Clés

```text
src/
├── app/
│   ├── (site)/
│   │   ├── boutique/            # Page boutique avec filtrage d'âge et ajout au panier
│   │   ├── creer-liste/         # Formulaire 3 occasions & création de liste
│   │   ├── liste/[slug]/        # Consultation, réservation multi-articles & archivage J+15
│   │   ├── selections/[slug]/   # Page dédiée aux sélections calendaires
│   │   └── page.tsx             # Accueil avec duo de cartes saisonnières
│   ├── api/
│   │   ├── click-and-collect/   # API commande panier & emails OVH
│   │   └── gift-lists/          # API listes de cadeaux & réservations atomiques
├── components/
│   ├── Shop/
│   │   ├── CartDrawer.tsx       # Tiroir panier latéral
│   │   ├── ProductCard.tsx      # Carte article avec bouton Click & Collect
│   │   └── ShopProductGrid.tsx  # Grille filtrable par tranches d'âge
│   ├── GiftLists/
│   │   ├── CreateListForm.tsx   # Formulaire de création (3 cartes responsive)
│   │   ├── GiftListDetail.tsx   # Vue liste, badges et archivage
│   │   ├── MultiGiftReservationModal.tsx # Panier de réservation invités
│   │   └── ShareModal.tsx       # Partage WhatsApp, SMS, lien
│   └── Home/
│       └── SeasonalCampaignTeaser.tsx # Bannières solo ou duo de cartes
├── context/
│   └── CartContext.tsx          # État global du panier d'achat
├── lib/
│   ├── campaignThemes.tsx       # 5 thèmes graphiques & SVG immersifs
│   ├── getSeasonalCampaign.ts   # Requêtes Sanity (useCdn: false)
│   ├── giftLists.ts             # Logique métier des listes & calcul J+15
│   └── formatPhone.ts           # Formatage automatique des téléphones
└── sanity/
    └── schemaTypes/
        ├── seasonalCampaignType.ts # Schéma des campagnes promotionnelles
        └── productType.ts          # Schéma produit avec liste des âges
```

---

## 8. Configuration & Variables d'Environnement

Le fichier `.env.local` (local) et les variables d'environnement Vercel (production) doivent comporter :

```bash
# Configuration Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="votre_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"   # ou development en local
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Serveur SMTP OVH (Envoi des emails transactionnels)
SMTP_HOST="ssl0.ovh.net"
SMTP_PORT="465"
SMTP_USER="contact@lmdpl.fr"
SMTP_PASSWORD="[MOT_DE_PASSE_SECURISE]"
BOUTIQUE_NOTIFICATION_EMAIL="royam0820@gmail.com"
```

---

## 9. Procédure de Déploiement Vercel

> **RAPPEL IMPORTANT :** Ne pas déployer avant validation finale avec Véronique.

Lorsque le GO sera donné par le porteur de projet :
1. **Vérification TypeScript locale :**
   ```bash
   npm run build
   ```
2. **Commit & Push sur GitHub :**
   ```bash
   git add .
   git commit -m "feat(v1): Click & Collect, Listes de cadeaux (3 occasions & archivage 15j), Campagnes calendaires et filtres d'âge"
   git push origin main
   ```
3. **Vérification Vercel :**
   * S'assurer que les variables d'environnement ci-dessus sont bien renseignées dans les paramètres du projet Vercel (*Settings > Environment Variables*).
   * Vérifier que le build de production passe au vert.
4. **Test Recette de Production :**
   * Tester un Click & Collect de test.
   * Créer une liste de test avec l'option *Autre occasion*.
   * Tester la réception des emails OVH sur `royam0820@gmail.com`.
