# Synthèse des Modifications (Version 1) — Présentation à Véronique
**La Maison des Petits Loups (Puteaux)**

> **Accès direct pour la démonstration :**
> - **Site public :** [http://localhost:3000](http://localhost:3000)
> - **Administration Sanity Studio :** [http://localhost:3000/studio](http://localhost:3000/studio)
> - **Boutique & Click & Collect :** [http://localhost:3000/boutique](http://localhost:3000/boutique)
> - **Création de liste (3 occasions) :** [http://localhost:3000/creer-liste](http://localhost:3000/creer-liste)
> - **Exemple de liste ACTIVE :** [http://localhost:3000/liste/miryam-8-ans](http://localhost:3000/liste/miryam-8-ans) ou [http://localhost:3000/liste/aurelie-8-ans](http://localhost:3000/liste/aurelie-8-ans)
> - **Exemple de liste ARCHIVÉE (J+15 dépassé) :** [http://localhost:3000/liste/camille-5-ans](http://localhost:3000/liste/camille-5-ans) ou [http://localhost:3000/liste/alexandre-naissance](http://localhost:3000/liste/alexandre-naissance)
> - **Prévisualisation des 5 thèmes saisonniers :**
>   - 🎄 **Noël (Vert sapin) :** [http://localhost:3000/selections/noel](http://localhost:3000/selections/noel)
>   - 🎃 **Halloween :** [http://localhost:3000/selections/noel?theme=halloween](http://localhost:3000/selections/noel?theme=halloween) (ou [http://localhost:3000/selections/halloween](http://localhost:3000/selections/halloween))
>   - 🌸 **Pâques :** [http://localhost:3000/selections/noel?theme=paques](http://localhost:3000/selections/noel?theme=paques)
>   - 🎒 **Rentrée :** [http://localhost:3000/selections/noel?theme=rentree](http://localhost:3000/selections/noel?theme=rentree)
>   - ✨ **Défaut (Pastel) :** [http://localhost:3000/selections/noel?theme=default](http://localhost:3000/selections/noel?theme=default)
>   - **Accueil en mode Duo (Noël + Halloween côte à côte) :** [http://localhost:3000/?theme=duo](http://localhost:3000/?theme=duo)

---

## Vue d'ensemble

Cette nouvelle version (**V1**) transforme le site vitrine en un véritable **outil de commerce de proximité** tout en laissant une **autonomie complète à Véronique** via Sanity Studio :

1. **Click & Collect (Retrait Boutique)** : réservation en ligne et paiement sur place.
2. **Listes de Cadeaux Multi-Occasions** : Anniversaire, Naissance et Autre occasion (Baptême, Noël, etc.) avec réservation groupée et garantie « Zéro Doublon ».
3. **Archivage Automatique à J+15** : clôture douce des réservations 15 jours après l'événement, sans jamais supprimer les souvenirs.
4. **Campagnes Promotionnelles Calendaires** : bannières thématiques (Halloween, Noël, Pâques, Rentrée, Défaut) affichables en solo ou en duo sur l'accueil.
5. **Filtrage par Tranches d'Âge** : navigation instantanée en boutique et saisie normalisée dans Sanity.
6. **Améliorations Page Anniversaires & Contact** : carrousel photos avec zoom (lightbox), lien vidéo, réorganisation mobile et envoi d'emails serveur.

---

## 1. Click & Collect (Retrait en Boutique)

- **Ajout au panier rapide** depuis les cartes produits de la page `/boutique` et les fiches détail.
- **Tiroir panier latéral (`CartDrawer`)** accessible partout via l'icône du menu avec compteur dynamique, ajustement des quantités (`+` / `-`) et calcul du sous-total.
- **Formulaire de réservation simplifié** :
  - Coordonnées du client (téléphone formaté automatiquement au format `06 12 34 56 78`).
  - Choix de la date et du créneau de retrait (matin ou après-midi) + note libre (ex. *emballage cadeau*).
- **Numéro de suivi court et lisible** : format `CC-JJMM-XXXX` (idéal pour les post-it de préparation en boutique).
- **Double notification email automatique (SMTP OVH)** :
  - **Pour la boutique** : récapitulatif complet des articles, montant total et bouton d'appel en 1 clic.
  - **Pour le client** : confirmation de réservation avec adresse (14 rue de l'Oasis, Puteaux) et horaires.

---

## 2. Listes de Cadeaux Multi-Occasions (`/creer-liste`)

### Création de liste en 3 univers
Présentés sous forme de 3 cartes côte à côte sur ordinateur (et empilées sur mobile) :
- **🎂 Fête d'Anniversaire** : prénom de l'enfant, sélecteur rapide d'âge (1 à 12 ans) et date de la fête.
- **👶 Naissance & Bébé** : prénom du bébé (ou *« Bébé à venir »*), date/terme prévu et mot d'accueil.
- **🎁 Autre occasion** : titre libre (Baptême, Noël, Communion, Bar Mitzvah, Aïd...) et date de l'événement.

### Partage & Réservation par les proches (`/liste/[slug]`)
- **Partage en 1 clic** : copie du lien, partage direct par **WhatsApp** et **SMS** avec message pré-rempli.
- **Réservation multi-articles** : un proche peut sélectionner plusieurs cadeaux en une seule fois dans un panier dédié.
- **Garantie « Zéro Doublon »** : dès validation, les cadeaux passent immédiatement en statut *« Offert par [Prénom] »* (verrouillage atomique côté serveur).
- **Petit mot doux & emails** : le proche peut laisser un message affectueux pour la famille ; la boutique et l'offrant reçoivent chacun un email de confirmation.

---

## 3. Archivage Automatique des Listes à J+15

- **Règle métier** : une liste reste ouverte aux réservations jusqu'à **15 jours après la date de l'événement** (`eventDate + 15 jours`), laissant le temps aux retardataires sans immobiliser le stock indéfiniment.
- **Zéro page introuvable (404)** : l'adresse de la liste reste consultable à vie pour permettre aux parents de relire les mots doux.
- **Clôture visuelle & technique** :
  - Affichage d'une bannière ambrée indiquant que les réservations sont closes.
  - Désactivation des boutons de réservation et blocage de sécurité côté serveur.

---

## 4. Campagnes Promotionnelles Calendaires (Sanity & Accueil)

- **Pilotage 100 % autonome dans Sanity Studio (`Campagnes Calendaires`)** :
  - Choix du titre, sous-titre, dates de début/fin, interrupteur d'activation et sélection des produits existants.
- **5 thèmes visuels prêts à l'emploi** (couleurs et illustrations SVG sur-mesure) :
  - 🎃 **Halloween** | 🎄 **Noël** | 🌸 **Pâques** | 🎒 **Rentrée** | ✨ **Défaut (Pastel)**
- **Mise en page intelligente sur l'accueil** :
  - **1 campagne active** : grande bannière immersive pleine largeur avec découpe ondulée.
  - **2 campagnes actives en même temps** : affichage automatique en **duo de cartes côte à côte** (ex. *Rentrée* + *Halloween*).
- **Page vitrine dédiée** par campagne sur `/selections/[slug]` et prise en compte immédiate des modifications Sanity (sans délai de cache).
- **Astuce démo** : possibilité de prévisualiser n'importe quel thème en direct via l'URL `http://localhost:3000/selections/noel?theme=halloween` (ou `noel`, `paques`, `rentree`, `default`).

---

## 5. Filtrage des Articles par Tranches d'Âge & Référence Produit (SKU/REF)

- **Référence Produit (SKU / REF)** :
  - Ajout d'un champ **Référence Produit (SKU / REF)** dans Sanity Studio (alphanumérique, 12 caractères max, ex. `SOU-MAQ01`, `PEL-LAP01`).
  - Affichage de la référence `Réf : ...` sur toutes les cartes produits (Accueil, Boutique, Sélections saisonnières, Création et consultation de listes de cadeaux), sur la fiche détail produit, dans le panier Click & Collect et dans les emails de notification boutique.
  - Recherche par référence produit activée lors de la création d'une liste de cadeaux.
- **En Boutique (`/boutique`)** : barre de filtres rapides par boutons (« Pills ») sans rechargement de page :
  - `Tous les âges` • `🍼 0-12 mois` • `🧸 1-3 ans` • `🎨 3-6 ans` • `🧩 6 ans et +`
- **Dans Sanity Studio** : remplacement du champ texte libre par une **liste déroulante normalisée** dans la fiche produit (1 clic, zéro erreur de saisie, rétrocompatible avec le catalogue existant).

---

## 6. Autres Améliorations Récentes (Anniversaires & Contact)

- **Page Anniversaires (`/anniversaires`)** :
  - Ajout d'un **carrousel photos** avec ouverture plein écran au clic (**Lightbox**) et lien vidéo.
  - Optimisation de l'affichage mobile (les détails et tarifs s'affichent désormais avant le formulaire de réservation).
- **Emails & Contact** :
  - Envoi d'emails côté serveur via Nodemailer (SMTP OVH) et mise à jour des destinataires / copies (CC).
